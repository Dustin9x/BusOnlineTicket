using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<BusType> BusTypes { get; set; }
        public DbSet<BusStation> BusStations { get; set; }
        public DbSet<FAQ> FAQs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User { Id = 1, Email="admin@phtv.com",Password="123",Role="Admin"},
                new User { Id = 2, Email="emp@phtv.com",Password="123",Role="Emp"},
                new User { Id = 3, Email="user@phtv.com",Password="123",Role="User"}
            });
            modelBuilder.Entity<Station>(p =>
            {
                p.HasKey(p => p.Id);
                p.HasData(SeedData.StationData.StationSeedData());
            });
            modelBuilder.Entity<Ticket>(p =>
            {
                p.HasKey(p => p.Id);
            });
            modelBuilder.Entity<Bus>(b =>
            {
                b.HasKey(b => b.Id);
                b.HasIndex(u => u.BusPlate).IsUnique();
            });

            modelBuilder.Entity<Bus>()
                .HasMany(e => e.Stations)
                .WithMany(e => e.Buses)
                .UsingEntity<BusStation>();

            modelBuilder.Entity<Seat>(t =>
            {
                t.HasKey(t => t.Id);
            });
            modelBuilder.Entity<Trip>(b =>
            {
                b.HasKey(b => b.Id);
                //b.HasData(SeedData.TripData.TripSeedData());
            });
            modelBuilder.Entity<Driver>(b =>
            {
                b.HasKey(b => b.Id);
                b.HasData(new Driver[]
                {
                    new Driver {Id=1,Avatar="driver1.png",DriverLicense="234567",Email="driver1@phtv.com",FullName="Nguyen Van Toan",NationalId="2345678",Phone="090123456",PlaceOfBirth="Ho Chi Minh",Enabled=true,YearOfBirth=new DateTime(1995, 12, 25)},
                    new Driver {Id=2,Avatar="driver2.png",DriverLicense="234567",Email="driver2@phtv.com",FullName="Le Huy Phu",NationalId="2345678",Phone="090123456",PlaceOfBirth="Lam Dong",Enabled=true,YearOfBirth=new DateTime(1998, 07, 12)},
                });
            });
            modelBuilder.Entity<BusType>(b =>
            {
                b.HasKey(b => b.Id);
                b.HasData(SeedData.BusTypeData.BusTypeSeedData());
            });
            modelBuilder.Entity<Bus>()
                .HasOne(e => e.BusType)
                .WithMany(e => e.Buses)
                .HasForeignKey(e => e.BusTypeId);
            modelBuilder.Entity<BusStation>(b =>
            {
                b.HasKey(b => new { b.BusId, b.StationId });
            });
            modelBuilder.Entity<FAQ>(f =>
            {
                f.HasKey(p => p.Id);
                f.HasData(new FAQ[]
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
                });
            });
        }
    }
}
