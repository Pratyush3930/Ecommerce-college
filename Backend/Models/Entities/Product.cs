using System.ComponentModel.DataAnnotations;
using Microsoft.Identity.Client;

namespace Backend.Models.Entities
{
    public class Product
    {
        [Key] // Marks this property as the primary key
        public int ProductId { get; set; } 
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? Category { get; set; }
        public int Price { get; set; }
        public int Stock {  get; set; }
        public string? ImagePath { get; set; }
        public Boolean IsFeatured { get; set; } = false; //Default value
    }
}
