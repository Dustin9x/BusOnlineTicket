namespace backend.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsBook { get; set; } = false;
        public int TripId { get; set; }
        public int? UserId { get; set; }
    }
}
