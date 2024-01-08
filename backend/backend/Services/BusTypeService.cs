using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BusTypeService : IBusTypeRepo
    {
        private readonly DatabaseContext db;

        public BusTypeService(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<bool> CreateBusType(BusType busType)
        {
            db.BusTypes.Add(busType);
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

        public async Task<BusType> DeleteBusType(int Id)
        {
            var ExistingBusType = await db.BusTypes.SingleOrDefaultAsync(x => x.Id == Id);
            if (ExistingBusType != null)
            {
                db.BusTypes.Remove(ExistingBusType);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return ExistingBusType;
                }
            }
            return null;
        }

        public async Task<IEnumerable<BusType>> GetAllBusType()
        {
            return await db.BusTypes.ToListAsync();
        }

        public async Task<IEnumerable<BusType>> GetBusTypeById(int Id)
        {
            return await db.BusTypes.Where(B => B.Id == Id).ToListAsync();
        }

        public async Task<bool> PutBusType(BusType busType)
        {
            var ExistingBusType = await db.BusTypes.FindAsync(busType.Id);
            if (ExistingBusType != null)
            {
                ExistingBusType.NumberSeat = busType.NumberSeat;
                ExistingBusType.Name = busType.Name;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }

        
    }
}
