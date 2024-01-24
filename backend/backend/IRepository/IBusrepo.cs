using backend.Models;

namespace backend.IRepository
{
    public interface IBusRepo
    {
        Task<IEnumerable<Bus>> GetAllBus();
        Task<IEnumerable<Bus>> GetEnableBus();
        Task<IEnumerable<Bus>> GetBusById(int Id);
        Task<bool> CreateBus(Bus Bus);
        Task<bool> PutBus(int Id, Bus Bus);
        Task<Bus> EnableDisableBus(int Id);
        Task<Bus> DeleteBus(int Id);
    }
}
