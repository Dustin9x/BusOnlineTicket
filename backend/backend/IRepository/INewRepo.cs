using backend.Models;

namespace backend.IRepository
{
    public interface INewRepo
    {
        Task<IEnumerable<News>> GetAllNews();
    
        Task<IEnumerable<News>> GetNewsById(int Id);
        Task<bool> CreateNews(News News);
        Task<bool> PutNews(int Id, News News);
        Task<News> DeleteNews(int Id);

        List<News> Pagination(int page = 1);
    }
}
