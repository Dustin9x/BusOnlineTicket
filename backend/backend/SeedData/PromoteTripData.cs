using backend.Models;

namespace backend.SeedData
{
    public class PromoteTripData
    {
        public static PromoteTrip[] PromoteTripSeedData()
        {
            return new PromoteTrip[]
            {
                new PromoteTrip{Id=1,FromStation="Hồ Chí Minh",ToStation="Hà Nội",MinPrice=100,Image="image1.png"},
                new PromoteTrip{Id=2,FromStation="Hà Nội",ToStation="Đà Lạt",MinPrice=150,Image="image2.png"},
                new PromoteTrip{Id=3,FromStation="Hồ Chí Minh",ToStation="Tiền Giang",Image="image3.png"},
                new PromoteTrip{Id=4,FromStation="Hồ Chí Minh",ToStation="Vũng Tàu",Image="image4.png"},
                new PromoteTrip{Id=5,FromStation="Hà Nội",ToStation="Hồ Chí Minh",Image="image5.png"},
            };
        }
    }
}
