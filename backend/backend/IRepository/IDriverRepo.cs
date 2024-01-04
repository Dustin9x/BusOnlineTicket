using backend.Models;

namespace backend.IRepository
{
    public interface IDriverRepo
    {
        Task<IEnumerable<Driver>> GetAllDriver();
    }
}
