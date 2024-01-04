using backend.Models;

namespace backend.IRepository
{
    public interface IUserRepo
    {
        Task<User> CheckLogin(UserLogin userLogin);
    }
}
