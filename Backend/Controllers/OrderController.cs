using System.Linq;
using System.Text;
using Backend.Data;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public readonly ApplicationDbContext dbContext;

        public OrderController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetOrderDetails([FromRoute] int userId)
        {
            Console.WriteLine("Fetching order details...");
            try
            {
                // Fetch orders along with cart items and product details
                var orders = await dbContext.Orders
                    .Where(o => o.UserId == userId)
                    .OrderByDescending(o => o.OrderId)
                    .Select(o => new
                    {
                        o.OrderId,
                        o.Address,
                        o.Phone,
                        o.TotalAmount,
                        PaymentStatus = o.PaymentStatus ? "Paid" : "Unpaid",
                        CartItems = dbContext.Carts
                            .Where(c => c.OrderId == o.OrderId && c.OrderId != null)
                            .Include(c => c.Product)
                            .Select(c => new
                            {
                                c.Cart_id,
                                c.Quantity,
                                c.Total_price,
                                ProductName = c.Product != null ? c.Product.ProductName : "Unknown Product",
                                ImagePath = c.Product != null ? c.Product.ImagePath : null,
                                c.Product_id
                            }).ToList()
                    })
                    .ToListAsync();

                if (orders.Count == 0)
                {
                    return NotFound("No orders found for this user.");
                }

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error fetching order details: {ex.Message}");
            }
        }



        [HttpPost("cod/{userId:int}")]
        public async Task<IActionResult> CreateOrder([FromRoute]int userId, [FromBody]Order order)
        {
            try
            {
                // Get all cart items for the user
                var cartItems = await dbContext.Carts
                    .Where(c => c.User_id == userId && c.OrderId == null) // Only unprocessed cart items
                    .ToListAsync();

                if (cartItems.Count == 0)
                {
                    return BadRequest("No items in cart to order.");
                }

                // Calculate total amount
                order.TotalAmount = cartItems.Sum(c => c.Total_price) + 20;  //20 is the delivery charge

                // Add the new order
                dbContext.Orders.Add(order);
                await dbContext.SaveChangesAsync();

                // Update cart items with OrderId
                foreach (var item in cartItems)
                {
                    item.OrderId = order.OrderId;
                }

                await dbContext.SaveChangesAsync();

                return Ok("Order created successfully.");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("khalti/{userId:int}")]
        public async Task<IActionResult> PayBill([FromRoute] int userId,[FromBody]Order order)
        {
            //return Ok();
            var url = "https://dev.khalti.com/api/v2/epayment/initiate/";

            var payload = new
            {
                return_url = "http://localhost:5173/verify-payment",
                website_url = "http://localhost:5173/",
                amount = 2000,
                purchase_order_id = "Order01",
                purchase_order_name = "test",
                customer_info = new
                {
                    name = "Ram Bahadur",
                    email = "test@khalti.com",
                    phone = "9800000123"
                }
            };

            var jsonPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "key 692aa803490047268d344027209ed08e");
            try
            {// Get all cart items for the user
                var cartItems = await dbContext.Carts
                    .Where(c => c.User_id == userId && c.OrderId == null) // Only unprocessed cart items
                    .ToListAsync();

                if (cartItems.Count == 0)
                {
                    return BadRequest("No items in cart to order.");
                }

                // Calculate total amount
                order.TotalAmount = cartItems.Sum(c => c.Total_price) + 20;  //20 is the delivery charge
                // the payment is via khalti wallet
                order.PaymentStatus = true;
                // Add the new order
                dbContext.Orders.Add(order);
                await dbContext.SaveChangesAsync();

                // Update cart items with OrderId
                foreach (var item in cartItems)
                {
                    item.OrderId = order.OrderId;
                }

                await dbContext.SaveChangesAsync();
                var response = await client.PostAsync(url, content);
                var responseContent = await response.Content.ReadAsStringAsync();
                return Ok(responseContent);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Payment failed");
            }

        }

    }
}
