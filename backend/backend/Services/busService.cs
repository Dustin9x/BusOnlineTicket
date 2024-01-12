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


        public async Task<IEnumerable<Bus>> GetAllBus()
        {
            return await db.Buses.Include(b => b.BusType).Include(s => s.Stations).Include(t => t.Trips).ToListAsync();
        }


        public async Task<IEnumerable<Bus>> GetBusById(int Id)
        {
            return await db.Buses.Include(s => s.Stations).Where(b => b.Id == Id).ToListAsync();
        }


        public async Task<bool> CreateBus(Bus Bus)
        {
            db.Buses.Add(Bus);
            await db.SaveChangesAsync();

            List<string> list = Bus.StationId.Split(",").ToList();
            for (int i = 0; i < list.Count; i++)
            {
                int id = Int32.Parse(list[i]);
                BusStation station = new BusStation { BusId = Bus.Id, StationId = id };
                db.BusStations.Add(station);
                await db.SaveChangesAsync();
            }
            return true;
        }


        public async Task<bool> PutBus(int Id, Bus Bus)
        {
            var ExistingBus = await db.Buses.FindAsync(Id);
            if (ExistingBus != null)
            {
                ExistingBus.BusType = Bus.BusType;
                ExistingBus.BusPlate = Bus.BusPlate;
                ExistingBus.Note = Bus.Note;
                var station = await db.BusStations.Where(x => x.BusId == Id).ToListAsync();
                foreach (var item in station)
                {
                    db.BusStations.Remove(item);
                    await db.SaveChangesAsync();
                }
                var BusId = Id;
                List<string> list = Bus.StationId.Split(",").ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    int id = Int32.Parse(list[i]);
                    BusStation newStation = new BusStation { BusId = BusId, StationId = id };
                    db.BusStations.Add(newStation);
                    await db.SaveChangesAsync();
                }
                await db.SaveChangesAsync();
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
                var station = await db.BusStations.Where(x => x.BusId == Id).ToListAsync();
                foreach (var item in station)
                {
                    db.BusStations.Remove(item);
                    await db.SaveChangesAsync();
                }
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
    }
}
