using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.IRepository;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class busController : ControllerBase
    {
        private readonly IBusrepo repo;

        public busController(IBusrepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            var list = await repo.getAllBus();
            return Ok(list);
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult> getAllById(int Id)
        {
            var list = await repo.getBusById(Id);
            return Ok(list);
        }
    }
}
