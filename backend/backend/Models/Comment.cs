namespace backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public int NewsId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public News? News { get; set; }
        public User? User { get; set; }

    }
}
