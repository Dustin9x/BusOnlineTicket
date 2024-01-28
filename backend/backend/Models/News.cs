using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? DayCreateNew { get; set; }
        public string? Image { get; set; }
        public ICollection<Comment> ?Comments { get; set; }


        [NotMapped]
        public IFormFile? UploadImage { get; set; }
    }
}
