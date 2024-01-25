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
        public DbSet<PromoteTrip> PromoteTrips { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<BusType> BusTypes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<BusStation> BusStations { get; set; }
        public DbSet<FAQ> FAQs { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Offer> Offers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User
                {
                    Id = 1,
                    Email="admin@phtv.com",
                    Password=BCrypt.Net.BCrypt.HashPassword("admin"),
                    Role="Admin"
                },
                new User
                {
                    Id = 2,
                    Email="emp@phtv.com",
                    Password=BCrypt.Net.BCrypt.HashPassword("mod123"),
                    Role="Mod"
                },
                new User
                {
                    Id = 3,
                    Email="user@phtv.com",
                    Password=BCrypt.Net.BCrypt.HashPassword("user123"),
                    Role="User"
                }
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
                b.HasData(SeedData.BusData.BusSeedData());
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
            modelBuilder.Entity<PromoteTrip>(t =>
            {
                t.HasKey(t => t.Id);
                t.HasData(SeedData.PromoteTripData.PromoteTripSeedData());
            });
            modelBuilder.Entity<Trip>(b =>
            {
                b.HasKey(b => b.Id);
                b.HasData(SeedData.TripData.TripSeedData());
            });
            modelBuilder.Entity<Driver>(b =>
            {
                b.HasKey(b => b.Id);
                b.HasData(SeedData.DriverData.DriverSeedData());
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
                f.HasData(SeedData.FAQData.FAQSeedData());
            });
            modelBuilder.Entity<News>(n =>
            {
                n.HasKey(n => n.Id);
                n.HasData(SeedData.NewsData.NewsSeedData());
            });
            modelBuilder.Entity<Offer>(o =>
            {
                o.HasKey(o => o.Id);
            });
        }
    }
}
