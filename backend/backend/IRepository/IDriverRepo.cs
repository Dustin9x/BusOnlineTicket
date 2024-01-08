using backend.Models;

namespace backend.IRepository
{
    public interface IDriverRepo
    {
        Task<IEnumerable<Driver>> GetAllDriver();
        Task<bool> CreateDriver(Driver driver);
        Task<bool> PutDriver(Driver driver);
        Task<Driver> DeleteDriver(int Id);
        Task<IEnumerable<Driver>> GetDriversById(int Id);
    }
}
