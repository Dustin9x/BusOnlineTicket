using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BusService : IBusRepo
    {
        private readonly DatabaseContext db;

        public BusService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreateBus(Bus Bus)
        {
            db.Buses.Add(Bus);
            int result = await db.SaveChangesAsync();
            if (result != 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<Bus> DeleteBus(int Id)
        {
            var ExistingBus = await db.Buses.SingleOrDefaultAsync(p => p.Id == Id);
            if (ExistingBus != null)
            {
                db.Buses.Remove(ExistingBus);
                int result = await db.SaveChangesAsync();
                if (result != 0)
                {
                    return ExistingBus;
                }
                else
                {
                    return null;
                }
            }
            return null;
        }

        public async Task<IEnumerable<Bus>> GetAllBus()
        {
            return await db.Buses.Include(b => b.BusType).Include(s => s.Stations).Include(t => t.Trips).ToListAsync();
        }

        public async Task<IEnumerable<Bus>> GetBusById(int Id)
        {
            return await db.Buses.Include(s => s.Stations).Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<bool> PutBus(Bus Bus)
        {
            var ExistingBus = await db.Buses.FindAsync(Bus.Id);
            if (ExistingBus != null)
            {
                ExistingBus.BusType = Bus.BusType;
                ExistingBus.BusPlate = Bus.BusPlate;
                ExistingBus.Note = Bus.Note;
                await db.SaveChangesAsync();
                return true;

            }
            else
            {
                return false;
            }
        }
    }
}
