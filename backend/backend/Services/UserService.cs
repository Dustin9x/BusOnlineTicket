

using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UserService : IUserRepo
    {
        private readonly DatabaseContext db;
        private readonly IWebHostEnvironment env;

        public UserService(DatabaseContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

        public async Task<bool> CreateUser(User User)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Email == User.Email);
            if (ExistingUser == null)
            {
                if (User.UploadImage != null)
                {
                    string pathToNewFolder = System.IO.Path.Combine("Images", "User");
                    DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                    var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                    var filePath = Path.Combine(Path.GetRandomFileName() + User.UploadImage.FileName);

                    using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                    {
                        await User.UploadImage.CopyToAsync(stream);
                    }

                    User.Avatar = filePath;
                }
                User.Password = BCrypt.Net.BCrypt.HashPassword(User.Password);



                db.Users.Add(User);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<User> DeleteUser(int Id)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingUser != null)
            {

                if (!string.IsNullOrEmpty(ExistingUser.Avatar))
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/User");
                    if (System.IO.File.Exists(Path.Combine(upload, ExistingUser.Avatar)))
                    {
                        System.IO.File.Delete(Path.Combine(upload, ExistingUser.Avatar)); // Xóa tệp tin ảnh
                    }
                }

                db.Users.Remove(ExistingUser);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return ExistingUser;
                }
            }
            return null;
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            return await db.Users.ToListAsync();
        }
        public async Task<IEnumerable<User>> GetAllUser()
        {
            return await db.Users.Where(b => b.Role == "User").ToListAsync();
        }
        public async Task<IEnumerable<User>> GetAllMod()
        {
            return await db.Users.Where(b => b.Role == "Mod").ToListAsync();
        }
        public async Task<IEnumerable<User>> GetUserById(int Id)
        {
            return await db.Users.Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<bool> PutUser(int Id, User User)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingUser != null)
            {

                if (User.UploadImage != null)
                {
                    string pathToNewFolder = System.IO.Path.Combine("Images", "User");
                    DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                    var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                    var filePath = Path.Combine(Path.GetRandomFileName() + User.UploadImage.FileName);

                    using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                    {
                        await User.UploadImage.CopyToAsync(stream);
                    }

                    if (!string.IsNullOrEmpty(ExistingUser.Avatar))
                    {


                        if (System.IO.File.Exists(Path.Combine(upload, ExistingUser.Avatar)))
                        {
                            System.IO.File.Delete(Path.Combine(upload, ExistingUser.Avatar));
                        }

                    }
                    ExistingUser.Avatar = filePath;
                }

                ExistingUser.Email = User.Email;
                ExistingUser.FullName = User.FullName;
                ExistingUser.Role = User.Role;
                //if (User.Role == "User" || User.Role == "Mod" || User.Role == "Admin")
                //{
                  
                //}
                if (User.Password != null && User.Password != "null")
                {
                    ExistingUser.Password = BCrypt.Net.BCrypt.HashPassword(User.Password);
                }

                int Result = await db.SaveChangesAsync();
                if (Result > 0)
                {
                    return true;
                }

            }
            return false;
        }
    }
}
