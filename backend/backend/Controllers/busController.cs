using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly IBusRepo repo;

        public BusController(IBusRepo repo)
        {
            this.repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAllBus()
        {
            try
            {
                var list = await repo.GetAllBus();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Bus>>(StatusCodes.Status200OK, "Get list of bus successfully", list, null);
                    return Ok(response);
                }
                return BadRequest(list);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("{Id}")]
        public async Task<ActionResult> GetBusById(int Id)
        {
            try
            {
                var list = await repo.GetBusById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Bus>>(StatusCodes.Status200OK, "Get bus successfully", list, null);
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
        public async Task<ActionResult> CreateBus([FromForm] Bus Bus)
        {
            try
            {
                var list = await repo.CreateBus(Bus);
                if (list == true)
                {
                    var response = new ResponseData<Bus>(StatusCodes.Status200OK, "Create new bus successfully", Bus, null);
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
        public async Task<ActionResult> PutBus(Bus Bus)
        {
            try
            {
                bool list = await repo.PutBus(Bus);
                if (list == true)
                {
                    var response = new ResponseData<Bus>(StatusCodes.Status200OK, "Update bus successfully", Bus, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteBus(int Id)
        {
            try
            {
                var list = await repo.DeleteBus(Id);
                if (list != null)
                {
                    var response = new ResponseData<Bus>(StatusCodes.Status200OK, "Delete station successfully", list, null);
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
