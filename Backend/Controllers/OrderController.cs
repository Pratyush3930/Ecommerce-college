using Backend.Data;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet]
        public IActionResult GetOrderDetails()
        {
            var orderItems = dbContext.Orders.ToList();
            return Ok(orderItems);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderDetails(Order order)
        {
            try
            {
                dbContext.Orders.Add(order);
                var newOrder = await dbContext.SaveChangesAsync();

                return Ok("Order created successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
