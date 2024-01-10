using backend.Models;

namespace backend.IRepository
{
    public interface IStationRepo
    {
        Task<IEnumerable<Station>> GetAllStation();
        Task<IEnumerable<Station>> GetStationById(int Id);
        Task<bool> CreateStation(Station Station);
        Task<bool> PutStation(int Id, Station Station);
        Task<Station> DeleteStation(int Id);
    }
}
