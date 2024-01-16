namespace backend.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? TripId { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public Trip? Trip { get; set; }
    }
}
