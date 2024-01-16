using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class SeatService : ISeatRepo
    {
        private readonly DatabaseContext db;

        public SeatService(DatabaseContext db)
        {
            this.db = db;
        }

        public Task<bool> AddSeat(Seat seat)
        {
            throw new NotImplementedException();
        }

        public Task<Seat> DeleteSeat(int Id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Seat>> GetSeat(int Id)
        {
            return await db.Seats.Where(s => s.TripId == Id).ToListAsync();
        }
    }
}
