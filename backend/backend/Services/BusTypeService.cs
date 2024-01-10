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

        // khởi tạo số phần tử của 1 trang
        public static int PAGE_SIZE { get; set; } = 5;


        public async Task<IEnumerable<BusType>> GetAllBusType()
        {
            return await db.BusTypes.ToListAsync();
        }


        public async Task<IEnumerable<BusType>> GetBusTypeById(int Id)
        {
            return await db.BusTypes.Where(b => b.Id == Id).ToListAsync();
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


        public async Task<bool> PutBusType(int Id, BusType busType)
        {
            var ExistingBusType = await db.BusTypes.FindAsync(Id);
            if (ExistingBusType != null)
            {
                ExistingBusType.NumberOfSeat = busType.NumberOfSeat;
                ExistingBusType.Name = busType.Name;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
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


        // Pagination , Search , ...
        public List<BusType> OptionsAsDesired(string? search, int page = 1)
        {
            var allBusType = db.BusTypes.AsQueryable();
            // Filter
            // nếu khác null thì mới where
            if (!string.IsNullOrEmpty(search))
            {
                allBusType = allBusType.Where(b => b.Name.Contains(search));
            }

            allBusType = allBusType.OrderByDescending(hh => hh.Name);

            allBusType = allBusType.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE);
            var result = allBusType.Select(tr => new BusType
            {
                Id = tr.Id,
                Name = tr.Name,
                NumberOfSeat = tr.NumberOfSeat,
            });
            return result.ToList();
        }
    }
}
