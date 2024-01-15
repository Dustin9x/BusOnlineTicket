using backend.Models;

namespace backend.IRepository
{
    public interface IUserRepo
    {
        Task<IEnumerable<User>> GetAll();
        Task<IEnumerable<User>> GetAllUser();
        Task<IEnumerable<User>> GetAllMod();
        Task<IEnumerable<User>> GetUserById(int Id);
        Task<bool> CreateUser(User User);
        Task<bool> PutUser(int Id, User User);
        Task<User> DeleteUser(int Id);
    }
}
