using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromoteTripController : ControllerBase
    {
        private readonly IPromoteTripRepo repo;

        public PromoteTripController(IPromoteTripRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPromoteTrip()
        {
            try
            {
                var list = await repo.GetAllPromoteTrip();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<PromoteTrip>>(StatusCodes.Status200OK, "Get List Of Promote Trip Successfully", list, null);
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
        public async Task<ActionResult> GetPromoteTripById(int Id)
        {
            try
            {
                var list = await repo.GetPromoteTripById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<PromoteTrip>>(StatusCodes.Status200OK, "Get Promote Trip successfully", list, null);
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
        public async Task<ActionResult> CreatePromoteTrip([FromForm] PromoteTrip PromoteTrip)
        {
            try
            {
                bool list = await repo.CreatePromoteTrip(PromoteTrip);
                if (list == true)
                {
                    var response = new ResponseData<PromoteTrip>(StatusCodes.Status200OK, "Create new Promote Trip Successfully", PromoteTrip, null);
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
        public async Task<ActionResult> DeletePromoteTrip(int Id)
        {
            try
            {
                var list = await repo.DeletePromoteTrip(Id);
                if (list != null)
                {
                    var response = new ResponseData<PromoteTrip>(StatusCodes.Status200OK, "Delete Promote Trip Successfully", list, null);
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
        public async Task<ActionResult> PutPromoteTrip(int Id, [FromForm] PromoteTrip PromoteTrip)
        {
            try
            {
                bool list = await repo.PutPromoteTrip(Id, PromoteTrip);
                if (list == true)
                {
                    var response = new ResponseData<PromoteTrip>(StatusCodes.Status200OK, "Update Promote Trip Successfully ", PromoteTrip, null);
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
