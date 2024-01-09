
using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TripService : ITripRepo
    {
        private readonly DatabaseContext db;

        public TripService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<Trip> CreateTrip(Trip Trip)
        {
            await db.Trips.AddAsync(Trip);
            await db.SaveChangesAsync();

            TripStation FromTripStation = new TripStation { Name = "From", StationId = Trip.FromStationId, TripId = Trip.Id };
            await db.TripStations.AddAsync(FromTripStation);
            TripStation ToTripStation = new TripStation { Name = "To", StationId = Trip.ToStationId, TripId = Trip.Id };
            await db.TripStations.AddAsync(ToTripStation);
            await db.SaveChangesAsync();
            return Trip;
        }

        public async Task<IEnumerable<Trip>> GetAllTrip()
        {
            return await db.Trips.Include(b => b.TripStations).ThenInclude(b => b.Station)
                   .Select(b => new Trip
                   {
                       Id = b.Id,
                       TicketPrice = b.TicketPrice,
                       TripStations = b.TripStations.Select(ts => new TripStation
                       {
                           Name = ts.Name,
                           Station = new Station
                           {
                               Id = ts.Station.Id,
                               Name = ts.Station.Name,
                               Address = ts.Station.Address
                               //Thêm các thuộc tính khác của Station nếu cần thiết
                           }
                       }).ToList()
                   })
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Trip>> GetTripById(int Id)
        {
            return await db.Trips
                .Where(p => p.Id == Id)
                                .Include(p => p.FromStationId)
                                .Include(p => p.ToStationId)
                                .Include(p => p.BusId)

                                .ToListAsync();
        }
    }
}
