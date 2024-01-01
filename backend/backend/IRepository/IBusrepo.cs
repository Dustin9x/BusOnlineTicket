using backend.Models;

namespace backend.IRepository
{
    public interface IBusrepo
    {
          Task<IEnumerable<bus>> getAllBus();
          Task<IEnumerable<bus>> getBusById(int Id);
        //  Task<IEnumerable<busService>> CreateBusService(int Id);
        //  Task<IEnumerable<busService>> putBusService(int Id);
        //  Task<IEnumerable<busService>> deleteBusService(int Id);
    }
}
