using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewRepo repo;

        public NewsController(INewRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllNews()
        {
            try
            {
                var list = await repo.GetAllNews();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<News>>(StatusCodes.Status200OK, "Get list of news successfully", list, null);
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
        public async Task<ActionResult> GetNewsById(int Id)
        {
            try
            {
                var list = await repo.GetNewsById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<News>>(StatusCodes.Status200OK, "Get New successfully", list, null);
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
        public async Task<ActionResult> CreateNews([FromForm] News news)
        {
            try
            {
                bool list = await repo.CreateNews(news);
                if (list == true)
                {
                    var response = new ResponseData<News>(StatusCodes.Status200OK, "Create new News Successfully", news, null);
                    return Ok(response);
                }
                return BadRequest(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteNews(int Id)
        {
            try
            {
                var list = await repo.DeleteNews(Id);

                if (list != null)
                {

                    var response = new ResponseData<News>(StatusCodes.Status200OK, "Delete News Successfully", list, null);
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

        public async Task<ActionResult> PutNews(int Id ,[FromForm] News news)
        {
            try
            {
                bool list = await repo.PutNews(Id, news);
                if (list == true)
                {
                    var response = new ResponseData<News>(StatusCodes.Status200OK, "Update News Successfully ", news, null);
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

        [HttpGet("Pagination")]
        public IActionResult Pagination(int page = 1)
        {
            try
            {
                var result = repo.Pagination(page);
                return Ok(result);
            }
            catch
            {
                return BadRequest("We canot Found Page");
            }
        }
    }
}
