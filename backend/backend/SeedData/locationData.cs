using backend.Models;

namespace backend.SeedData
{
    public class locationData
    {
        public static firstLocation[] firstLocationSeedData()
        {
            return new firstLocation[]
            {
                    new firstLocation{Id=1,name="Đà Lạt" },
                    new firstLocation{Id=2,name="Hà Nội" },
                    new firstLocation{Id=3,name="Hồ Chí Minh" }
            };
        }
        public static finalLocation[] finalLocationSeedData()
        {
            return new finalLocation[]
            {
                    new finalLocation{Id=1,name="Đà Lạt" },
                    new finalLocation{Id=2,name="Hà Nội" },
                    new finalLocation{Id=3,name="Hồ Chí Minh" }
            };
        }
    }
}
