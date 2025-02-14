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
        public async Task<IActionResult> GetCartItems()
        {
            var cartItems =await dbContext.Carts.Where(c => c.OrderId == null && c.User_id == 1).ToListAsync();

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
                    .FirstOrDefaultAsync(c => c.User_id == 1 && c.Product_id == item.ProductId && c.OrderId == null);
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

            }
            await dbContext.SaveChangesAsync();
            // Fetch updated cart items after saving changes
            var updatedCart = await dbContext.Carts
            .Where(c => c.User_id == 1 && c.OrderId == null)
            .Include(c => c.Product) // Ensure Product data is loaded
            .Select(c => new
            {
                c.Cart_id,
                c.User_id,
                c.Product_id,
                c.Quantity,
                c.Total_price,
                Product = c.Product != null ? new
                {
                    c.Product.ProductName,
                    c.Product.ImagePath,
                    c.Product.Price,
                    c.Product.Stock,
                    c.Product.IsFeatured,
                    c.Product.ProductId
                } : null,
            })
            .ToListAsync();

            return Ok(new { message = "Cart updated successfully", cart = updatedCart });

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteCartItem(int id)
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
                var updatedCart = await dbContext.Carts
                .Where(c => c.User_id == 1 && c.OrderId == null)
                .Include(c => c.Product) // Ensure Product data is loaded
                .Select(c => new
                {
                    c.Cart_id,
                    c.User_id,
                    c.Product_id,
                    c.Quantity,
                    c.Total_price,
                    Product = c.Product != null ? new
                    {
                        c.Product.ProductName,
                        c.Product.ImagePath,
                        c.Product.Price,
                        c.Product.Stock,
                        c.Product.IsFeatured,
                        c.Product.ProductId
                    } : null,
                })
                .ToListAsync();

                return Ok(new { message = "Cart item deleted successfully!", cart = updatedCart });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
