using backend.Models;

namespace backend.IRepository
{
    public interface ISeatRepo
    {
        Task<IEnumerable<Seat>> GetSeat(int Id);
        Task<bool> AddSeat(Ticket ticket);
        Task<Seat> DeleteSeat(int Id);
    }
}
