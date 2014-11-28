using Microsoft.AspNet.Identity.EntityFramework;

namespace SkillsTracker.API.Identity
{
    public class AuthContext: IdentityDbContext<IdentityUser>
    {
        public AuthContext():base("SkillsTrackerAuthDB")
        {

        }
    }
}