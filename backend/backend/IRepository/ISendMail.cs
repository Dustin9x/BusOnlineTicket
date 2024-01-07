using backend.Models;

namespace backend.IRepository
{
    public interface ISendMail
    {
        Task SendEmailAsync(Mail mailRequest);
    }
}
