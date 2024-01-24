using backend.Models;

namespace backend.SeedData
{
    public class PromoteTripData
    {
        public static PromoteTrip[] PromoteTripSeedData()
        {
            return new PromoteTrip[]
            {
                new PromoteTrip{Id=1,FromStation="Hồ Chí Minh",ToStation="Hà Nội",Image="image1.png"},
                new PromoteTrip{Id=2,FromStation="Hà Nội",ToStation="Đà Lạt",Image="image2.png"},
                new PromoteTrip{Id=3,FromStation="Cà Mau",ToStation="Hải Phòng",Image="image3.png"},
                new PromoteTrip{Id=4,FromStation="Cần Thơ",ToStation="Bình Định",Image="image4.png"},
                new PromoteTrip{Id=5,FromStation="Hải Phòng",ToStation="Nha Trang",Image="image5.png"},
                new PromoteTrip{Id=6,FromStation="Đà Lạt",ToStation="Cà Mau",Image="image6.png"},
                new PromoteTrip{Id=7,FromStation="Nha Trang",ToStation="Cần Thơ",Image="image7.png"},
                new PromoteTrip{Id=8,FromStation="Bình Định",ToStation="Thái Nguyên",Image="image8.png"},
            };
        }
    }
}
