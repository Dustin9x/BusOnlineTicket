using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripRepo repo;

        public TripController(ITripRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var list = await repo.GetAllTrip();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Trip>>(StatusCodes.Status200OK, "Get list of trip successfully", list, null);
                    return Ok(list);
                }
                return BadRequest();
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
                var list = await repo.GetTripById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Trip>>(StatusCodes.Status200OK, "Get trip successfully", list, null);
                    return Ok(list);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public async Task<ActionResult> CreateTrip(Trip Trip)
        {
            try
            {
                bool list = await repo.CreateTrip(Trip);
                if (list)
                {
                    var response = new ResponseData<Trip>(StatusCodes.Status200OK, "Create trip successfully", Trip, null);
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
        public async Task<ActionResult> DeleteTrip(int Id)
        {
            try
            {
                var list = await repo.DeleteTrip(Id);
                if (list != null)
                {
                    var response = new ResponseData<Trip>(StatusCodes.Status200OK, "Delete trip successfully", list, null);
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
        public async Task<ActionResult> PutTrip(Trip Trip)
        {
            try
            {
                bool list = await repo.PutTrip(Trip);
                if (list)
                {
                    var response = new ResponseData<Trip>(StatusCodes.Status200OK, "Edit trip successfully", Trip, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("Options")]
        public IActionResult OptionsAsDesired(string? sortByPrice, string? sortByTime, int page = 1)
        {
            try
            {
                var result = repo.OptionsAsDesired(sortByPrice, sortByTime, page);
                return Ok(result);
            }
            catch
            {
                return BadRequest("We canot Find Trip");
            }
        }
    }
}
