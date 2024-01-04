using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class DriverService : IDriverRepo
    {
        private readonly DatabaseContext db;

        public DriverService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Driver>> GetAllDriver()
        {
            return await db.Drivers.ToListAsync();
        }
    }
}
