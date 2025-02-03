using Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Helpers
{
    public static class FileHelper
    {
        /// <summary>
        /// Saves a file to the specified directory and returns the relative path.
        /// </summary>
        public static async Task<string> SaveFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("File is null or empty", nameof(file));
            }
            // Create a unique filename to avoid overwriting existing files
            var fileName = Path.GetFileNameWithoutExtension(file.FileName);
            var extension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{fileName}_{Guid.NewGuid()}{extension}";

            // Define the path where the image will be stored
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            // Create the directory if it doesn't exist
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Combine the directory and the unique filename
            var filePath = Path.Combine(uploadPath, uniqueFileName);

            // Store the image locally
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Generate the relative path for the image
            var relativePath = Path.Combine("/images", uniqueFileName).Replace("\\", "/");  // double \\ represent \ in c# as '\' represents escape character

            return relativePath;
        }

        /// <summary>
        /// Deletes a file at the specified relative path.
        /// </summary>
        public static void DeleteFile(string ImagePath)
        {
            // Get the image path
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", ImagePath.TrimStart('/'));

            // Check if the file exists and delete it
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}