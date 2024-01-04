using backend.Models;

namespace backend.IRepository
{
    public interface ITripRepo
    {
        Task<IEnumerable<Trip>> GetAllTrip();
        Task<IEnumerable<Trip>> GetTripById(int Id);
        //  Task<IEnumerable<Trip>> CreateBusService(int Id);
        //  Task<IEnumerable<Trip>> putBusService(int Id);
        //  Task<IEnumerable<Trip>> deleteBusService(int Id);
    }
}
