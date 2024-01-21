﻿using backend.IRepository;
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
            return await db.PromoteTrips.ToListAsync();
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

        public Task<PromoteTrip> DeletePromoteTrip(int Id)
        {
            throw new NotImplementedException();
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
