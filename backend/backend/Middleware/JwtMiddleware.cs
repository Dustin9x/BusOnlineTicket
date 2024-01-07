using backend.Models;

namespace backend.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            context.Request.Headers.Add("Authorization", "Bearer " + UserToken.token);

            await _next(context);
        }
    }
}
