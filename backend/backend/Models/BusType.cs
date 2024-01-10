using Microsoft.Extensions.Hosting;

namespace backend.Models
{
    public class BusType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumberOfSeat { get; set; }
        public ICollection<Bus>? Buses { get; set; }
    }
}
