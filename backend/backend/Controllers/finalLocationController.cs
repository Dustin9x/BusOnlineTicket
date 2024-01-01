using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.IRepository;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class finalLocationController : ControllerBase
    {
        private readonly IFinalLocationRepo repo;

        public finalLocationController(IFinalLocationRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var list = await repo.getAllFinalLocation();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
