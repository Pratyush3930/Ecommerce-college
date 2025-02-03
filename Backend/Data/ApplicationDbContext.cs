using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {   // shortcut type "ctor" to create a constructor
        //public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)  
        //{    
        //}

        // or select class and click ctrl + . to create it
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        // type "prop" then press tab to create a property
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Cart> Carts { get; set; }
        public required DbSet<Order> Orders { get; set; }  // Order = model ,,,, Orders = dbname
    }
}
