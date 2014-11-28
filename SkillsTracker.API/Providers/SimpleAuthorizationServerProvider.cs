using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using SkillsTracker.API.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
namespace SkillsTracker.API.Providers
{
    public class SimpleAuthorizationServerProvider: OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override  async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            using (AuthRepository repo = new AuthRepository())
            {
                IdentityUser user = await repo.FindUser(context.UserName, context.Password);
                if (user == null)
                {
                    context.SetError("invalid_grant", "The username or password is incorrect");
                    return;
                }

                var id = new ClaimsIdentity(context.Options.AuthenticationType);
                id.AddClaim(new Claim("sub", context.UserName));
                id.AddClaim(new Claim("role", "admin"));

                context.Validated(id);
            }
        }
    }
}