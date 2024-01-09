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
                var list = await repo.CreateTrip(Trip);
                if (list != null)
                {
                    var response = new ResponseData<Trip>(StatusCodes.Status200OK, "Get trip successfully", list, null);
                    return Ok(list);
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
