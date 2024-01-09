namespace backend.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<Bus>? Buses { get; set; }
        // Establishing a collection of Trips arriving at this station
        public ICollection<TripStation>? TripStations { get; set; }
    }
}

