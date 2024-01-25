using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string OfferCode { get; set; }
        public string Content { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Image { get; set; }

        [NotMapped]
        public IFormFile? UploadImage { get; set; }
    }
}
