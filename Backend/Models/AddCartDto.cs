using Backend.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class AddCartDto
    {
        public int User_id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int Total_price { get; set; }
    }
}
