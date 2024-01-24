namespace backend.Models
{
    public class Bus
    {
        public int Id { get; set; }
        public string BusPlate { get; set; }
        public int? BusTypeId { get; set; }
        public BusType? BusType { get; set; }
        public string? StationId { get; set; }
        public ICollection<Station>? Stations { get; set; }
        public ICollection<Trip>? Trips { get; set; }
        public bool Enabled { get; set; } = true;
        public string? Note { get; set; }
    }
}
