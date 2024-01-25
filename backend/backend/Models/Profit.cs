namespace backend.Models
{
    public class Profit
    {
        public int? FromStationId { get; set; }
        public int? ToStationId { get; set; }
        public int? Month { get; set; }
        public Station? FromStation { get; set; }
        public Station? ToStation { get; set; }
        public double? TotalProfit { get; set; }
    }
}
