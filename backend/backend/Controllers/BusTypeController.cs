using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusTypeController : ControllerBase
    {
        private readonly IBusTypeRepo repo;

        public BusTypeController(IBusTypeRepo repo)
        {
            this.repo = repo;
        }


        [HttpGet]
        public async Task<ActionResult> GetAllBusType()
        {
            try
            {
                var list = await repo.GetAllBusType();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<BusType>>(StatusCodes.Status200OK, "Get List Of BusType Successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{Id}")]
        public async Task<ActionResult> GetBusTypeById(int Id)
        {
            try
            {
                var list = await repo.GetBusTypeById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<BusType>>(StatusCodes.Status200OK, "Get bus type successfully", list, null);
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
        public async Task<ActionResult> CreateBusType([FromForm] BusType busType)
        {
            try
            {
                bool list = await repo.CreateBusType(busType);
                if (list == true)
                {
                    var response = new ResponseData<BusType>(StatusCodes.Status200OK, "Create new BusType Successfully", busType, null);
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
        public async Task<ActionResult> DeleteBusType(int Id)
        {
            try
            {
                var list = await repo.DeleteBusType(Id);
                if (list != null)
                {
                    var response = new ResponseData<BusType>(StatusCodes.Status200OK, "Delete BusType Successfully", list, null);
                    return Ok(response);
                }
                else { return BadRequest(); }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> PutBusType(int Id, [FromForm] BusType busType)
        {
            try
            {
                bool list = await repo.PutBusType(Id, busType);
                if (list == true)
                {
                    var response = new ResponseData<BusType>(StatusCodes.Status200OK, "Update BusType Successfully ", busType, null);
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

        [HttpGet("Options")]
        public IActionResult OptionsAsDesired(string? search, int page = 1)
        {
            try
            {
                var result = repo.OptionsAsDesired(search, page);
                return Ok(result);
            }
            catch
            {
                return BadRequest("We canot Found Page");
            }
        }
    }
}
