using backend.Models;

namespace backend.SeedData
{
    public class TripData
    {
        public static Trip[] TripSeedData()
        {
            return new Trip[]
            {
                new Trip{Id=1,StartTime=DateTime.Now,FinishTime=DateTime.Now.AddDays(1),TicketPrice=999,FromStationId=1, ToStationId=2},
                new Trip{Id=2,StartTime=DateTime.Now,FinishTime=DateTime.Now.AddDays(1),TicketPrice=999,FromStationId=1, ToStationId=2},
                new Trip{Id=3,StartTime=DateTime.Now,FinishTime=DateTime.Now.AddDays(1),TicketPrice=999,FromStationId=1, ToStationId=2},
            };
        }
    }
}
