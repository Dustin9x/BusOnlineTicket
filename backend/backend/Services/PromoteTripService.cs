using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class PromoteTripService : IPromoteTripRepo
    {
        private readonly DatabaseContext db;
        private readonly IWebHostEnvironment env;

        public PromoteTripService(DatabaseContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

        public async Task<IEnumerable<PromoteTrip>> GetAllPromoteTrip()
        {
            var data = await db.PromoteTrips.ToListAsync();
            foreach (var trip in data)
            {
                double min = double.MaxValue;
                var list = await db.Trips.Where(t => t.FromStation.Name == trip.FromStation && t.ToStation.Name == trip.ToStation).ToListAsync();
                if (list.Count > 0)
                {
                    foreach (var t in list)
                    {
                        min = Math.Min(min, t.TicketPrice);
                    }
                }
                trip.MinPrice = min;
                await db.SaveChangesAsync();
            }
            return data;
        }

        public async Task<IEnumerable<PromoteTrip>> GetPromoteTripById(int Id)
        {
            return await db.PromoteTrips.Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<bool> CreatePromoteTrip(PromoteTrip PromoteTrip)
        {
            double min = Double.MaxValue;
            var list = await db.Trips.Where(t => t.FromStation.Name == PromoteTrip.FromStation && t.ToStation.Name == PromoteTrip.ToStation).ToListAsync();
            if (list != null)
            {
                foreach (var t in list)
                {
                    min = Math.Min(min, t.TicketPrice);
                }
            }
            if (PromoteTrip.UploadImage.Length > 0)
            {
                string pathToNewFolder = System.IO.Path.Combine("Images", "PromoteTrip");
                DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                var filePath = Path.Combine(Path.GetRandomFileName() + PromoteTrip.UploadImage.FileName);

                using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                {
                    await PromoteTrip.UploadImage.CopyToAsync(stream);
                }

                PromoteTrip.Image = filePath;
            }
            PromoteTrip.MinPrice = min;
            db.PromoteTrips.Add(PromoteTrip);
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

        public async Task<PromoteTrip> DeletePromoteTrip(int Id)
        {
            var delPromoteTrip = await db.PromoteTrips.SingleOrDefaultAsync(x => x.Id == Id);
            if (delPromoteTrip != null)
            {
                if (!string.IsNullOrEmpty(delPromoteTrip.Image))
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/PromoteTrip");
                    if (System.IO.File.Exists(Path.Combine(upload, delPromoteTrip.Image)))
                    {
                        System.IO.File.Delete(Path.Combine(upload, delPromoteTrip.Image)); // Xóa tệp tin ảnh
                    }
                }

                db.PromoteTrips.Remove(delPromoteTrip);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return delPromoteTrip;
                }
            }
            return null;
        }

        public async Task<bool> PutPromoteTrip(int Id, PromoteTrip PromoteTrip)
        {
            double min = Double.MaxValue;
            var oldPromoteTrip = await db.PromoteTrips.FindAsync(Id);
            if (oldPromoteTrip != null)
            {
                var list = await db.Trips.Where(t => t.FromStation.Name == PromoteTrip.FromStation && t.ToStation.Name == PromoteTrip.ToStation).ToListAsync();
                if (list != null)
                {
                    foreach (var t in list)
                    {
                        min = Math.Min(min, t.TicketPrice);
                    }
                }
                if (PromoteTrip.UploadImage != null)
                {
                    string pathToNewFolder = System.IO.Path.Combine("Images", "PromoteTrip");
                    DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                    var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                    var filePath = Path.Combine(Path.GetRandomFileName() + PromoteTrip.UploadImage.FileName);

                    using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                    {
                        await PromoteTrip.UploadImage.CopyToAsync(stream);
                    }

                    if (!string.IsNullOrEmpty(oldPromoteTrip.Image))
                    {


                        if (System.IO.File.Exists(Path.Combine(upload, oldPromoteTrip.Image)))
                        {
                            System.IO.File.Delete(Path.Combine(upload, oldPromoteTrip.Image));
                        }
                    }
                    oldPromoteTrip.Image = filePath;
                }
                oldPromoteTrip.FromStation = PromoteTrip.FromStation;
                oldPromoteTrip.ToStation = PromoteTrip.ToStation;
                oldPromoteTrip.MinPrice = min;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
