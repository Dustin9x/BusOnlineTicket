namespace backend.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        public Trip? Trips { get; set; }
        public int UserId { get; set; }
        public User? Users { get; set; }
        public string? SeatsList { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
