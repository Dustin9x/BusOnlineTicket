namespace backend.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public int TicketPrice { get; set; }
        public int BusId { get; set; }
        public int FromStationId { get; set; }
        public int ToStationId { get; set; }
        public Seat? Seats { get; set; }

        public ICollection<TripStation>? TripStations { get; set; }
        public Bus? Bus { get; set; }
    }
}
