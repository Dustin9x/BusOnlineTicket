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
            return await db.Buses
                .Select(b => new Bus()
                {
                    Id = b.Id,
                    BusPlate = b.BusPlate,
                    BusType = db.BusTypes.Where(t => t.Id == b.BusTypeId).Select(bt => new BusType()
                    {
                        Id = bt.Id,
                        Name = bt.Name,
                        NumberOfSeat = bt.NumberOfSeat,
                    }).SingleOrDefault(),
                    StationId = b.StationId,
                    Stations = b.Stations,
                    Enabled = b.Enabled,
                    Note = b.Note,
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<Bus>> GetEnableBus()
        {
            return await db.Buses.Where(b => b.Enabled == true)
                .Select(b => new Bus()
                {
                    Id = b.Id,
                    BusPlate = b.BusPlate,
                    BusType = db.BusTypes.Where(t => t.Id == b.BusTypeId).Select(bt => new BusType()
                    {
                        Id = bt.Id,
                        Name = bt.Name,
                        NumberOfSeat = bt.NumberOfSeat,
                    }).SingleOrDefault(),
                    StationId = b.StationId,
                    Stations = b.Stations,
                    Enabled = b.Enabled,
                    Trips = db.Trips.Where(t => t.BusId == b.Id).Select(tr => new Trip()
                    {
                        BusId = tr.BusId,
                        StartTime = tr.StartTime,
                        FinishTime = tr.FinishTime,
                    }).ToList(),
                    Note = b.Note,
                })
                .ToListAsync();
        }


        public async Task<IEnumerable<Bus>> GetBusById(int Id)
        {
            return await db.Buses.Include(s => s.Stations).Where(b => b.Id == Id).ToListAsync();
        }


        public async Task<bool> CreateBus(Bus Bus)
        {
            db.Buses.Add(Bus);
            await db.SaveChangesAsync();

            if (Bus.StationId != null)
            {
                List<string> list = Bus.StationId.Split(",").ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    int id = Int32.Parse(list[i]);
                    BusStation station = new BusStation { BusId = Bus.Id, StationId = id };
                    db.BusStations.Add(station);
                    await db.SaveChangesAsync();
                }
            }

            return true;
        }


        public async Task<bool> PutBus(int Id, Bus Bus)
        {
            var ExistingBus = await db.Buses.FindAsync(Id);
            if (ExistingBus != null)
            {
                ExistingBus.BusTypeId = Bus.BusTypeId;
                ExistingBus.StationId = Bus.StationId;
                ExistingBus.BusPlate = Bus.BusPlate;
                ExistingBus.Note = Bus.Note;
                ExistingBus.Enabled = Bus.Enabled;
                var station = await db.BusStations.Where(x => x.BusId == Id).ToListAsync();
                foreach (var item in station)
                {
                    db.BusStations.Remove(item);
                    await db.SaveChangesAsync();
                }
                var BusId = Id;
                if (Bus.StationId != null)
                {
                    List<string> list = Bus.StationId.Split(",").ToList();
                    for (int i = 0; i < list.Count; i++)
                    {
                        int id = Int32.Parse(list[i]);
                        BusStation newStation = new BusStation { BusId = BusId, StationId = id };
                        db.BusStations.Add(newStation);
                        await db.SaveChangesAsync();
                    }
                }
                await db.SaveChangesAsync();
                return true;

            }
            else
            {
                return false;
            }
        }

        public async Task<Bus> EnableDisableBus(int Id)
        {
            var ExistingBus = await db.Buses.FindAsync(Id);
            if (ExistingBus != null)
            {
                ExistingBus.Enabled = !ExistingBus.Enabled;
                await db.SaveChangesAsync();
                return ExistingBus;
            }
            else
            {
                return null;
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
