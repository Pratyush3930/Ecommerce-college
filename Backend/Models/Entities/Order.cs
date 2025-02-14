using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int UserId { get; set; } = 1;
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public int TotalAmount { get; set; }
        public bool PaymentStatus { get; set; } = false; // false = pending
    }
}
