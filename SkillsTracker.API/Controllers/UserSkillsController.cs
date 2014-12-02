using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace SkillsTracker.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/users")]
    public class UserSkillsController : ApiController
    {
        private IBaseRepository<Profile> _profileRepo;

        public UserSkillsController(IBaseRepository<Profile> profileRepo)
        {
            _profileRepo = profileRepo;
        }

        [HttpGet]
        [Route("me/skills", Name="GetCurrentUserSkills")]
        public async Task<IHttpActionResult> GetSkills()
        {
            try
            {
                var userClaim = GetUserIdClaim();

                if (userClaim == null)
                    return NotFound();

                return await GetSkills(int.Parse(userClaim.Value));
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        
        [HttpGet]
        [Route("{userId}/skills", Name = "GetSkills")]
        public async Task<IHttpActionResult> GetSkills(int userId)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);

                if (profile == null)
                    return NotFound();

                return Ok(profile.Skills);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        private Claim GetUserIdClaim()
        {
            var id = RequestContext.Principal as ClaimsPrincipal;

            var userClaim = id.Claims.FirstOrDefault(c => c.Type == "userId");

            return userClaim;
        }
    }
}
