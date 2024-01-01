using System.Text.Json.Serialization;

namespace backend.Models
{
    public class firstLocation
    {
        // địa điểm đón

        public int Id { get; set; }
        public string name { get; set; }
        public ICollection<busService>? busServices { get; set; }
    }
}

