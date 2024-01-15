using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo repo;

        public UserController(IUserRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUser()
        {
            try
            {
                var list = await repo.GetAllUser();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get list of User successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var list = await repo.GetAll();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get list successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("Mod")]
        public async Task<ActionResult> GetAllMod()
        {
            try
            {
                var list = await repo.GetAllMod();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get list of Mod successfully", list, null);
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
        public async Task<ActionResult> GetById(int Id)
        {
            try
            {
                var list = await repo.GetUserById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<User>>(StatusCodes.Status200OK, "Get successfully", list, null);
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
        public async Task<ActionResult> CreateUser([FromForm] User User)
        {
            try
            {
                bool list = await repo.CreateUser(User);
                if (list == true)
                {
                    var response = new ResponseData<User>(StatusCodes.Status200OK, "Create new User Successfully", User, null);
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
        public async Task<ActionResult> DeleteUser(int Id)
        {
            try
            {
                var list = await repo.DeleteUser(Id);

                if (list != null)
                {
                    if (!string.IsNullOrEmpty(list.Avatar))
                    {
                        if (System.IO.File.Exists(list.Avatar))
                        {
                            System.IO.File.Delete(list.Avatar); // Xóa tệp tin ảnh
                        }
                    }
                    var response = new ResponseData<User>(StatusCodes.Status200OK, "Delete User Successfully", list, null);
                    return Ok(response);
                }
                else { return BadRequest(); }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{Id}")]
        public async Task<ActionResult> PutDriver(int Id, [FromForm] User User)
        {
            try
            {
                bool list = await repo.PutUser(Id, User);
                if (list == true)
                {
                    var response = new ResponseData<User>(StatusCodes.Status200OK, "Update User Successfully ", User, null);
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
