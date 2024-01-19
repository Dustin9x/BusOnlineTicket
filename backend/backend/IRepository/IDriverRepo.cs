using backend.Models;

namespace backend.IRepository
{
    public interface IDriverRepo
    {
        Task<IEnumerable<Driver>> GetApproveDrivers();
        Task<IEnumerable<Driver>> GetRegisterDrivers();
        Task<bool> CreateDriver(Driver driver);
        Task<bool> PutDriver(int Id, Driver driver);
        Task<Driver> ApproveDriver(int Id);
        Task<Driver> DeleteDriver(int Id);
        Task<IEnumerable<Driver>> GetDriverById(int Id);
        Task<Driver> Login(UserLogin UserLogin);
    }
}
