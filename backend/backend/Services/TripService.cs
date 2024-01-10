
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

        public async Task<bool> CreateTrip(Trip Trip)
        {
            await db.Trips.AddAsync(Trip);
            await db.SaveChangesAsync();

            TripStation FromTripStation = new TripStation { Name = "From", StationId = Trip.FromStationId, TripId = Trip.Id };
            await db.TripStations.AddAsync(FromTripStation);
            TripStation ToTripStation = new TripStation { Name = "To", StationId = Trip.ToStationId, TripId = Trip.Id };
            await db.TripStations.AddAsync(ToTripStation);
            await db.SaveChangesAsync();
            return true;
        }

        public async Task<Trip> DeleteTrip(int Id)
        {
            var ExistingTrip = await db.Trips.SingleOrDefaultAsync(b => b.Id == Id);
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
                    db.Remove(ExistingTrip);
                    int resultTrip = await db.SaveChangesAsync();
                    if (resultTrip > 0)
                    {
                        return ExistingTrip;
                    }
                    return null;
                }
                return null;
            }
            return null;
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
                           }
                       }).ToList()
                   })
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Trip>> GetTripById(int Id)
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
                                           }
                                       }).ToList()
                                   })
                                   .Where(b => b.Id == Id)
                                 .ToListAsync();
        }
        public async Task<bool> PutTrip(Trip Trip)
        {
            var ExistingTrip = await db.Trips.SingleOrDefaultAsync(t => t.Id == Trip.Id);
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
            }
            return false;
        }
    }
}
