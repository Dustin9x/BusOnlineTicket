using backend.Models;

namespace backend.IRepository
{
    public interface IDriverRepo
    {
        Task<IEnumerable<Driver>> GetAllDrivers();
        Task<bool> CreateDriver(Driver driver);
        Task<bool> PutDriver(int Id, Driver driver);
        Task<Driver> DeleteDriver(int Id);
        Task<IEnumerable<Driver>> GetDriverById(int Id);
    }
}
