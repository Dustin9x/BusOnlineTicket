using backend.Models;

namespace backend.SeedData
{
    public class DriverData
    {
        public static Driver[] DriverSeedData()
        {
            return new Driver[]
            {
                    new Driver {Id=1,Avatar="driver1.png",DriverLicense="234567",Email="driver1@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver1@phtv.com"),FullName="Nguyen Van Toan",NationalId="2345678",Phone="090123456",PlaceOfBirth="Ho Chi Minh",isApprove=true,Enabled=true,YearOfBirth=new DateTime(1995, 12, 25)},
                    new Driver {Id=2,Avatar="driver2.png",DriverLicense="234567",Email="driver2@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver2@phtv.com"),FullName="Le Huy Phu",NationalId="2345678",Phone="090123456",PlaceOfBirth="Lam Dong",isApprove=true,Enabled=true,YearOfBirth=new DateTime(1998, 07, 12)},
                    new Driver {Id=3,Avatar="driver3.png",DriverLicense="234568",Email="driver3@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver3@phtv.com"),FullName="Bui Quoc Viet",NationalId="2345679",Phone="090123457",PlaceOfBirth="Binh Thuam",isApprove=true,Enabled=true,YearOfBirth=new DateTime(1993, 07, 06)},
                    new Driver {Id=4,Avatar="driver4.png",DriverLicense="234569",Email="driver4@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver4@phtv.com"),FullName="Pham Huy Hoang",NationalId="2345670",Phone="090123458",PlaceOfBirth="Gia Lai",isApprove=true,Enabled=true,YearOfBirth=new DateTime(1990, 09, 05)},
                    new Driver {Id=5,Avatar="driver5.png",DriverLicense="234560",Email="driver5@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver5@phtv.com"),FullName="Le Huy Chuong",NationalId="2345671",Phone="090123459",PlaceOfBirth="Vung Tau",isApprove=true,Enabled=true,YearOfBirth=new DateTime(1999, 12, 24)},
                    new Driver {Id=6,Avatar="driver6.png",DriverLicense="234561",Email="driver6@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver6@phtv.com"),FullName="Le Thanh Thien",NationalId="2345672",Phone="090123450",PlaceOfBirth="Hà Nội",Enabled=true,YearOfBirth=new DateTime(1997, 03, 12)},
                    new Driver {Id=7,Avatar="driver7.png",DriverLicense="234562",Email="driver7@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver7@phtv.com"),FullName="Le Dai Vi",NationalId="2345673",Phone="090123452",PlaceOfBirth="Ca Mau",Enabled=true,YearOfBirth=new DateTime(1996, 01, 12)},
                    new Driver {Id=8,Avatar="driver8.png",DriverLicense="234563",Email="driver8@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver8@phtv.com"),FullName="Le Huy Phu",NationalId="2345674",Phone="090123451",PlaceOfBirth="Lam Dong",Enabled=true,YearOfBirth=new DateTime(1994, 01, 11)},
                    new Driver {Id=9,Avatar="driver9.png",DriverLicense="234564",Email="driver9@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver9@phtv.com"),FullName="Le Huy Quan",NationalId="2345675",Phone="090123453",PlaceOfBirth="Ben Tre",Enabled=true,YearOfBirth=new DateTime(2000, 07, 10)},
                    new Driver {Id=10,Avatar="driver10.png",DriverLicense="234565",Email="driver10@phtv.com",Password=BCrypt.Net.BCrypt.HashPassword("driver10@phtv.com"), FullName="Le Huy Linh",NationalId="2345676",Phone="090123455",PlaceOfBirth="Dong Thap",Enabled=true,YearOfBirth=new DateTime(1978, 04, 06)},
            };
        }
    }
}
