using Microsoft.EntityFrameworkCore;

namespace project.Models
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<firstLocation>firstLocations {  get; set; }
        public DbSet<finalLocation>finalLocations { get; set; }
        public DbSet<busService> busServices { get; set; }
        public DbSet<transportCompany> transportCompanies { get; set; }
        public DbSet<bus> bus { get; set; }
        public DbSet<formBus> formBus { get; set; }
        public DbSet<seat> seats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<firstLocation>(p =>
            {
                p.HasKey(p => p.Id);
                p.HasData(SeedData.locationData.firstLocationSeedData());
            });
            modelBuilder.Entity<finalLocation>(p =>
            {
                p.HasKey(p => p.Id);
                p.HasData(SeedData.locationData.finalLocationSeedData());
            });
            modelBuilder.Entity<transportCompany>(t =>
            {
                t.HasKey(t => t.Id);
                t.HasData(SeedData.transportCompanyData.transportCompanySeedData());
            });
            modelBuilder.Entity<bus>(t =>
            {
                t.HasKey(t => t.Id);
                t.HasOne(p => p.transportCompany).WithMany(c => c.bus).HasForeignKey(p => p.transportCompanyId);
                t.HasData(SeedData.busData.busSeedData());
            });
            modelBuilder.Entity<formBus>(t =>
            {
                t.HasKey(t => t.Id);
                t.HasOne(p => p.transportCompany).WithMany(c => c.formBus).HasForeignKey(p => p.transportCompanyId);
                t.HasData(SeedData.formBusData.formBusSeedData());
            });
            modelBuilder.Entity<seat>(t =>
            {
                t.HasKey(t => t.Id);
                t.HasOne(p => p.bus).WithMany(c => c.seats).HasForeignKey(p => p.busId);
                t.HasData(SeedData.seatData.seatSeedData());
            });
            modelBuilder.Entity<busService>(b =>
            {
                b.HasKey(b => b.Id);
                b.HasOne(p => p.bus).WithMany(c => c.busServices).HasForeignKey(p => p.busId);
                b.HasOne(p => p.firstLocations).WithMany(c => c.busServices).HasForeignKey(p => p.firstLocationId);
                b.HasOne(p => p.finalLocations).WithMany(c => c.busServices).HasForeignKey(p => p.finalLocationId);
                b.HasData(SeedData.busServiceData.busServiceSeedData());
            });
         
        }
    }
}
