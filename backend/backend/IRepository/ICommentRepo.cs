using backend.Models;

namespace backend.IRepository
{
    public interface ICommentRepo
    {
        Task<bool> CreateComment(Comment Comment);
        Task<bool> PutComment(int Id, Comment Comment);
        Task<Comment> DeleteComment(int Id);

    }
}
