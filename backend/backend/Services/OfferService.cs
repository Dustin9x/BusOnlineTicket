using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class OfferService : IOfferRepo
    {
        private readonly DatabaseContext db;
        private readonly IWebHostEnvironment env;
        public OfferService(DatabaseContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }

        public async Task<IEnumerable<Offer>> GetAllOffer()
        {
            return await db.Offers.ToListAsync();
        }

        public async Task<IEnumerable<Offer>> GetOfferById(int Id)
        {
            return await db.Offers.Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<IEnumerable<Offer>> GetOfferByCode(string Code)
        {
            return await db.Offers.Where(b => b.OfferCode.ToLower() == Code.ToLower()).ToListAsync();
        }

        public async Task<bool> CreateOffer(Offer Offer)
        {
            try
            {
                var oldOffer = await db.Offers.SingleOrDefaultAsync(b => b.OfferCode == Offer.OfferCode);
                if (oldOffer == null)
                {
                    if (Offer.UploadImage != null)
                    {
                        string pathToNewFolder = System.IO.Path.Combine("Images", "Offer");
                        DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                        var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                        var filePath = Path.Combine(Path.GetRandomFileName() + Offer.UploadImage.FileName);

                        using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                        {
                            await Offer.UploadImage.CopyToAsync(stream);
                        }

                        Offer.Image = filePath;
                    }
                    db.Offers.Add(Offer);
                    int result = await db.SaveChangesAsync();
                    if (result != 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> PutOffer(int Id, Offer Offer)
        {
            try
            {
                var oldOffer = await db.Offers.SingleOrDefaultAsync(b => b.Id == Id);
                if (oldOffer != null)
                {

                    if (Offer.UploadImage != null)
                    {
                        string pathToNewFolder = System.IO.Path.Combine("Images", "Offer");
                        DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                        var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                        var filePath = Path.Combine(Path.GetRandomFileName() + Offer.UploadImage.FileName);

                        using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                        {
                            await Offer.UploadImage.CopyToAsync(stream);
                        }

                        if (!string.IsNullOrEmpty(oldOffer.Image))
                        {
                            if (System.IO.File.Exists(Path.Combine(upload, oldOffer.Image)))
                            {
                                System.IO.File.Delete(Path.Combine(upload, oldOffer.Image));
                            }
                        }
                        oldOffer.Image = filePath;

                    }

                    oldOffer.Title = Offer.Title;
                    oldOffer.OfferCode = Offer.OfferCode;
                    oldOffer.Discount = Offer.Discount;
                    oldOffer.FromStation = Offer.FromStation;
                    oldOffer.ToStation = Offer.ToStation;
                    oldOffer.BeginDate = Offer.BeginDate;
                    oldOffer.EndDate = Offer.EndDate;
                    int Result = await db.SaveChangesAsync();

                    if (Result > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<Offer> DeleteOffer(int Id)
        {
            var delOffer = await db.Offers.SingleOrDefaultAsync(b => b.Id == Id);
            if (delOffer != null)
            {

                if (!string.IsNullOrEmpty(delOffer.Image))
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/Offer");
                    if (System.IO.File.Exists(Path.Combine(upload, delOffer.Image)))
                    {
                        System.IO.File.Delete(Path.Combine(upload, delOffer.Image)); // Xóa tệp tin ảnh
                    }
                }

                db.Offers.Remove(delOffer);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return delOffer;
                }
            }
            return null;
        }
    }
}
