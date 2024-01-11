using backend.Models;

namespace backend.IRepository
{
    public interface IUserRepo
    {
        Task<IEnumerable<User>> GetAllUser();
        Task<IEnumerable<User>> GetUserById(int Id);
        Task<bool> CreateUser(User User);
        Task<bool> PutUser( User User);
        Task<User> DeleteUser(int Id);
    }
}
