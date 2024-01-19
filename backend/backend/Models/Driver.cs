using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Driver
    {
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        public string? Avatar { get; set; }
        [Required]
        public string NationalId { get; set; }
        [Required]
        public string DriverLicense { get; set; }
        [Required]
        public string Phone { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; }
        public DateTime? YearOfBirth { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Note { get; set; }
        public bool Enabled { get; set; }
        public bool isApprove { get; set; } = false;
        [NotMapped]
        public IFormFile? UploadImage { get; set; }
        public ICollection<Trip> Trips { get; set; }
    }
}
