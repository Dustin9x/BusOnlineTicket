using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IOfferRepo repo;

        public OfferController(IOfferRepo repo)
        {
            this.repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAllOffer()
        {
            try
            {
                var list = await repo.GetAllOffer();
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Offer>>(StatusCodes.Status200OK, "Get list of offers successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("{Id}")]
        public async Task<ActionResult> GetOfferById(int Id)
        {
            try
            {
                var list = await repo.GetOfferById(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Offer>>(StatusCodes.Status200OK, "Get Offer successfully", list, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpGet("code/{Code}")]
        public async Task<ActionResult> GetOfferByCode(string Code)
        {
            try
            {
                var list = await repo.GetOfferByCode(Code);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Offer>>(StatusCodes.Status200OK, "Get Offer successfully", list, null);
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
        public async Task<ActionResult> CreateNews([FromForm] Offer offer)
        {
            try
            {
                bool list = await repo.CreateOffer(offer);
                if (list == true)
                {
                    var response = new ResponseData<Offer>(StatusCodes.Status200OK, "Create new Offer Successfully", offer, null);
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
        public async Task<ActionResult> DeleteOffer(int Id)
        {
            try
            {
                var list = await repo.DeleteOffer(Id);

                if (list != null)
                {

                    var response = new ResponseData<Offer>(StatusCodes.Status200OK, "Delete Offer Successfully", list, null);
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

        public async Task<ActionResult> PutOffer(int Id, [FromForm] Offer offer)
        {
            try
            {
                bool list = await repo.PutOffer(Id, offer);
                if (list == true)
                {
                    var response = new ResponseData<Offer>(StatusCodes.Status200OK, "Update News Successfully ", offer, null);
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
