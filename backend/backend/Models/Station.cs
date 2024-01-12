namespace backend.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<Bus>? Buses { get; set; }
    }
}

