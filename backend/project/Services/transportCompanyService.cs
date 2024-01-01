using Microsoft.EntityFrameworkCore;
using project.IRepository;
using project.Models;

namespace project.Services
{
    public class transportCompanyService : ITransportCompanyRepo
    {
        private readonly dbContext db;

        public transportCompanyService(dbContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<transportCompany>> getAlltransportCompany()
        {
            return await db.transportCompanies
                                   .Include(t => t.formBus)
                                   .ToListAsync();
        }
    }
}
