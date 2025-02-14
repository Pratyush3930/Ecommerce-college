using System.Linq;
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



        [HttpPost("{userId:int}")]
        public async Task<IActionResult> CreateOrder([FromRoute]int userId, [FromBody] Order order)
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

                //// Fetch the cart items associated with the created order
                //var cartProducts = await dbContext.Carts
                //    .Where(c => c.OrderId == order.OrderId)
                //    .Include(c => c.Product) // Assuming you want to include product details too
                //    .ToListAsync();

                //// Create an anonymous object or return the full cart products with order details
                //var response = new
                //{
                //    Order = order,
                //    CartItems = cartProducts.Select(c => new
                //    {
                //        c.Cart_id,
                //        c.Quantity,
                //        c.Total_price,
                //        c.Product!.ProductName, 
                //        c.Product.ImagePath,
                //        c.Product_id
                //    })
                //};

                //return Ok(response); // Return the order with associated cart items

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
