
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

        public async Task<IEnumerable<Trip>> GetAllTrip()
        {
            return await db.Trips
                                 .Include(p => p.FromStationId)
                                 .Include(p => p.FromStationId)
                                 .Include(p => p.Buses)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Trip>> GetTripById(int Id)
        {
            return await db.Trips
                .Where(p => p.Id == Id)
                                .Include(p => p.FromStationId)
                                .Include(p => p.ToStationId)
                                .Include(p => p.Buses)

                                .ToListAsync();
        }
    }
}
