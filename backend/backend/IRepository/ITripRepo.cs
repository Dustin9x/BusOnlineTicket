using backend.Models;

namespace backend.IRepository
{
    public interface ITripRepo
    {
        Task<IEnumerable<Trip>> GetAllTrip();
        Task<IEnumerable<Trip>> GetTripById(int Id);
        Task<bool> CreateTrip(Trip Trip);
        Task<bool> PutTrip(Trip Trip);
        Task<Trip> DeleteTrip(int Id);
        List<Trip> OptionsAsDesired(string? sortByPrice, string? sortByTime, int page = 1);
    }
}
