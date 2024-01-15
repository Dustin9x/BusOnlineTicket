using backend.IRepository;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices.JavaScript;

namespace backend.Services
{
    public class FAQService : IFAQrepo
    {
        private readonly DatabaseContext db;

        public FAQService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreateFAQ(FAQ FAQ)
        {
            db.FAQs.Add(FAQ);
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

        public async Task<FAQ> DeleteFAQ(int Id)
        {
            var delFAQ = await db.FAQs.SingleOrDefaultAsync(x => x.Id == Id);
            if (delFAQ != null)
            {
                db.FAQs.Remove(delFAQ);
                int result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                else
                {
                    return delFAQ;
                }
            }
            return null;
        }

        public async Task<IEnumerable<FAQ>> GetAllFAQ()
        {
            return await db.FAQs.ToListAsync();
        }

        public async Task<IEnumerable<FAQ>> GetFAQById(int Id)
        {
            return await db.FAQs.Where(b => b.Id == Id).ToListAsync();
        }

        public async Task<bool> PutFAQ(int Id, FAQ FAQ)
        {
            var oldFAQ = await db.FAQs.FindAsync(Id);
            if (oldFAQ != null)
            {
                oldFAQ.Question = FAQ.Question;
                oldFAQ.Answer = FAQ.Answer;
                await db.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
