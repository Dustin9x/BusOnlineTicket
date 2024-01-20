using backend.IRepository;
using backend.Models;
using MailKit.Net.Smtp;
using backend.Settings;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Text;
using Microsoft.Extensions.Options;

namespace backend.Services
{
    public class DriverService : IDriverRepo
    {
        private readonly DatabaseContext db;
        private readonly IWebHostEnvironment env;
        private readonly MailSetting _mailsettings;

        public DriverService(DatabaseContext db, IWebHostEnvironment env, IOptions<MailSetting> mailsettings)
        {
            this.db = db;
            this.env = env;
            _mailsettings = mailsettings.Value;
        }

        public async Task<IEnumerable<Driver>> GetApproveDrivers()
        {
            return await db.Drivers.Include(d=>d.Trips).Where(d => d.isApprove == true).ToListAsync();
        }

        public async Task<IEnumerable<Driver>> GetRegisterDrivers()
        {
            return await db.Drivers.Include(d => d.Trips).Where(d => d.isApprove == false).ToListAsync();
        }

        public async Task<IEnumerable<Driver>> GetDriverById(int Id)
        {
            return await db.Drivers.Where(Dr => Dr.Id == Id).ToListAsync();
        }


        public async Task<bool> CreateDriver(Driver driver)
        {
            try
            {
                var ExistingUser = await db.Drivers.SingleOrDefaultAsync(b => b.Email == driver.Email);
                if (ExistingUser == null)
                {
                    if (driver.UploadImage != null)
                    {
                        string pathToNewFolder = System.IO.Path.Combine("Images", "Driver");
                        DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                        var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                        var filePath = Path.Combine(Path.GetRandomFileName() + driver.UploadImage.FileName);

                        using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                        {
                            await driver.UploadImage.CopyToAsync(stream);
                        }

                        // Tạo đường dẫn cho tệp tin ảnh
                        driver.Avatar = filePath;
                    }
                    driver.Password = BCrypt.Net.BCrypt.HashPassword(driver.Password);

                    await db.Drivers.AddAsync(driver);
                    int result = await db.SaveChangesAsync();
                    if (result > 0)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<Driver> DeleteDriver(int Id)
        {
            var ExistingDriver = await db.Drivers.SingleOrDefaultAsync(x => x.Id == Id);
            if (ExistingDriver != null)
            {
                if (!string.IsNullOrEmpty(ExistingDriver.Avatar))
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/Driver");
                    if (System.IO.File.Exists(Path.Combine(upload, ExistingDriver.Avatar)))
                    {
                        System.IO.File.Delete(Path.Combine(upload, ExistingDriver.Avatar)); // Xóa tệp tin ảnh
                    }
                }

                db.Drivers.Remove(ExistingDriver);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return ExistingDriver;
                }
            }
            return null;
        }



        public async Task<bool> PutDriver(int Id, Driver driver)
        {
            var ExistingDriver = await db.Drivers.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingDriver != null)
            {

                if (driver.UploadImage != null)
                {
                    string pathToNewFolder = System.IO.Path.Combine("Images", "Driver");
                    DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                    var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                    var filePath = Path.Combine(Path.GetRandomFileName() + driver.UploadImage.FileName);

                    using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                    {
                        await driver.UploadImage.CopyToAsync(stream);
                    }

                    if (!string.IsNullOrEmpty(ExistingDriver.Avatar))
                    {


                        if (System.IO.File.Exists(Path.Combine(upload, ExistingDriver.Avatar)))
                        {
                            System.IO.File.Delete(Path.Combine(upload, ExistingDriver.Avatar));
                        }

                    }
                    ExistingDriver.Avatar = filePath;

                }

                ExistingDriver.FullName = driver.FullName;
                ExistingDriver.YearOfBirth = driver.YearOfBirth;
                ExistingDriver.PlaceOfBirth = driver.PlaceOfBirth;
                ExistingDriver.Phone = driver.Phone;
                ExistingDriver.DriverLicense = driver.DriverLicense;
                ExistingDriver.Email = driver.Email;
                ExistingDriver.Password = BCrypt.Net.BCrypt.HashPassword(driver.Password);
                ExistingDriver.NationalId = driver.NationalId;
                ExistingDriver.Note = driver.Note;
                ExistingDriver.Enabled = driver.Enabled;
                ExistingDriver.isApprove = driver.isApprove;
                int Result = await db.SaveChangesAsync();

                if (Result > 0)
                {
                    return true;
                }

            }
            return false;
        }

        public async Task<Driver> ApproveDriver(int Id)
        {
            var ExistingDriver = await db.Drivers.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingDriver != null)
            {
                ExistingDriver.isApprove = true;
                int Result = await db.SaveChangesAsync();

                if (Result > 0)
                {
                    return ExistingDriver;
                }
            }
            return null;
        }

        public async Task<Driver> Login(UserLogin UserLogin)
        {
            Driver loginDriver = await db.Drivers.SingleOrDefaultAsync(d => d.Email == UserLogin.Email);
            if (loginDriver != null)
            {
                var result = BCrypt.Net.BCrypt.Verify(UserLogin.Password, loginDriver.Password);
                if (result == true)
                {
                    return loginDriver;
                }
                return null;
            }
            return null;
        }


        public async Task<bool> SendEmailAsync(string Email)
        {


            var ExistingDriver = await db.Drivers.SingleOrDefaultAsync(b => b.Email == Email);


            if (ExistingDriver != null)
            {
                var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var password = new StringBuilder();
                for (int i = 0; i < 8; i++)
                {
                    var index = new Random().Next(characters.Length);
                    password.Append(characters[index]);
                }
                Mail mail = new Mail()
                {
                    ToEmail = Email,
                    Body = "<h1>Your new password: </h1>" + password.ToString(),
                    Subject = "Forget Password"
                };

                ExistingDriver.Password = BCrypt.Net.BCrypt.HashPassword(password.ToString());
                int result = await db.SaveChangesAsync();

                if (result > 0)
                {
                    var email = new MimeMessage();
                    email.Sender = MailboxAddress.Parse(_mailsettings.Mail);
                    email.To.Add(MailboxAddress.Parse(mail.ToEmail));
                    email.Subject = mail.Subject;
                    var builder = new BodyBuilder();
                    builder.HtmlBody = mail.Body;
                    email.Body = builder.ToMessageBody();
                    using var smtp = new SmtpClient();
                    smtp.Connect(_mailsettings.Host, _mailsettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                    smtp.Authenticate(_mailsettings.Mail, _mailsettings.Password);
                    await smtp.SendAsync(email);
                    smtp.Disconnect(true);
                    return true;
                }

           
            }
            return false;
        }

    }
}
