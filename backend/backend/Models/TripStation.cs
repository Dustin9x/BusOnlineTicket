namespace backend.Models
{
    public class TripStation
    {
        public string Name { get; set; }
        public int TripId { get; set; }
        public Trip Trip { get; set; }
        public int StationId { get; set;}
        public Station Station { get; set; }
    }
}
