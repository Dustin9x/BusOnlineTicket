using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CommentService : ICommentRepo
    {

        private readonly DatabaseContext db;

        public CommentService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreateComment(Comment Comment)
        {
           db.Comments.Add(Comment);
            await db.SaveChangesAsync();
            return true;
        }

        public async Task<Comment> DeleteComment(int Id)
        {
           var ExistingComment = await db.Comments.SingleOrDefaultAsync(c => c.Id == Id);
            if (ExistingComment!=null)
            {
                db.Comments.Remove(ExistingComment);
                await db.SaveChangesAsync();
                return ExistingComment;
            }
            return null;
        }
        public async Task<bool> PutComment(int Id, Comment Comment)
        {
            var ExistingComment = await db.Comments.FindAsync(Id);
            if (ExistingComment!=null)
            {
                ExistingComment.Content = Comment.Content;
                await db.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
