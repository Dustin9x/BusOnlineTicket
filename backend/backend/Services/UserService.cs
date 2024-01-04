using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UserService : IUserRepo
    {
        private readonly DatabaseContext db;

        public UserService(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<User> CheckLogin(UserLogin userLogin)
        {
            var user = await db.Users.SingleOrDefaultAsync(u => u.Email == userLogin.Email && u.Password == userLogin.Password);
            return user;
        }
    }
}
