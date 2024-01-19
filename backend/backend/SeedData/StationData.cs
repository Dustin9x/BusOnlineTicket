using backend.Models;

namespace backend.SeedData
{
    public class StationData
    {
        public static Station[] StationSeedData()
        {
            return new Station[]
            {
               new Station{Id=1,Name="Hồ Chí Minh",Address="395/1Nam Kỳ Khởi Nghĩa P2 Q3",},
               new Station{Id=2,Name="Hà Nội",Address="126 Hai Bà Trưng P1 Q6",},
               new Station{Id=3,Name="Đà Lạt",Address="35 Hồ Xuân Hương P9 Q1",},
               new Station{Id=4,Name="Cà Mau",Address="3A Đất Mũi Huyện Châu Thành , Tỉnh Cà Mau",},
               new Station{Id=5,Name="Hải Phòng",Address="39 Xã Nghĩa Lộ ,Huyện Cát Hải",},
            };
        }
    }
}
