
using Microsoft.EntityFrameworkCore;
using project.IRepository;
using project.Models;

namespace project.Services
{
    public class busSerivceService : IBusServiceRepo
    {
        private readonly dbContext db;

        public busSerivceService(dbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<busService>> getAllBusService()
        {
            return await db.busServices
                                 .Include(p => p.firstLocations)
                                 .Include(p => p.finalLocations)
                                 .Include(p => p.bus)

                                 .ThenInclude(p => p.seats)
                                 .Include(p=>p.bus.transportCompany)
                                    .Select(b => new busService
                                    {
                                        Id = b.Id,
                                        date = b.date,
                                        price = b.price,
                                        
                                        bus = new bus  {Id = b.bus.Id,name=b.bus.name,numberPlate= b.bus.numberPlate,seats= b.bus.seats, transportCompanyId= b.bus.transportCompanyId, transportCompany = b.bus.transportCompany  },
                                        firstLocations= new firstLocation { Id = b.firstLocations.Id, name = b.firstLocations.name },
                                        finalLocations = new finalLocation { Id = b.finalLocations.Id, name = b.finalLocations.name },
                                    })
                                 .ToListAsync();
        }

        public async Task<IEnumerable<busService>> getBusServiceById(int Id)
        {
            return await db.busServices
                .Where(p => p.Id == Id)
                                .Include(p => p.firstLocations)
                                .Include(p => p.finalLocations)
                                .Include(p => p.bus)

                                .ThenInclude(p => p.seats)
                                .Include(p => p.bus.transportCompany)
                                   .Select(b => new busService
                                   {
                                       Id = b.Id,
                                       date = b.date,
                                       price = b.price,

                                       bus = new bus { Id = b.bus.Id, name = b.bus.name, numberPlate = b.bus.numberPlate, seats = b.bus.seats, transportCompanyId = b.bus.transportCompanyId, transportCompany = b.bus.transportCompany },
                                       firstLocations = new firstLocation { Id = b.firstLocations.Id, name = b.firstLocations.name },
                                       finalLocations = new finalLocation { Id = b.finalLocations.Id, name = b.finalLocations.name },
                                   })
                                   
                                .ToListAsync();
        }
    }
}
