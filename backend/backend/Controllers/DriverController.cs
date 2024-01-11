using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;
using System;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IDriverRepo repo;
        private readonly IWebHostEnvironment env;

        public DriverController(IDriverRepo repo, IWebHostEnvironment env)
        {
            this.repo = repo;
            this.env = env;
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
        public async Task<ActionResult> CreateDriver([FromForm]  Driver driver)
        {
            try
            {
                if (driver.UploadImage.Length > 0) 
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/Driver");
                    var filePath = Path.Combine(upload, driver.UploadImage.FileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await driver.UploadImage.CopyToAsync(stream); 
                    }

                    // Tạo đường dẫn cho tệp tin ảnh
                    driver.Avatar = filePath;
                }


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
                    if (!string.IsNullOrEmpty(list.Avatar))
                    {
                        if (System.IO.File.Exists(list.Avatar))
                        {
                            System.IO.File.Delete(list.Avatar); // Xóa tệp tin ảnh
                        }
                    }
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
                if (driver.UploadImage.Length > 0) 
                {
                    var upload = Path.Combine(env.ContentRootPath, "Images/Driver");
                    var filePath = Path.Combine(upload, driver.UploadImage.FileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await driver.UploadImage.CopyToAsync(stream); 
                    }

                    // Tạo đường dẫn cho tệp tin ảnh
                    driver.Avatar = filePath;
                }

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
