using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class PromoteTrip
    {
        public int Id { get; set; }
        public string? FromStation { get; set; }
        public string? ToStation { get; set; }
        public double? MinPrice { get; set; }
        public string? Image { get; set; }
        [NotMapped]
        public IFormFile? UploadImage { get; set; }
    }
}
