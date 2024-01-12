using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

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
                if (User.UploadImage.Length > 0)
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/User");
                    var filePath = Path.Combine(upload, Path.GetRandomFileName() + User.UploadImage.FileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await User.UploadImage.CopyToAsync(stream);
                    }

                    // Tạo đường dẫn cho tệp tin ảnh
                    User.Avatar = filePath;
                }

                db.Users.Add(User);
                int result = await db.SaveChangesAsync();
                if(result > 0)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<User> DeleteUser(int Id)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Id ==Id);
            if (ExistingUser != null)
            {

                if (!string.IsNullOrEmpty(ExistingUser.Avatar))
                {
                    if (System.IO.File.Exists(ExistingUser.Avatar))
                    {
                        System.IO.File.Delete(ExistingUser.Avatar); // Xóa tệp tin ảnh
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

        public async Task<IEnumerable<User>> GetAllUser()
        {
            return await db.Users.ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUserById(int Id)
        {
            return await db.Users.Where(b=>b.Id == Id).ToListAsync();
        }

        public async Task<bool> PutUser(User User)
        {
            var ExistingUser = await db.Users.SingleOrDefaultAsync(b => b.Id == User.Id);
            if (ExistingUser != null)
            {

                if (User.UploadImage.Length > 0)
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/User");
                    var filePath = Path.Combine(upload, Path.GetRandomFileName() +  User.UploadImage.FileName);

                    if (!string.IsNullOrEmpty(ExistingUser.Avatar))
                    {
                        if (filePath == ExistingUser.Avatar)
                        {
                            // k thay doi avata
                            User.Avatar = ExistingUser.Avatar;
                        }
                        else
                        {
                            if (System.IO.File.Exists(ExistingUser.Avatar))
                            {
                                System.IO.File.Delete(ExistingUser.Avatar); // Xóa tệp tin ảnh
                            }

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await User.UploadImage.CopyToAsync(stream);
                            }

                            // Tạo đường dẫn cho tệp tin ảnh
                            ExistingUser.Avatar = filePath;

                        }
                    }
                    else
                    {
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await User.UploadImage.CopyToAsync(stream);
                        }

                        // Tạo đường dẫn cho tệp tin ảnh
                        ExistingUser.Avatar = filePath;
                    }
                }



                ExistingUser.Email = User.Email;
                ExistingUser.Role = User.Role;
                ExistingUser.Password = BCrypt.Net.BCrypt.HashPassword(User.Password);
                int Result=await db.SaveChangesAsync();
                if (Result > 0)
                {
                    return true;
                }

            }
            return false;
        }
    }
}
