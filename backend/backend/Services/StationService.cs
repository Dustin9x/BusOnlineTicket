using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class StationService : IStationRepo
    {
        private readonly DatabaseContext db;

        public StationService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Station>> GetAllStation()
        {
            return await db.Stations.ToListAsync();
        }


        public async Task<IEnumerable<Station>> GetStationById(int Id)
        {
            return await db.Stations.Where(s => s.Id == Id).ToListAsync();
        }


        public async Task<bool> CreateStation(Station Station)
        {

            await db.Stations.AddAsync(Station);
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


        public async Task<bool> PutStation(int Id, Station Station)
        {
            var ExistingStation = await db.Stations.FindAsync(Id);
            if (ExistingStation != null)
            {
                ExistingStation.Name = Station.Name;
                ExistingStation.Address = Station.Address;
                await db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }

        }


        public async Task<Station> DeleteStation(int Id)
        {
            var ExistinStation = await db.Stations.SingleOrDefaultAsync(p => p.Id == Id);
            if (ExistinStation != null)
            {
                db.Stations.Remove(ExistinStation);
                int result = await db.SaveChangesAsync();
                if (result != 0)
                {
                    return ExistinStation;
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
