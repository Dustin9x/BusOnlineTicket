using backend.Models;

namespace backend.IRepository
{
    public interface IOfferRepo
    {
        Task<IEnumerable<Offer>> GetAllOffer();
    
        Task<IEnumerable<Offer>> GetOfferById(int Id);
        Task<bool> CreateOffer(Offer Offer);
        Task<bool> PutOffer(int Id, Offer Offer);
        Task<Offer> DeleteOffer(int Id);
    }
}
