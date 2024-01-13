
using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TripService : ITripRepo
    {
        private readonly DatabaseContext db;
        private readonly IWebHostEnvironment env;

        public TripService(DatabaseContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

        public static int PAGE_SIZE { get; set; } = 5;

        public async Task<IEnumerable<Trip>> GetAllTrip()
        {
            return await db.Trips.Include(b => b.Bus).Include(s => s.FromStation).Include(s => s.ToStation).ToListAsync();
        }

        public async Task<IEnumerable<Trip>> GetTripById(int Id)
        {
            return await db.Trips.Include(b => b.Bus).Include(s => s.FromStation).Include(s => s.ToStation).Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<bool> CreateTrip(Trip Trip)
        {
            try
            {
                Bus bus = db.Buses.Where(b => b.Id == Trip.BusId).FirstOrDefault();
                Station fromStation = db.Stations.Where(s => s.Id == Trip.FromStationId).FirstOrDefault();
                Station toStation = db.Stations.Where(s => s.Id == Trip.ToStationId).FirstOrDefault();

                Trip.Bus = bus;
                Trip.FromStation = fromStation;
                Trip.ToStation = toStation;

                if (Trip.UploadImage.Length > 0)
                {
                    string pathToNewFolder = System.IO.Path.Combine("Images", "Trip");
                    DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                    var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                    var filePath = Path.Combine(Path.GetRandomFileName() + Trip.UploadImage.FileName);

                    using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                    {
                        await Trip.UploadImage.CopyToAsync(stream);
                    }

                    Trip.Image = filePath;
                }

                await db.Trips.AddAsync(Trip);
                await db.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public async Task<Trip> DeleteTrip(int Id)
        {
            var ExistingTrip = await db.Trips.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingTrip != null)
            {

                if (!string.IsNullOrEmpty(ExistingTrip.Image))
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/Trip");
                    if (System.IO.File.Exists(Path.Combine(upload, ExistingTrip.Image)))
                    {
                        System.IO.File.Delete(Path.Combine(upload, ExistingTrip.Image)); // Xóa tệp tin ảnh
                    }
                }

                db.Trips.Remove(ExistingTrip);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return ExistingTrip;
                }
            }
            return null;
        }

        public async Task<bool> PutTrip(Trip Trip)
        {
            /*var ExistingTrip = await db.Trips.SingleOrDefaultAsync(t => t.Id == Trip.Id);
            if (ExistingTrip != null)
            {
                var ExistingTripStation = await db.TripStations.Where(b => b.TripId == ExistingTrip.Id).ToListAsync();

                for (int i = 0; i < 2; i++)
                {
                    db.Remove(ExistingTripStation[i]);
                }

                int resultTripStation = await db.SaveChangesAsync();
                if (resultTripStation > 0)
                {

                    ExistingTrip.BusId = Trip.BusId;
                    ExistingTrip.FromStationId = Trip.FromStationId;
                    ExistingTrip.ToStationId = Trip.ToStationId;

                    ExistingTrip.FinishTime = Trip.FinishTime;
                    ExistingTrip.StartTime = Trip.StartTime;

                    ExistingTrip.TicketPrice = Trip.TicketPrice;

                    int result = await db.SaveChangesAsync();
                    if (result > 0)
                    {
                        TripStation FromTripStation = new TripStation { Name = "From", StationId = ExistingTrip.FromStationId, TripId = Trip.Id };
                        await db.TripStations.AddAsync(FromTripStation);
                        TripStation ToTripStation = new TripStation { Name = "To", StationId = ExistingTrip.ToStationId, TripId = Trip.Id };
                        await db.TripStations.AddAsync(ToTripStation);
                        await db.SaveChangesAsync();

                        return true;
                    }

                }
            }*/
            return false;
        }


        public List<Trip> OptionsAsDesired(string? sortByPrice, string? sortByTime, int page = 1)
        {
            var allTrips = db.Trips.AsQueryable();
            if (!string.IsNullOrEmpty(sortByPrice))
            {
                switch (sortByPrice)
                {
                    case "pirceIncrease":
                        allTrips = allTrips.OrderBy(trip => trip.TicketPrice);
                        break;
                    case "priceDecrease":
                        allTrips = allTrips.OrderByDescending(trip => trip.TicketPrice);
                        break;

                }
            }

            if (!string.IsNullOrEmpty(sortByTime))
            {
                switch (sortByTime)
                {
                    case "timeIncrease":
                        allTrips = allTrips.OrderBy(trip => trip.StartTime);
                        break;
                    case "timeDecrease":
                        allTrips = allTrips.OrderByDescending(trip => trip.StartTime);
                        break;

                }
            }


            allTrips = allTrips.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE);
            var result = allTrips.Select(trip => new Trip
            {
                Id = trip.Id,
                StartTime = trip.StartTime,
                FinishTime = trip.FinishTime,
                TicketPrice = trip.TicketPrice,
                BusId = trip.BusId,
                FromStationId = trip.FromStationId,
                ToStationId = trip.ToStationId,
                Seats = trip.Seats,
                Bus = trip.Bus,
            });

            return result.ToList();
        }
    }
}
