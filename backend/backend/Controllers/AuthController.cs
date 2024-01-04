using backend.IRepository;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext db;
        private readonly IConfiguration config;
        private readonly IUserRepo repo;

        public AuthController(DatabaseContext db, IConfiguration config, IUserRepo repo)
        {
            this.db = db;
            this.config = config;
            this.repo = repo;
        }

        [HttpPost]
        private async Task<User> Authenticate(UserLogin userLogin)
        {
            try
            {
                IEnumerable<User> userList = await db.Users.ToListAsync();
                User list = userList.FirstOrDefault(u => u.Email == userLogin.Email);
                if (list != null)
                {
                    var result = BCrypt.Net.BCrypt.Verify(userLogin.Password, list.Password);
                    if (result == true)
                    {
                        var User = db.Users.FirstOrDefault(u => u.Email == userLogin.Email);
                        return User;
                    }
                    return null;
                }
                return null;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [NonAction]
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("Email",user.Email),
                new Claim("Password", user.Password),
                new Claim(ClaimTypes.Role,user.Role)
            };
            var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Audience"], claims, expires: DateTime.Now.AddSeconds(30), signingCredentials: credential);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /*  [AllowAnonymous]
          [HttpPost]
          public async Task<ActionResult> Login([FromBody] UserLogin userLogin)
          {
              var user = await Authenticate(userLogin);
              if (user != null)
              {
                  string token = GenerateToken(user);
                  return Ok(new { token });
              }
              return NotFound("User not found");
          }*/
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] UserLogin userLogin)
        {
            var user = await Authenticate(userLogin);
            if (user != null)
            {

                var token = GenerateToken(user);
                var err = 0;
                return Ok(new { token, user, msg = "Login successfully", err });
            }
            else
            {
                return Ok(new { msg = "Login fail", err = 2 });
            }
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserLogin userRegister)
        {
            try
            {
                var ExistingUser = await db.Users.SingleOrDefaultAsync(U => U.Email == userRegister.Email);
                if(ExistingUser == null)
                {
                    var user = new User
                    {
                        Email = userRegister.Email,
                        Role = "User",
                        Password = BCrypt.Net.BCrypt.HashPassword(userRegister.Password)
                    };
                    await db.AddAsync(user);
                    await db.SaveChangesAsync();
                    // 4. Tạo và trả về token nếu thành công
                    var token = GenerateToken(user);
                    return Ok(new { token, msg = "Register successfully", err = 0 });
                }
                return Ok(new { msg = "Register not successfully", error="Email existed" });

            }
            catch (Exception ex)
            {
                return Ok(new { msg = "Register not successfully", err = 1, error = ex.Message });
            }
        }
    }
}
