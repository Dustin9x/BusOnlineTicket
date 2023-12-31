﻿using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult> GetAllDriver()
        {
            try
            {
                var list = await repo.GetAllDriver();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Driver>>(StatusCodes.Status200OK, "Get list of bus successfully", list, null);
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
        public async Task<ActionResult> CreateDriver(Driver driver)
        {
            try
            {
                bool list = await repo.CreateDriver(driver);
                if (list == true)
                {
                    var response = new ResponseData<Driver>(StatusCodes.Status200OK, "Create new Driver Successfully", driver, null);
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
        public async Task<ActionResult> PutDriver(Driver driver)
        {
            try
            {
                bool list = await repo.PutDriver(driver);
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
    }
}
