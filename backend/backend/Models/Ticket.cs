namespace backend.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        public int UserId { get; set; }
        public ICollection<Seat>? Seats { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
