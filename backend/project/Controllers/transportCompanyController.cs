using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.IRepository;

namespace project.Controllers
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
            var list = await repo.getAlltransportCompany();
            return Ok(list);
        }
    }
}
