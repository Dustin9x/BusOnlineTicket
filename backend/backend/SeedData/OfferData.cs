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
                        Discount=40,
                        Title="30% off for LUNARNEWYEAR 2024",
                        Content="<h2>Terms of the Offers</h2><ul><li>Apply Coupon code NEWYEAR24 at bus booking checkout and get 30%.</li><li>This is a special offer valid for bus bookings made on PHTV.</li><li>No minimum transaction value.</li><li>This offer is valid for all PHTV users.</li><li>This offer cannot be combined with any other offer.</li><li>PHTV reserves the right to disqualify any transaction or discontinue the offer promotion at any time without notice or liability of whatsoever nature.</li></ul>",
                        BeginDate=new DateTime(2024, 01, 31),
                        EndDate=new DateTime(2024, 02, 7),
                        Image="offer1.png"
                    },
            };
        }
    }
}
