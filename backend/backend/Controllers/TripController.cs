using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult> getAllById(int Id)
        {
            try
            {
                var list = await repo.GetTripById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Trip>>(StatusCodes.Status200OK, "Get trip successfully", list, null);
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
        public async Task<ActionResult> CreateTrip([FromForm] Trip Trip)
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
        public async Task<ActionResult> PutTrip(int Id, [FromForm] Trip Trip)
        {
            try
            {
                bool list = await repo.PutTrip(Id, Trip);
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

        [AllowAnonymous]
        [HttpGet("Options")]
        public IActionResult OptionsAsDesired(string? searchBusType, string? fromPrice, string? toPrice, string? sort, string? from, string? to, string? dayStart, int page = 1)
        {
            try
            {
                var list = repo.OptionsAsDesired(searchBusType, fromPrice, toPrice, sort, from, to, dayStart, page);
                if (list != null)
                {
                    var result = new ResponseData<IEnumerable<Trip>>(StatusCodes.Status200OK, "Search trip successfully", list, null);
                    return Ok(result);
                }
                return BadRequest();
            }
            catch
            {
                return BadRequest("We canot Find Trip");
            }
        }
    }
}
