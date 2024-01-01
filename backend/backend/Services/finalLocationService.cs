using Microsoft.EntityFrameworkCore;
using backend.IRepository;
using backend.Models;

namespace backend.Services
{
    public class finalLocationService : IFinalLocationRepo
    {
        private readonly dbContext db;

        public finalLocationService(dbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<finalLocation>> getAllFinalLocation()
        {
            return await db.finalLocations.ToListAsync();
        }
    }
}
