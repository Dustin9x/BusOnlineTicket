using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FAQController : ControllerBase
    {
        private readonly IFAQrepo repo;

        public FAQController(IFAQrepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllFAQ()
        {
            try
            {
                var list = await repo.GetAllFAQ();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<FAQ>>(StatusCodes.Status200OK, "Get List Of FAQ Successfully", list, null);
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
        public async Task<ActionResult> GetFAQById(int Id)
        {
            try
            {
                var list = await repo.GetFAQById(Id);
                if (list.Count() > 0)
                {
                    var response = new ResponseData<IEnumerable<FAQ>>(StatusCodes.Status200OK, "Get FAQ successfully", list, null);
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
        public async Task<ActionResult> CreateFAQ([FromForm] FAQ FAQ)
        {
            try
            {
                bool list = await repo.CreateFAQ(FAQ);
                if (list == true)
                {
                    var response = new ResponseData<FAQ>(StatusCodes.Status200OK, "Create new FAQ Successfully", FAQ, null);
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
        public async Task<ActionResult> DeleteFAQ(int Id)
        {
            try
            {
                var list = await repo.DeleteFAQ(Id);
                if (list != null)
                {
                    var response = new ResponseData<FAQ>(StatusCodes.Status200OK, "Delete FAQ Successfully", list, null);
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
        public async Task<ActionResult> PutFAQ(int Id, [FromForm] FAQ FAQ)
        {
            try
            {
                bool list = await repo.PutFAQ(Id, FAQ);
                if (list == true)
                {
                    var response = new ResponseData<FAQ>(StatusCodes.Status200OK, "Update BusType Successfully ", FAQ, null);
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
