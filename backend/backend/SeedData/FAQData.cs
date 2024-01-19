using backend.Models;

namespace backend.SeedData
{
    public class FAQData
    {
        public static FAQ[] FAQSeedData()
        {
            return new FAQ[]
            {
                 new FAQ
                    {
                        Id = 1,
                        Question="Q. How do you do online bus reservation on PHTV Bus?",
                        Answer="Ans: Booking a bus ticket online in India is easy with PHTV Bus. Simply enter the Leaving from (Origin City) -- Going to (destination city) details along with the date you wish to travel in the bus search option on the site. Within seconds you will be given a list of available running buses for your route. Select the bus that best suits you, then just follow the bus ticket booking process by selecting your seat, providing passenger details and completing the payment process. Upon successful booking confirmation, you will receive an e-ticket over email."
                    },
                    new FAQ
                    {
                        Id = 2,
                        Question="Q. Do I need to create an account to book bus tickets on PHTV Bus?",
                        Answer="Ans: You do not need to create an account to view bus availability and seat availability. However, you need to register an account to be able to book tickets, this is to assist you in future transactions and support."
                    },
                    new FAQ
                    {
                        Id = 3,
                        Question="Q. How do I get the bus ticket after booking?",
                        Answer="Ans: We'll send you a e-ticket by email after your booking is confirmed. Simply board by presenting your e-ticket."
                    },
                    new FAQ
                    {
                        Id = 4,
                        Question="Q. Can I cancel my ticket and get a refund?",
                        Answer="Ans: If you cancel before 2 days of Journey date then the whole money will be returned, if done one day before then 15% is debited from the total amount is returned, and if done on that day 30% is debited from the total amount is to be returned back."
                    },
            };
        }
    }
}
