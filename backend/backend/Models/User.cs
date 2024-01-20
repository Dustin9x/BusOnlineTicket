using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? FullName { get; set; }
        public string? Avatar { get; set; }
        public string Role { get; set; }
        public ICollection<Ticket>? Tickets { get; set; }

        [NotMapped]
        public IFormFile? UploadImage { get; set; }

        public static implicit operator User(List<User> v)
        {
            throw new NotImplementedException();
        }
    }
}
