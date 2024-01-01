using System.Text.Json.Serialization;

namespace backend.Models
{
    public class busService
    {
        //chuyến xe 
        public int Id { get; set; }
        public DateTime date { get; set; }
        public int price { get; set; }
        public int busId { get; set; }
        public bus? bus { get; set; }
        public int firstLocationId { get; set; } //điểm đón khách 
        public firstLocation? firstLocations { get; set; }
        public int finalLocationId { get; set; } // điểm cần đưa khách đến 
        public finalLocation? finalLocations { get; set; }


        // người lái xe 
       /* public int driverId { get; set; }*/


    }
}
