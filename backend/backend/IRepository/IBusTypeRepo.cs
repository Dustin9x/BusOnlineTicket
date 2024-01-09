using backend.Models;

namespace backend.IRepository
{
    public interface IBusTypeRepo
    {
        Task<IEnumerable<BusType>> GetAllBusType();
        Task<bool> CreateBusType(BusType busType);
        Task<bool> PutBusType(int Id, BusType busType);
        Task<BusType> DeleteBusType(int Id);
        Task<IEnumerable<BusType>> GetBusTypeById(int Id);
        List<BusType> OptionsAsDesired(string? search, int page = 1);
    }
}
