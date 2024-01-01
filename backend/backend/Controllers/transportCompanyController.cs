using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.IRepository;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class transportCompanyController : ControllerBase
    {
        private readonly ITransportCompanyRepo repo;

        public transportCompanyController(ITransportCompanyRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var list = await repo.getAlltransportCompany();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }
    }
}
