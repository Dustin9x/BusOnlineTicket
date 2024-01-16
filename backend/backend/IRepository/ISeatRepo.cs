using backend.Models;

namespace backend.IRepository
{
    public interface ISeatRepo
    {
        Task<IEnumerable<Seat>> GetSeat(int Id);
        Task<bool> AddSeat(BusType busType);
        Task<Seat> DeleteSeat(int Id);
    }
}
