using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.IRepository;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class firstLocationController : ControllerBase
    {
        private readonly IFirstLocationRepo repo;

        public firstLocationController(IFirstLocationRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var list = await repo.getAllFirstLocation();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
