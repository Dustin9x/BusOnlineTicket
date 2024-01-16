using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ISeatRepo repo;

        public SeatController(ISeatRepo repo)
        {
            this.repo = repo;
        }

        [HttpPost]
        public async Task<ActionResult> AddSeat([FromForm] Ticket ticket)
        {
            try
            {
                var list = await repo.AddSeat(ticket);
                if (list == true)
                {
                    var response = new ResponseData<Ticket>(StatusCodes.Status200OK, "Create new bus successfully", ticket, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
