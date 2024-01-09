using backend.Models;

namespace backend.SeedData
{
    public class BusTypeData
    {
        public static BusType[] BusTypeSeedData()
        {
            return new BusType[]
            {
                new BusType{Id=1,Name="Express",NumberOfSeat=50},
                new BusType{Id=2,Name="Luxury",NumberOfSeat=30},
                new BusType{Id=3,Name="Volvo Non-AC",NumberOfSeat=16},
                new BusType{Id=4,Name="Volvo AC",NumberOfSeat=9},
            };
        }
    }
}
