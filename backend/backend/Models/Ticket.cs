namespace backend.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        public ICollection<Trip>? Trips { get; set; }
        public int UserId { get; set; }
        public ICollection<User>? Users { get; set; }
        public ICollection<string>? SeatsList { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
