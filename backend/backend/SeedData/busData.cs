using backend.Models;

namespace backend.SeedData
{
    public class BusData
    {
        public static Bus[] BusSeedData()
        {
            return new Bus[]
            {
                 new Bus{Id=1,BusPlate="59A1-55999",BusTypeId=1,StationId="1",isAvailable=true,Note=""},
                 new Bus{Id=2,BusPlate="59A1-55998",BusTypeId=2,StationId="2",isAvailable=true,Note=""},
                 new Bus{Id=3,BusPlate="59A1-55997",BusTypeId=3,StationId="3",isAvailable=true,Note=""},
                 new Bus{Id=4,BusPlate="59A1-55996",BusTypeId=4,StationId="4",isAvailable=true,Note=""},
                 new Bus{Id=5,BusPlate="59A1-55995",BusTypeId=1,StationId="5",isAvailable=true,Note=""},
                 new Bus{Id=6,BusPlate="59A1-55994",BusTypeId=2,StationId="1",isAvailable=true,Note=""},
                 new Bus{Id=7,BusPlate="59A1-55993",BusTypeId=3,StationId="2",isAvailable=true,Note=""},
                 new Bus{Id=8,BusPlate="59A1-55992",BusTypeId=4,StationId="3",isAvailable=true,Note=""},
                 new Bus{Id=9,BusPlate="59A1-55991",BusTypeId=1,StationId="4",isAvailable=true,Note=""},
                 new Bus{Id=10,BusPlate="59A1-55900",BusTypeId=2,StationId="5",isAvailable=true,Note=""},
                 new Bus{Id=11,BusPlate="59A1-55901",BusTypeId=3,StationId="1",isAvailable=true,Note=""},
                 new Bus{Id=12,BusPlate="59A1-55902",BusTypeId=4,StationId="2",isAvailable=true,Note=""},
                 new Bus{Id=13,BusPlate="59A1-55903",BusTypeId=1,StationId="3",isAvailable=true,Note=""},
                 new Bus{Id=14,BusPlate="59A1-55904",BusTypeId=2,StationId="4",isAvailable=true,Note=""},
                 new Bus{Id=15,BusPlate="59A1-55905",BusTypeId=3,StationId="5",isAvailable=true,Note=""},
                 new Bus{Id=16,BusPlate="59A1-55906",BusTypeId=4,StationId="1",isAvailable=true,Note=""},
                 new Bus{Id=17,BusPlate="59A1-55907",BusTypeId=1,StationId="2",isAvailable=true,Note=""},
                 new Bus{Id=18,BusPlate="59A1-55908",BusTypeId=2,StationId="3",isAvailable=true,Note=""},
            };
        }
    }
}
