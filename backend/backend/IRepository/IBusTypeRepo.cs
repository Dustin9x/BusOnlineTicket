using backend.Models;

namespace backend.IRepository
{
    public interface IBusTypeRepo
    {
        Task<IEnumerable<BusType>> GetAllBusType();
        Task<bool> CreateBusType(BusType busType);
        Task<bool> PutBusType(BusType busType);
        Task<BusType> DeleteBusType(int Id);
        Task<IEnumerable<BusType>> GetBusTypeById(int Id);
    }
}
