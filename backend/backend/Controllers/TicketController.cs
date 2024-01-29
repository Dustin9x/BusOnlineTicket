using backend.IRepository;
using backend.Models;
using backend.ResponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepo repo;
        private readonly ISendMail mailRepo;
        private readonly IWebHostEnvironment env;
        private readonly DatabaseContext db;

        public TicketController(ITicketRepo repo, IWebHostEnvironment env, DatabaseContext db, ISendMail mailRepo)
        {
            this.repo = repo;
            this.env = env;
            this.db = db;
            this.mailRepo = mailRepo;
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult> GetTicketByUser(int Id)
        {
            try
            {
                var list = await repo.GetTicketByUser(Id);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Ticket>>(StatusCodes.Status200OK, "Get ticket list successfully", list, null);
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
        [HttpGet("search/{Code}")]
        public async Task<ActionResult> SearchTicket(string Code)
        {
            try
            {
                var list = await repo.SearchTicket(Code);
                if (list != null)
                {
                    var response = new ResponseData<IEnumerable<Ticket>>(StatusCodes.Status200OK, "Get ticket successfully", list, null);
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
        public async Task<ActionResult> AddTicket([FromBody] Ticket ticket)
        {
            try
            {
                bool list = await repo.AddTicket(ticket);
                if (list == true)
                {

                    string FilePath = Path.Combine(env.ContentRootPath, "EmailTemplate", "orderconfirm.html");
                    Trip? trip = await db.Trips
                                .Where(t => t.Id == ticket.TripId)
                                .Select(t => new Trip()
                                {
                                    Id = t.Id,
                                    FromStation = db.Stations.Where(s => s.Id == t.FromStationId).SingleOrDefault(),
                                    ToStation = db.Stations.Where(s => s.Id == t.ToStationId).SingleOrDefault(),
                                    StartTime = t.StartTime,
                                })
                                .SingleOrDefaultAsync();
                    string useremail = db.Users.Where(u => u.Id == ticket.UserId).SingleOrDefaultAsync().Result.Email;
                    string ticketcode = ticket.Code;
                    string fromstation = trip.FromStation.Name;
                    string tostation = trip.ToStation.Name;
                    string departuretime = trip.StartTime.ToString("dd-MM-yyy hh:mm");
                    string seatslist = ticket.SeatsList;
                    string specialnote = ticket.Note;
                    string qrcode = "Code: " + ticket.Code + " Email: " + useremail + " Route: " + fromstation + "-" + tostation + " Start: " + departuretime + " Seats: " + seatslist + " Note: " + specialnote;
                    StreamReader str = new StreamReader(FilePath);
                    string MailText = str.ReadToEnd();
                    str.Close();

                    MailText = MailText.Replace("[ticketcode]", ticketcode);
                    MailText = MailText.Replace("[fromstation]", fromstation);
                    MailText = MailText.Replace("[tostation]", tostation);
                    MailText = MailText.Replace("[departuretime]", departuretime);
                    MailText = MailText.Replace("[seatslist]", seatslist);
                    MailText = MailText.Replace("[specialnote]", specialnote);
                    MailText = MailText.Replace("[qrcode]", qrcode);

                    Mail mail = new Mail()
                    {
                        ToEmail = useremail,
                        //Body = "Your new password:" + password.ToString(),
                        Body = MailText,
                        Subject = "PHTV - Your ordered ticket",

                    };
                    await mailRepo.SendEmailAsync(mail);
                    var response = new ResponseData<Ticket>(StatusCodes.Status200OK, "Add new ticket Successfully", ticket, null);
                    return Ok(response);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPut]
        public async Task<ActionResult> CancelTicket(int Id, int Day)
        {
            try
            {
                var list = await repo.CancelTicket(Id, Day);
                if (list != null)
                {
                    var response = new ResponseData<Ticket>(StatusCodes.Status200OK, "Update BusType Successfully ", list, null);
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

        [HttpGet("profit/{year}")]
        public IActionResult GetProfit(int year)
        {
            var list = repo.GetProfitByMonth(year);
            if (list != null)
            {
                var result = new ResponseData<IEnumerable<Profit>>(StatusCodes.Status200OK, "Get profit successfully", list.Result, null);
                return Ok(result);
            }
            return BadRequest();
        }
    }
}
