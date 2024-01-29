using backend.Models;

namespace backend.SeedData
{
    public class OfferData
    {
        public static Offer[] OfferSeedData()
        {
            return new Offer[]
            {
                 new Offer
                    {
                        Id = 1,
                        OfferCode="NEWYEAR24",
                        Discount=30,
                        Title="30% off for LUNARNEWYEAR 2024 ",
                        BeginDate=new DateTime(2024, 01, 31),
                        EndDate=new DateTime(2024, 02, 7),
                        Enabled=true,
                        Image="offer1.png"
                    },
                 new Offer
                    {
                        Id = 2,
                        OfferCode="HCMHANOI",
                        Discount=40,
                        FromStation="Hồ Chí Minh",
                        ToStation="Hà Nội",
                        Title="40% off for route HO CHI MINH to HA NOI",
                        BeginDate=new DateTime(2024, 01, 25),
                        EndDate=new DateTime(2024, 01, 29),
                        Enabled=true,
                        Image="offer2.png"
                    },
                 new Offer
                    {
                        Id = 3,
                        OfferCode="HANOIDALAT30",
                        Discount=30,
                        FromStation="Hà Nội",
                        ToStation="Đà Lạt",
                        Title="30% off for route HA NOI to DA LAT",
                        BeginDate=new DateTime(2024, 01, 25),
                        EndDate=new DateTime(2024, 02, 29),
                        Enabled=true,
                        Image="offer3.png"
                    },
                 new Offer
                    {
                        Id = 4,
                        OfferCode="WELCOME2024",
                        Discount=20,
                        FromStation="Hồ Chí Minh",
                        ToStation="Bến Tre",
                        Title="DISCOUNT 20% WITH CODE WELCOME2024",
                        BeginDate=new DateTime(2024, 01, 25),
                        EndDate=new DateTime(2024, 02, 10),
                        Enabled=true,
                        Image="offer4.png"
                    },
            };
        }
    }
}
