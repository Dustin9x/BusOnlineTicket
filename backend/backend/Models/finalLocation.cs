using System.Text.Json.Serialization;

namespace backend.Models
{
    public class finalLocation
    {
        // địa điểm đưa

        public int Id { get; set; }
        public string name { get; set; }
        public ICollection<busService>? busServices { get; set; }
    }
}

