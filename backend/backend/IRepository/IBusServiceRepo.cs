using backend.Models;

namespace backend.IRepository
{
    public interface IBusServiceRepo 
    {
        Task<IEnumerable<busService>> getAllBusService();
        Task<IEnumerable<busService>> getBusServiceById(int Id);
      //  Task<IEnumerable<busService>> CreateBusService(int Id);
      //  Task<IEnumerable<busService>> putBusService(int Id);
      //  Task<IEnumerable<busService>> deleteBusService(int Id);
    }
}
