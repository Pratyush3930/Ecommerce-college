using Backend.Data;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public CartController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetCartItems()
        {
            var cartItems = dbContext.Carts.ToList();

            return Ok(cartItems);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCart([FromBody] List<AddCartDto> addCartDto)
        {
            if (addCartDto == null)
            {
                return BadRequest("Cart is empty.");
            }

            foreach (var item in addCartDto)
            {
                Console.WriteLine($"ProductId: {item.ProductId}, Quantity: {item.Quantity}");
                // Check if the product already exists in the cart
                var existingCartItem = await dbContext.Carts
                    .FirstOrDefaultAsync(c => c.User_id == 1 && c.Product_id == item.ProductId);
                if (existingCartItem != null)
                {
                    // Update existing cart item
                    existingCartItem.Quantity = item.Quantity;
                    existingCartItem.Total_price = item.Total_price;
                    if (item.Quantity == 0)
                    {
                        dbContext.Carts.Remove(existingCartItem);
                    }
                }
                else
                {
                    // Add new cart item if not found
                    var cart = new Cart()
                    {
                        User_id = 1,
                        Product_id = item.ProductId,
                        Quantity = item.Quantity,
                        Total_price = item.Total_price
                    };
                    dbContext.Carts.Add(cart);
                }

                await dbContext.SaveChangesAsync();
            }
            return Ok(new { message = "Cart created successfully" });
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteCartItem(int id)
        {
            try
            {
                var cartItem = dbContext.Carts.Find(id);
                if (cartItem is null)
                {
                    return BadRequest("Cart item not found");
                }
                dbContext.Carts.Remove(cartItem);
                dbContext.SaveChanges();
                return Ok("Deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
