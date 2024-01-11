using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace backend.Services
{
    public class DriverService : IDriverRepo
    {
        private readonly DatabaseContext db;
        private readonly IWebHostEnvironment env;

        public DriverService(DatabaseContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

        public async Task<IEnumerable<Driver>> GetAllDriver()
        {
            return await db.Drivers.ToListAsync();
        }


        public async Task<IEnumerable<Driver>> GetDriversById(int Id)
        {
            return await db.Drivers.Where(Dr => Dr.Id == Id).ToListAsync();
        }


        public async Task<bool> CreateDriver(Driver driver)
        {
            if (driver.UploadImage.Length > 0)
            {
                var upload = Path.Combine(env.ContentRootPath, "Images/Driver");
                var filePath = Path.Combine(upload, Path.GetRandomFileName() + driver.UploadImage.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await driver.UploadImage.CopyToAsync(stream);
                }

                // Tạo đường dẫn cho tệp tin ảnh
                driver.Avatar = filePath;
            }


            db.Drivers.Add(driver);
            int result = await db.SaveChangesAsync();
            if (result == 0)
            {
                return false;

            }
            else
            {
                return true;
            }
        }


        public async Task<bool> PutDriver(Driver Driver)
        {
            var ExistingDriver = await db.Drivers.FindAsync(Driver.Id);
            if (ExistingDriver == null)
            {
                return false;
            }
            else
            {

                if (Driver.UploadImage.Length > 0)
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/Driver");
                    var filePath = Path.Combine(upload, Path.GetRandomFileName() + Driver.UploadImage.FileName);

                    if (!string.IsNullOrEmpty(ExistingDriver.Avatar))
                    {
                        if (filePath == ExistingDriver.Avatar)
                        {
                            // k thay doi avata
                        }
                        else
                        {
                            if (System.IO.File.Exists(ExistingDriver.Avatar))
                            {
                                System.IO.File.Delete(ExistingDriver.Avatar); // Xóa tệp tin ảnh
                            }

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await Driver.UploadImage.CopyToAsync(stream);
                            }

                            // Tạo đường dẫn cho tệp tin ảnh
                            ExistingDriver.Avatar = filePath;

                        }
                    }
                    else
                    {
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await Driver.UploadImage.CopyToAsync(stream);
                        }

                        // Tạo đường dẫn cho tệp tin ảnh
                        ExistingDriver.Avatar = filePath;
                    }
                }


                ExistingDriver.FullName = Driver.FullName;
                ExistingDriver.YearOfBirth = Driver.YearOfBirth;
                ExistingDriver.PlaceOfBirth = Driver.PlaceOfBirth;
                ExistingDriver.Phone = Driver.Phone;
                ExistingDriver.DriverLicense = Driver.DriverLicense;
                ExistingDriver.Email = Driver.Email;
                ExistingDriver.NationalId = Driver.NationalId;
                ExistingDriver.Note = Driver.Note;
                ExistingDriver.UploadImage = Driver.UploadImage;
                ExistingDriver.Enabled = Driver.Enabled;
                await db.SaveChangesAsync();
                return true;
            }
        }



        public async Task<Driver> DeleteDriver(int Id)
        {
            var ExistingDriver = await db.Drivers.SingleOrDefaultAsync(x => x.Id == Id);
            if (ExistingDriver != null)
            {

                if (!string.IsNullOrEmpty(ExistingDriver.Avatar))
                {
                    if (System.IO.File.Exists(ExistingDriver.Avatar))
                    {
                        System.IO.File.Delete(ExistingDriver.Avatar); // Xóa tệp tin ảnh
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
    }
}
