using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.IRepository;

namespace backend.Controllers
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
            try
            {
                var list = await repo.getAllBusService();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult> getAllById(int Id)
        {
            try
            {
                var list = await repo.getBusServiceById(Id);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

    }
}
