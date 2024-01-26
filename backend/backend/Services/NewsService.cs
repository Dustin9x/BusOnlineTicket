using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class NewsService : INewRepo
    {
        private readonly DatabaseContext db;
        private readonly IWebHostEnvironment env;
        public NewsService(DatabaseContext db, IWebHostEnvironment env)
        {
            this.db = db;
            this.env = env;
        }
        public static int PAGE_SIZE { get; set; } = 5;
        public async Task<bool> CreateNews(News News)
        {
                if (News.UploadImage != null)
                {
                    string pathToNewFolder = System.IO.Path.Combine("Images", "News");
                    DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                    var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                    var filePath = Path.Combine(Path.GetRandomFileName() + News.UploadImage.FileName);

                    using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                    {
                        await News.UploadImage.CopyToAsync(stream);
                    }

                    News.Image = filePath;
                }
                db.News.Add(News);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return true;
                }
            return false;
        }

        public async Task<News> DeleteNews(int Id)
        {
            var ExistingNews = await db.News.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingNews != null)
            {

                if (!string.IsNullOrEmpty(ExistingNews.Image))
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/News");
                    if (System.IO.File.Exists(Path.Combine(upload, ExistingNews.Image)))
                    {
                        System.IO.File.Delete(Path.Combine(upload, ExistingNews.Image)); // Xóa tệp tin ảnh
                    }
                }

                db.News.Remove(ExistingNews);
                int result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    return ExistingNews;
                }
            }
            return null;
        }

        public async Task<IEnumerable<News>> GetAllNews()
        {
            return await db.News.ToListAsync();
        }

        public async Task<IEnumerable<News>> GetNewsById(int Id)
        {
            return await db.News.Where(b => b.Id == Id).Include(c => c.Comments).ThenInclude(u => u.User).ToListAsync();
        }

        public async Task<bool> PutNews(int Id, News News)
        {
            var ExistingNews = await db.News.SingleOrDefaultAsync(b => b.Id == Id);
            if (ExistingNews != null)
            {

                if (News.UploadImage != null)
                {
                    string pathToNewFolder = System.IO.Path.Combine("Images", "News");
                    DirectoryInfo directory = Directory.CreateDirectory(pathToNewFolder);
                    var upload = Path.Combine(env.ContentRootPath, pathToNewFolder);
                    var filePath = Path.Combine(Path.GetRandomFileName() + News.UploadImage.FileName);

                    using (var stream = new FileStream(Path.Combine(upload, filePath), FileMode.Create))
                    {
                        await News.UploadImage.CopyToAsync(stream);
                    }

                    if (!string.IsNullOrEmpty(ExistingNews.Image))
                    {


                        if (System.IO.File.Exists(Path.Combine(upload, ExistingNews.Image)))
                        {
                            System.IO.File.Delete(Path.Combine(upload, ExistingNews.Image));
                        }

                    }
                    ExistingNews.Image = filePath;

                }

                ExistingNews.Content = News.Content;
                ExistingNews.Title = News.Title;
                ExistingNews.DayCreateNew = News.DayCreateNew;
                int Result = await db.SaveChangesAsync();

                if (Result > 0)
                {
                    return true;
                }

            }
            return false;
        }

        public List<News> Pagination( int page = 1)
        {
            var allNewsType = db.News.AsQueryable();



            allNewsType = allNewsType.Skip((page - 1) * PAGE_SIZE).Take(PAGE_SIZE);
            var result = allNewsType.Select(tr => new News
            {
               Id = tr.Id,
               Content = tr.Content,
               Title = tr.Title,    
               DayCreateNew = tr.DayCreateNew,
               Image = tr.Image,
            });
            return result.ToList();
        }

        
    }
}
