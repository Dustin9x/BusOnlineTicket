using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepo repo;

        public TicketController(ITicketRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult> GetTicketByUser(int Id)
        {
            try
            {
                var list = await repo.GetTicketByUser(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Ticket>>(StatusCodes.Status200OK, "Get ticket list successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [AllowAnonymous]
        [HttpGet("search/{Id}")]
        public async Task<ActionResult> SearchTicket(int Id)
        {
            try
            {
                var list = await repo.SearchTicket(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Ticket>>(StatusCodes.Status200OK, "Get ticket successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }



        [HttpPost]
        public async Task<ActionResult> AddTicket([FromBody] Ticket ticket)
        {
            try
            {
                bool list = await repo.AddTicket(ticket);
                if (list == true)
                {
                    var response = new ResponseData<Ticket>(StatusCodes.Status200OK, "Add new ticket Successfully", ticket, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPut]
        public async Task<ActionResult> CancelTicket(int Id, int Day)
        {
            try
            {
                var list = await repo.CancelTicket(Id, Day);
                if (list != null)
                {
                    var response = new ResponseData<Ticket>(StatusCodes.Status200OK, "Update BusType Successfully ", list, null);
                    return Ok(response);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
