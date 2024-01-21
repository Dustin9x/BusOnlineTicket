using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class PromoteTripService : IPromoteTripRepo
    {
        private readonly DatabaseContext db;

        public PromoteTripService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<PromoteTrip>> GetAllPromoteTrip()
        {
            return await db.PromoteTrips.ToListAsync();
        }

        public async Task<IEnumerable<PromoteTrip>> GetPromoteTripById(int Id)
        {
            return await db.PromoteTrips.Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<bool> CreatePromoteTrip(PromoteTrip PromoteTrip)
        {
            double min = 0;
            var list = await db.Trips.Where(t => t.FromStation.Name == PromoteTrip.FromStation && t.ToStation.Name == PromoteTrip.ToStation).ToListAsync();
            if (list != null)
            {
                foreach (var t in list)
                {
                    min = Math.Min(min, t.TicketPrice);
                }
            }
            PromoteTrip.MinPrice = min;
            db.PromoteTrips.Add(PromoteTrip);
            int result = await db.SaveChangesAsync();
            if (result == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public Task<PromoteTrip> DeletePromoteTrip(int Id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> PutPromoteTrip(int Id, PromoteTrip PromoteTrip)
        {
            double min = 0;
            var oldPromoteTrip = await db.PromoteTrips.FindAsync(Id);
            if (oldPromoteTrip != null)
            {
                var list = await db.Trips.Where(t => t.FromStation.Name == PromoteTrip.FromStation && t.ToStation.Name == PromoteTrip.ToStation).ToListAsync();
                if (list != null)
                {
                    foreach (var t in list)
                    {
                        min = Math.Min(min, t.TicketPrice);
                    }
                }
                oldPromoteTrip.FromStation = PromoteTrip.FromStation;
                oldPromoteTrip.ToStation = PromoteTrip.ToStation;
                oldPromoteTrip.MinPrice = min;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
