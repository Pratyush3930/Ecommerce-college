using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Entities
{
    public class Order
    {
        [Key]
        public int Order_id { get; set; }
        public int User_id { get; set; }
        // Foreign Key to Product table
        public string? Address { get; set; }
        public int Total_amount { get; set; }
        public bool Payment_status { get; set; } = false; // false = pending

        //[ForeignKey("Product")]  // OR use "Product" as string
        //public int Product_id { get; set; }

        //// Navigation Property (Required for proper foreign key mapping)
        //public required Product Product { get; set; }
    }
}
