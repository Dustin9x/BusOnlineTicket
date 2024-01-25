using backend.Models;

namespace backend.IRepository
{
    public interface ITripRepo
    {
        Task<IEnumerable<Trip>> GetAllTrip();
        Task<IEnumerable<Trip>> GetTripById(int Id);
        Task<bool> CreateTrip(Trip Trip);
        Task<bool> PutTrip(int Id, Trip Trip);
        Task<Trip> DeleteTrip(int Id);
        Task<IEnumerable<Profit>> GetProfitByTrip(int year);
        List<Trip> OptionsAsDesired(string? searchBusType, string? fromPrice, string? toPrice, string? sort, string? from, string? to, string? dayStart, int page = 1);
    }
}
