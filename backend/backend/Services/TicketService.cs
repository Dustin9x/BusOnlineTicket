using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TicketService : ITicketRepo
    {
        private readonly DatabaseContext db;

        public TicketService(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<bool> AddTicket(Ticket ticket)
        {
            try
            {
                Trip trip = db.Trips.Where(b => b.Id == ticket.TripId).FirstOrDefault();
                User user = db.Users.Where(s => s.Id == ticket.UserId).FirstOrDefault();
                ticket.Trips = trip;
                ticket.Users = user;
                db.Tickets.Add(ticket);
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }

        }

        public async Task<IEnumerable<Ticket>> GetTicketByUser(int Id)
        {
            User user = await db.Users.Where(u => u.Id == Id).Select(u => new User { Email = u.Email }).FirstOrDefaultAsync();
            var list = await db.Tickets.Include(t => t.Trips).ThenInclude(s => s.FromStation).Include(t => t.Trips).ThenInclude(s => s.ToStation).Include(t => t.Users)
                .Where(s => s.UserId == Id)
                .Select(t => new Ticket
                {
                    Id = t.Id,
                    Code = t.Code,
                    Trips = t.Trips,
                    Users = user,
                    SeatsList = t.SeatsList,
                    TotalPrice = t.TotalPrice,
                    isCancel = t.isCancel,
                    Note = t.Note,
                    BookDate = t.BookDate
                })
                .ToListAsync();
            return list;
        }

        public async Task<IEnumerable<Ticket>> SearchTicket(string Code)
        {
            return await db.Tickets.Include(t => t.Trips).ThenInclude(s => s.FromStation).Include(t => t.Trips).ThenInclude(s => s.ToStation).Include(t => t.Users).Include(t => t.Trips).ThenInclude(b => b.Bus)
                .Where(s => s.Code == Code)
                .Select(t => new Ticket
                {
                    Id = t.Id,
                    Code = t.Code,
                    Trips = t.Trips,
                    Users = db.Users.Where(u => u.Id == t.UserId).Select(u => new User { Email = u.Email }).FirstOrDefault(),
                    SeatsList = t.SeatsList,
                    TotalPrice = t.TotalPrice,
                    isCancel = t.isCancel,
                    Note = t.Note,
                    BookDate = t.BookDate
                })
                .ToListAsync();
        }

        public async Task<Ticket> CancelTicket(int Id, int Day)
        {
            var oldTicket = await db.Tickets.SingleOrDefaultAsync(x => x.Id == Id);
            if (oldTicket != null)
            {
                if (Day > 1)
                {
                    oldTicket.TotalPrice = 0;
                }
                else if (Day == 1)
                {
                    oldTicket.TotalPrice *= 0.7;
                }
                else if (Day == 0)
                {
                    oldTicket.TotalPrice *= 0.85;
                }
                else
                {
                    return null;
                }
                oldTicket.isCancel = true;
                await db.SaveChangesAsync();
                return oldTicket;
            }
            else { return null; }
        }
    }
}
