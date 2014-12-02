using SkillsTracker.API.Models;
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
        private IBaseRepository<UserSkill> _userSkillRepo;
        private IBaseRepository<Skill> _skillRepo;

        public UserSkillsController(IBaseRepository<Profile> profileRepo,
                                    IBaseRepository<UserSkill> userSkillRepo,
                                    IBaseRepository<Skill> skillRepo)
        {
            _profileRepo = profileRepo;
            _userSkillRepo = userSkillRepo;
            _skillRepo = skillRepo;
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
        [Route("{userId}/skills", Name = "GetUserSkills")]
        public async Task<IHttpActionResult> GetSkills(int userId)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);
                
                if (profile == null)
                    return NotFound();

                var skills = await _userSkillRepo.Get(s => s.ProfileId == profile.Id);

                return Ok(skills);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("me/skills", Name = "AddCurrentUserSkill")]
        public async Task<IHttpActionResult> PostCurrentUserSkills(SkillModel model)
        {
            try
            {
                var idClaim = GetUserIdClaim();

                if (idClaim == null)
                    return NotFound();

                return await PostSkills(int.Parse(idClaim.Value), model);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("{userId}/skills", Name="AddUserSkill")]
        public async Task<IHttpActionResult> PostSkills(int userId, SkillModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // fetch user and skill
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);
                var skill = await _skillRepo.FirstOrDefaultAsync(s => s.Id == model.SkillId);

                if (profile == null || skill == null)
                    return BadRequest();

                var userSkill = new UserSkill
                {
                    ProfileId = profile.Id,
                    SkillId = skill.Id,
                    Rating = model.Rating
                };

                profile.Skills.Add(userSkill);

                _userSkillRepo.Add(userSkill);
                await _userSkillRepo.SaveChangesAsync();

                return Created<UserSkill>(Url.Route("GetUserSkills", new { userId = userId}), userSkill);
            }
            catch(Exception)
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("me/skills/{skillId}", Name="RemoveCurrentUserSkill")]
        public async Task<IHttpActionResult> DeleteUserSkill(int skillId)
        {
            try
            {
                var userClaim = GetUserIdClaim();

                if (userClaim == null)
                    return NotFound();

                return await DeleteSkill(int.Parse(userClaim.Value), skillId);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("{userId}/skills/{skillId}", Name="DeleteUserSkill")]
        public async Task<IHttpActionResult> DeleteSkill(int userId, int skillId)
        {
            try
            {
                var  profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);

                if (profile == null)
                    return NotFound();

                var skill = profile.Skills.FirstOrDefault(s => s.SkillId == skillId && s.ProfileId == profile.Id);

                if (skillId == null)
                    return NotFound();

                _userSkillRepo.Remove(skill);

                await _userSkillRepo.SaveChangesAsync();

                return StatusCode(HttpStatusCode.NoContent);
            } 
            catch(Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPut]
        [Route("me/skills/skillId", Name="UpdateCurrentUserSKill")]
        public async Task<IHttpActionResult> UpdateUserSkill(int skillId, SkillModel model)
        {
            try
            {
                var userClaim = GetUserIdClaim();

                if (userClaim == null)
                    return NotFound();

                return await UpdateSkill(int.Parse(userClaim.Value), skillId, model);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        
        [HttpPut]
        [Route("{userId}/skills/{skillId}", Name="UpdateUserSkill")]
        public async Task<IHttpActionResult> UpdateSkill(int userId, int skillId, SkillModel model)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);

                if (profile == null)
                    return NotFound();

                var skill = await _userSkillRepo.FirstOrDefaultAsync(s => s.SkillId == skillId && s.ProfileId == profile.Id);

                if (skill == null)
                    return NotFound();

                skill.Rating = model.Rating;

                await _userSkillRepo.SaveChangesAsync();

                return Ok(skill);
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
