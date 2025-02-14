using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Entities
{
    public class Cart
    {
        [Key]
        public int Cart_id { get; set; }
        public int User_id { get; set; }
        // Foreign Key to Product table
        [ForeignKey("Product")]  // OR use "Product" as string
        public int Product_id { get; set; }

        // Navigation Property (Required for proper foreign key mapping)
        public Product? Product { get; set; }
        public int Quantity { get; set; }
        public int Total_price { get; set; }
        [ForeignKey("Order")]
        public int? OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
