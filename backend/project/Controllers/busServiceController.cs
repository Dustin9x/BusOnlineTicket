using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.IRepository;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class busServiceController : ControllerBase
    {
        private readonly IBusServiceRepo repo;

        public busServiceController(IBusServiceRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            var list = await repo.getAllBusService();
            return Ok(list);
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult> getAllById(int Id)
        {
            var list = await repo.getBusServiceById(Id);
            return Ok(list);
        }

    }
}
