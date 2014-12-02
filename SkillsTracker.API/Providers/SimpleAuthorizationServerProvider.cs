using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using SkillsTracker.API.Identity;
using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System.Security.Claims;
using System.Threading.Tasks;
namespace SkillsTracker.API.Providers
{
    public class SimpleAuthorizationServerProvider: OAuthAuthorizationServerProvider
    {
        private IBaseRepository<User> _userRepo;
        public SimpleAuthorizationServerProvider(IBaseRepository<User> userRepo)
        {
            _userRepo = userRepo;
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            context.Validated();
        }

        public override Task MatchEndpoint(OAuthMatchEndpointContext context)
        {
            if (context.OwinContext.Request.Method == "OPTIONS" && context.IsTokenEndpoint)
            {
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "POST" });
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "accept", "authorization", "content-type" });
                context.OwinContext.Response.StatusCode = 200;
                context.RequestCompleted();

                return Task.FromResult<object>(null);
            }

            return base.MatchEndpoint(context);
        }

        public override  async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            using (AuthRepository repo = new AuthRepository())
            {
                IdentityUser user = await repo.FindUser(context.UserName, context.Password);
                if (user == null)
                {
                    context.SetError("invalid_grant", "The username or password is incorrect");
                    return;
                }

                var apiUser = await _userRepo.FirstOrDefaultAsync(u => u.Email.Equals(user.UserName, System.StringComparison.OrdinalIgnoreCase));

                if(apiUser == null)
                    context.Validated();

                var id = new ClaimsIdentity(context.Options.AuthenticationType);
                id.AddClaim(new Claim("userId", apiUser.Id.ToString()));
                id.AddClaim(new Claim("email", context.UserName));
                id.AddClaim(new Claim("role", "admin"));

                context.Validated(id);
            }
        }
    }
}