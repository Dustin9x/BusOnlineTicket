using Microsoft.EntityFrameworkCore;
using backend.IRepository;
using backend.Models;

namespace backend.Services
{
    public class firstLocationService :IFirstLocationRepo
    {
        private readonly dbContext db;

        public firstLocationService(dbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<firstLocation>> getAllFirstLocation()
        {
            return await db.firstLocations.ToListAsync();
        }
    }
}
