namespace backend.Models
{
    public class Bus
    {
        public int Id { get; set; }
        public string BusPlate { get; set; }
        public string BusType { get; set; }
        public ICollection<Station>? Stations { get; set; }
        public ICollection<Trip>? Trips { get; set; }
        public bool isAvailable { get; set; }
        public string Note { get; set; }
    }
}
