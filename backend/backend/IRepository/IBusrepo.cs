using backend.Models;

namespace backend.IRepository
{
    public interface IBusRepo
    {
        Task<IEnumerable<Bus>> GetAllBus();
        Task<IEnumerable<Bus>> GetBusById(int Id);
        Task<bool> CreateBus(Bus Bus);
        Task<bool> PutBus(Bus Bus);
        Task<Bus> DeleteBus(int Id);
    }
}
