using backend.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly IBusTypeRepo repo;

        public SeatController(IBusTypeRepo repo)
        {
            this.repo = repo;
        }
    }
}
