using backend.Models;

namespace backend.IRepository
{
    public interface IFAQrepo
    {
        Task<IEnumerable<FAQ>> GetAllFAQ();
        Task<bool> CreateFAQ(FAQ FAQ);
        Task<bool> PutFAQ(int Id, FAQ FAQ);
        Task<FAQ> DeleteFAQ(int Id);
        Task<IEnumerable<FAQ>> GetFAQById(int Id);
    }
}
