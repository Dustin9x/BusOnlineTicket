using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class DriverService : IDriverRepo
    {
        private readonly DatabaseContext db;

        public DriverService(DatabaseContext db)
        {
            this.db = db;
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


        public async Task<bool> PutDriver(Driver driver)
        {
            var ExistingDriver = await db.Drivers.FindAsync(driver.Id);
            if (ExistingDriver == null)
            {
                return false;
            }
            else
            {
                ExistingDriver.Avatar = driver.Avatar;
                ExistingDriver.FullName = driver.FullName;
                ExistingDriver.YearOfBirth = driver.YearOfBirth;
                ExistingDriver.PlaceOfBirth = driver.PlaceOfBirth;
                ExistingDriver.Phone = driver.Phone;
                ExistingDriver.DriverLicense = driver.DriverLicense;
                ExistingDriver.Email = driver.Email;
                ExistingDriver.NationalId = driver.NationalId;
                ExistingDriver.Note = driver.Note;
                ExistingDriver.UploadImage = driver.UploadImage;
                ExistingDriver.Enabled = driver.Enabled;
                await db.SaveChangesAsync();
                return true;
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
    }
}
