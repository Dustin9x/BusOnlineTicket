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

        public async Task<bool> AddSeat(Ticket ticket)
        {
            try
            {
                List<string> list = ticket.SeatsList.Split(",").ToList();
                foreach (var item in list)
                {
                    Seat newSeat = new Seat { UserId = ticket.UserId, TripId = ticket.TripId, Name = item };
                    await db.Seats.AddAsync(newSeat);
                    await db.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<Seat> DeleteSeat(int Id)
        {
            var delSeat = await db.Seats.Where(x => x.TripId == Id).ToListAsync();
            foreach (var item in delSeat)
            {
                db.Seats.Remove(item);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return item;
                }
            }
            return null;
        }

        public async Task<IEnumerable<Seat>> GetSeat(int Id)
        {
            return await db.Seats.Where(s => s.TripId == Id).ToListAsync();
        }
    }
}
