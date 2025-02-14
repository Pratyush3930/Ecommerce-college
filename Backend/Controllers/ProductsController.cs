using Backend.Data;
using Backend.Helpers;
using Backend.Models;
using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public ProductsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var allProducts = dbContext.Products.ToList();

            return Ok(allProducts);  // response code 200 which is ok
        }

        //to get a single product using id
        [HttpGet]
        [Route("{id:int}")]  // accepting an id of type int
        public IActionResult GetProductById(int id)
        {
            // if product not found then null value will be returned
            var product = dbContext.Products.Find(id);

            if (product is null)
            {
                //return NotFound("Product not found");
                return NotFound(new { error = "Product not found" });
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProducts(AddProductDto addProductDto)
        {
            // Check if the image is not null
            if (addProductDto.ProductImage != null && addProductDto.ProductImage.Length > 0)
            {
                // Save the file and get its relative path
                var relativePath = await FileHelper.SaveFileAsync(
                    addProductDto.ProductImage
                );

                // Save the image path to the product entity
                var product = new Product()
                {
                    ProductName = addProductDto.ProductName,
                    ProductDescription = addProductDto.ProductDescription,
                    IsFeatured = addProductDto.IsFeatured,
                    Category = addProductDto.Category,
                    Price = addProductDto.Price,
                    Stock = addProductDto.Stock,
                    ImagePath = relativePath  // Save the image path
                };

                // Add the product to the database
                dbContext.Products.Add(product);
                await dbContext.SaveChangesAsync();

                return Ok(product);
            }
            else
            {
                return BadRequest("No image file provided.");
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateProduct(int id, UpdateProductDto updateProductDto)
        {
            var product = dbContext.Products.Find(id);

            if (product is null)
            {
                return NotFound("Product not found");
            }

            product.ProductName = updateProductDto.ProductName;
            product.ProductDescription = updateProductDto.ProductDescription;
            product.Price = updateProductDto.Price;
            product.Stock = updateProductDto.Stock;
            product.IsFeatured = updateProductDto.IsFeatured;
            product.Category = updateProductDto.Category;

            dbContext.SaveChanges();

            return Ok(product);
        }

        [HttpDelete]
        [Route("{id:int}")]
        // the update() keyword was not called so no savechanges required
        // but the delete keyword was called here so we need to do savechanges
        public IActionResult DeleteProduct(int id)
        {
            var product = dbContext.Products.Find(id);

            if (product is null)
            {
                return NotFound();
            }
            if (product.ImagePath != null)
            {
                FileHelper.DeleteFile(product.ImagePath);
            }

            dbContext.Products.Remove(product);
            dbContext.SaveChanges();

            return Ok(product);
        }
    }
}


// ******** simpler version of the addproducts function *****************
//public IActionResult AddProducts(AddProductDto addProductDto)
//{
//    //DTO helps to achieve separation of concern
//    var products = new Product()
//    {
//        ProductName = addProductDto.ProductName,
//        ProductDescription = addProductDto.ProductDescription,
//        Price = addProductDto.Price,
//        Stock = addProductDto.Stock,
//    };

//    dbContext.Products.Add(products);
//    dbContext.SaveChanges();

//    return Ok(products);
//}

// ********** Some notes on the update function**************
// When you retrieve an entity using methods like dbContext.Products.Find(id), EF Core starts tracking that entity.
// Any changes made to the properties of the tracked entity are automatically detected by EF Core.
// When you call dbContext.SaveChanges(), EF Core generates the necessary SQL UPDATE statement for the modified entity and applies the changes to the database.