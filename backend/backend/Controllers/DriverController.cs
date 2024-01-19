using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IDriverRepo repo;

        public DriverController(IDriverRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetApproveDrivers()
        {
            try
            {
                var list = await repo.GetApproveDrivers();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Driver>>(StatusCodes.Status200OK, "Get list of approved driver successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("registerdriver")]
        public async Task<ActionResult> GetRegisterDrivers()
        {
            try
            {
                var list = await repo.GetRegisterDrivers();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Driver>>(StatusCodes.Status200OK, "Get list of register driver successfully", list, null);
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
        public async Task<ActionResult> GetDriverById(int Id)
        {
            try
            {
                var list = await repo.GetDriverById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Driver>>(StatusCodes.Status200OK, "Get driver successfully", list, null);
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
        public async Task<ActionResult> CreateDriver([FromForm] Driver driver)
        {
            try
            {
                bool list = await repo.CreateDriver(driver);
                if (list == true)
                {
                    var response = new ResponseData<Driver>(StatusCodes.Status200OK, "Create new Driver Successfully", driver, null);
                    return Ok(response);
                }
                return BadRequest(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteDriver(int Id)
        {
            try
            {
                var list = await repo.DeleteDriver(Id);

                if (list != null)
                {

                    var response = new ResponseData<Driver>(StatusCodes.Status200OK, "Delete Driver Successfully", list, null);
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
        public async Task<ActionResult> PutDriver(int Id, [FromForm] Driver driver)
        {
            try
            {
                bool list = await repo.PutDriver(Id, driver);
                if (list == true)
                {
                    var response = new ResponseData<Driver>(StatusCodes.Status200OK, "Update Driver Successfully ", driver, null);
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

        [HttpPut("approve")]
        public async Task<ActionResult> ApproveDriver(int Id, [FromForm] Driver driver)
        {
            try
            {
                bool list = await repo.ApproveDriver(Id, driver);
                if (list == true)
                {
                    var response = new ResponseData<Driver>(StatusCodes.Status200OK, "Approve/Unapprove Driver Successfully ", driver, null);
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


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] Driver driver)
        {
            try
            {
                Driver loginDriver = await repo.Login(driver);
                if (loginDriver != null)
                {
                    var response = new ResponseData<Driver>(StatusCodes.Status200OK, "Driver login Successfully ", loginDriver, null);
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
