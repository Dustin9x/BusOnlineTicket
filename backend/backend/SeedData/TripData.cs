using backend.Models;

namespace backend.SeedData
{
    public class TripData
    {
        public static Trip[] TripSeedData()
        {
            return new Trip[]
            {
                new Trip { Id = 1,StartTime=new DateTime(2024, 01, 20),FinishTime=new DateTime(2024, 01, 21),TicketPrice=100,BusId=1,DriverId=1,FromStationId=1,ToStationId=5,Image="image1.jpg"},
                       new Trip { Id = 2,StartTime=new DateTime(2024, 01, 21),FinishTime=new DateTime(2024, 01, 22),TicketPrice=200,BusId=2,DriverId=2,FromStationId=2,ToStationId=3,Image="image2.jpg"},
                       new Trip { Id = 3,StartTime=new DateTime(2024, 01, 22),FinishTime=new DateTime(2024, 01, 23),TicketPrice=300,BusId=3,DriverId=3,FromStationId=3,ToStationId=2,Image="image3.jpg"},
                       new Trip { Id = 4,StartTime=new DateTime(2024, 01, 23),FinishTime=new DateTime(2024, 01, 24),TicketPrice=350,BusId=4,DriverId=4,FromStationId=4,ToStationId=3,Image="image4.jpg"},
                       new Trip { Id = 5,StartTime=new DateTime(2024, 01, 24),FinishTime=new DateTime(2024, 01, 25),TicketPrice=400,BusId=5,DriverId=5,FromStationId=5,ToStationId=1,Image="image5.jpg"},
                       new Trip { Id = 6,StartTime=new DateTime(2024, 01, 25),FinishTime=new DateTime(2024, 01, 26),TicketPrice=250,BusId=6,DriverId=6,FromStationId=5,ToStationId=3,Image="image6.jpg"},
                       new Trip { Id = 7,StartTime=new DateTime(2024, 01, 26),FinishTime=new DateTime(2024, 01, 27),TicketPrice=150,BusId=7,DriverId=7,FromStationId=4,ToStationId=2,Image="image7.jpg"},
                       new Trip { Id = 8,StartTime=new DateTime(2024, 01, 27),FinishTime=new DateTime(2024, 01, 28),TicketPrice=160,BusId=8,DriverId=8,FromStationId=3,ToStationId=4,Image="image8.jpg"},
                       new Trip { Id = 9,StartTime=new DateTime(2024, 01, 28),FinishTime=new DateTime(2024, 01, 29),TicketPrice=180,BusId=9,DriverId=9,FromStationId=2,ToStationId=1,Image="image9.jpg"},
                       new Trip { Id = 10,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=190,BusId=10,DriverId=10,FromStationId=1,ToStationId=4,Image="image10.jpg"},
                       new Trip { Id = 11,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=290,BusId=1,DriverId=1,FromStationId=1,ToStationId=4,Image="image11.jpg"},
                       new Trip { Id = 12,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=340,BusId=2,DriverId=2,FromStationId=5,ToStationId=4,Image="image12.jpg"},
                       new Trip { Id = 13,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=360,BusId=3,DriverId=3,FromStationId=4,ToStationId=5,Image="image13.jpg"},
                       new Trip { Id = 14,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=280,BusId=4,DriverId=4,FromStationId=3,ToStationId=1,Image="image14.jpg"},
                       new Trip { Id = 15,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=420,BusId=5,DriverId=5,FromStationId=2,ToStationId=5,Image="image15.jpg"},
                       new Trip { Id = 16,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=340,BusId=6,DriverId=6,FromStationId=1,ToStationId=3,Image="image16.jpg"},
                       new Trip { Id = 17,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=320,BusId=7,DriverId=7,FromStationId=2,ToStationId=4,Image="image17.jpg"},
                       new Trip { Id = 18,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=210,BusId=8,DriverId=8,FromStationId=3,ToStationId=5,Image="image18.jpg"},
                       new Trip { Id = 19,StartTime=new DateTime(2024, 01, 29),FinishTime=new DateTime(2024, 01, 30),TicketPrice=270,BusId=9,DriverId=9,FromStationId=4,ToStationId=1,Image="image19.jpg"},
                       new Trip { Id = 20,StartTime=new DateTime(2024, 01, 28),FinishTime=new DateTime(2024, 01, 29),TicketPrice=230,BusId=10,DriverId=10,FromStationId=5,ToStationId=2,Image="image20.jpg"},
            };
        }
    }
}
