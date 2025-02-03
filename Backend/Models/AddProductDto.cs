namespace Backend.Models
{
    public class AddProductDto
    {
        // These are the properties that I want to accept from the user
        public required string ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? Category { get; set; }
        public int Price { get; set; }
        public int Stock { get; set; }
        public IFormFile? ProductImage { get; set; }  // this is just to add image to the local device and then the path will be stored in the database
        public Boolean IsFeatured { get; set; } = false;
    }
}
