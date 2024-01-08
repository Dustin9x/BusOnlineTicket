using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Http;
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


        [HttpPost]
        public async Task<ActionResult> CreateBusType(BusType busType)
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



        [HttpDelete]
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
        public async Task<ActionResult> PutBusType(BusType busType)
        {
            try
            {
                bool list = await repo.PutBusType(busType);
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
    }
}
