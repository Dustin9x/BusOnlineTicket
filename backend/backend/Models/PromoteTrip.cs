namespace backend.Models
{
    public class PromoteTrip
    {
        public int Id { get; set; }
        public string? FromStation { get; set; }
        public string? ToStation { get; set; }
        public double? MinPrice { get; set; }
    }
}
