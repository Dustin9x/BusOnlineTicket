using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.IRepository;

namespace backend.Controllers
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
            try
            {
                var list = await repo.getAllBus();
                return Ok(list);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult> getAllById(int Id)
        {
            try
            {
                var list = await repo.getBusById(Id);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
