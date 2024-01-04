using backend.Models;

namespace backend.SeedData
{
    public class StationData
    {
        public static Station[] StationSeedData()
        {
            return new Station[]
            {
                new Station{Id=1,Name="Đà Lạt",Address="Da Lat" },
                new Station{Id=2,Name="Hà Nội", Address= "Ha Noi" },
                new Station{Id=3,Name="Hồ Chí Minh",Address="Ho Chi Minh" }
            };
        }
    }
}
