namespace Backend.Models
{
    public class UpdateProductDto
    {
        // we only keep the values that we might update which is all the values in this case
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? Category { get; set; }
        public int Price { get; set; }
        public int Stock { get; set; }
        public Boolean IsFeatured { get; set; } = false;
    }
}
