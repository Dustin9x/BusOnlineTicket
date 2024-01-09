using backend.Models;

namespace backend.SeedData
{
    public class BusTypeData
    {
        public static BusType[] BusTypeSeedData()
        {
            return new BusType[]
            {
                new BusType{Name="Express",NumberOfSeat=50},
                new BusType{Name="Luxury",NumberOfSeat=30},
                new BusType{Name="Volvo Non-AC",NumberOfSeat=16},
                new BusType{Name="Volvo AC",NumberOfSeat=9},
            };
        }
    }
}
