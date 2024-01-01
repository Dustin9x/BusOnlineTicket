using backend.Models;

namespace backend.IRepository
{
    public interface ITransportCompanyRepo
    {
          Task<IEnumerable<transportCompany>> getAlltransportCompany();
        //  Task<IEnumerable<busService>> getBusServiceById(int Id);
        //  Task<IEnumerable<busService>> CreateBusService(int Id);
        //  Task<IEnumerable<busService>> putBusService(int Id);
        //  Task<IEnumerable<busService>> deleteBusService(int Id);
    }
}
