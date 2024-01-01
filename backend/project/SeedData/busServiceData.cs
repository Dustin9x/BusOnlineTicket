using project.Models;

namespace project.SeedData
{
    public class busServiceData
    {
        public static busService[] busServiceSeedData()
        {
            return new busService[]
            {
                    new busService{Id=1,date=DateTime.Now,price=999,busId=1,firstLocationId=1, finalLocationId=2},
                    new busService{Id=2,date=DateTime.Now,price=888,busId=2,firstLocationId=3, finalLocationId=2},
                    new busService{Id=3,date=DateTime.Now,price=777,busId=3,firstLocationId=3, finalLocationId=1},

            };
        }
    }
}
