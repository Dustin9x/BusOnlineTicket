using Microsoft.EntityFrameworkCore;
using backend.IRepository;
using backend.Models;

namespace backend.Services
{
    public class BusService : IBusrepo
    {
        private readonly dbContext db;

        public BusService(dbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<bus>> getAllBus()
        {
            return await db.bus.Include(b => b.seats)
                                    .Select(b => new bus
                                    {
                                     Id = b.Id, name = b.name, numberPlate = b.numberPlate,seats=b.seats,transportCompany=b.transportCompany,busServices=b.busServices
                                    })
                                 .ToListAsync();
        }

        public async Task<IEnumerable<bus>> getBusById(int Id)
        {
            return await db.bus.Where(b=> b.Id == Id)
                                   .Include(b => b.seats)
                                   .Select(b => new bus
                                   {
                                       Id = b.Id,
                                       name = b.name,
                                       numberPlate = b.numberPlate,
                                       seats = b.seats,
                                       transportCompany = b.transportCompany,
                                       busServices = b.busServices
                                   })
                                .ToListAsync();
        }
    }
}
