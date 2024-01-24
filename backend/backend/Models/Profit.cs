namespace backend.Models
{
    public class Profit
    {
        public int Id { get; set; }
        public int? FromStation { get; set; }
        public int? ToStation { get; set; }
        public double? TotalProfit { get; set; }
    }
}
