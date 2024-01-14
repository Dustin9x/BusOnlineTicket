﻿using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<Driver>> GetAllDrivers()
        {
            return await db.Drivers.ToListAsync();
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
                    if (driver.UploadImage.Length > 0)
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
                ExistingDriver.NationalId = driver.NationalId;
                ExistingDriver.Note = driver.Note;
                ExistingDriver.Enabled = driver.Enabled;
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
