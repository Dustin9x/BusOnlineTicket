using backend.Models;

namespace backend.IRepository
{
    public interface IPromoteTripRepo
    {
        Task<IEnumerable<PromoteTrip>> GetAllPromoteTrip();
        Task<IEnumerable<PromoteTrip>> GetPromoteTripById(int Id);
        Task<bool> CreatePromoteTrip(PromoteTrip PromoteTrip);
        Task<bool> PutPromoteTrip(int Id, PromoteTrip PromoteTrip);
        Task<PromoteTrip> DeletePromoteTrip(int Id);
    }
}
