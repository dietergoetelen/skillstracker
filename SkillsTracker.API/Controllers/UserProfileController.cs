using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SkillsTracker.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/users/{userId}/profile")]
    public class UserProfileController: ApiController
    {
        private IBaseRepository<Profile> _profileRepo;

        public UserProfileController(IBaseRepository<Profile> profileRepo)
        {
            _profileRepo = profileRepo;
        }

        [HttpGet]
        [Route("", Name="GetUserProfile")]
        public async Task<IHttpActionResult> Get(int userId)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);

                if (profile == null)
                    return NotFound();

                return Ok(profile);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("skills", Name="GetSkills")]
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
    }
}