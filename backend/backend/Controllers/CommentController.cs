using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly ICommentRepo repo;

        public CommentController(ICommentRepo repo)
        {
            this.repo = repo;
        }

        [HttpPost]
        public async Task<ActionResult> CreateComment([FromForm]Comment Comment)
        {
            try
            {
                var list = await repo.CreateComment(Comment);
                if (list == true)
                {
                    var response = new ResponseData<Comment>(StatusCodes.Status200OK, "Create new bus successfully", Comment, null);
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
        public async Task<ActionResult> DeleteComment(int Id)
        {
            try
            {
                var list = await repo.DeleteComment(Id);
                if (list !=null)
                {
                    var response = new ResponseData<Comment>(StatusCodes.Status200OK, "Delete new bus successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> PutComment(int Id, [FromForm]Comment comment)
        {
            try
            {
                bool list = await repo.PutComment(Id, comment);
                if (list == true)
                {
                    var response = new ResponseData<Comment>(StatusCodes.Status200OK, "Update new bus successfully", comment, null);
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
