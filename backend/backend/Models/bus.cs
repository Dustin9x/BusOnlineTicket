namespace backend.Models
{
    public class Bus
    {
        //public enum BusType
        //{
        //    express,
        //    luxury,
        //    volvoAC,
        //    volvoNonAC
        //}
        public int Id { get; set; }
        public string BusPlate { get; set; }
        public string BusType { get; set; }
        public ICollection<Station>? Stations { get; set; }
        public bool isAvailable { get; set; }
        public string Note { get; set; }
    }
}
