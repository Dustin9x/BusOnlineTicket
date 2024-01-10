using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationController : ControllerBase
    {
        private readonly IStationRepo repo;

        public StationController(IStationRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var list = await repo.GetAllStation();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Station>>(StatusCodes.Status200OK, "Get list of station successfully", list, null);
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
        public async Task<ActionResult> GetAllById(int Id)
        {
            try
            {
                var list = await repo.GetStationById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<Station>>(StatusCodes.Status200OK, "Get station successfully", list, null);
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
        public async Task<ActionResult> CreateStation([FromForm] Station Station)
        {
            try
            {
                bool list = await repo.CreateStation(Station);
                if (list == true)
                {
                    var response = new ResponseData<Station>(StatusCodes.Status200OK, "Create new station successfully", Station, null);
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
        public async Task<ActionResult> PutStation(Station Station)
        {
            try
            {
                bool list = await repo.PutStation(Station);
                if (list == true)
                {
                    var response = new ResponseData<Station>(StatusCodes.Status200OK, "Update station successfully", Station, null);
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
        public async Task<ActionResult> DeleteStation(int Id)
        {
            try
            {
                var list = await repo.DeleteStation(Id);
                if (list != null)
                {
                    var response = new ResponseData<Station>(StatusCodes.Status200OK, "Delete station successfully", list, null);
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
