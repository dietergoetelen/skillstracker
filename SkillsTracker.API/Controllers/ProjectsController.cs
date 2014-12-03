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
using SkillsTracker.API.Extensions;

namespace SkillsTracker.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/users")]
    public class ProjectsController : ApiController
    {
        private IBaseRepository<Profile> _profileRepo;
        private IBaseRepository<Project> _projectRepo;

        public ProjectsController(IBaseRepository<Profile> profileRepo, IBaseRepository<Project> projectRepo)
        {
            _profileRepo = profileRepo;
            _projectRepo = projectRepo;
        }

        [HttpGet]
        [Route("me/projects/{projectId}", Name = "GetCurrentUserProject")]
        public async Task<IHttpActionResult> GetCurrentUserProject(int projectId)
        {
            try
            {
                var userClaim = (RequestContext.Principal as ClaimsPrincipal).GetClaim("userId");

                if (userClaim == null)
                    return Unauthorized();

                return await GetProject(int.Parse(userClaim.Value), projectId);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("{userId}/projects/{projectId}", Name="GetProject")]
        public async Task<IHttpActionResult> GetProject(int userId, int projectId)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId, include: "Projects");

                if (profile == null)
                    return NotFound();

                var project = profile.Projects.FirstOrDefault(p => p.Id == projectId);

                if (project == null)
                    return NotFound();

                return Ok(project);
            }
            catch(Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("me/projects", Name = "GetCurrentUserProjects")]
        public async Task<IHttpActionResult> GetCurrentUserProjects()
        {
            try
            {
                var userClaim = (RequestContext.Principal as ClaimsPrincipal).GetClaim("userId");

                if (userClaim == null)
                    return Unauthorized();

                return await GetProjects(int.Parse(userClaim.Value));
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("{userId}/projects", Name = "GetProjects")]
        public async Task<IHttpActionResult> GetProjects(int userId)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId, include: "Projects");

                if (profile == null)
                    return NotFound();

                return Ok(profile.Projects);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("me/projects", Name = "PostCurrentUserProject")]
        public async Task<IHttpActionResult> PostProject(Project project)
        {
            try
            {
                var userClaim = (RequestContext.Principal as ClaimsPrincipal).GetClaim("userId");

                if (userClaim == null)
                    return Unauthorized();

                return await PostProject(int.Parse(userClaim.Value), project);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("{userId}/projects", Name = "PostProject")]
        public async Task<IHttpActionResult> PostProject(int userId, Project project)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);

                if (profile == null)
                    return NotFound();

                profile.Projects.Add(project);

                _projectRepo.Add(project);

                await _projectRepo.SaveChangesAsync();

                return Created<Project>(Url.Route("GetProject", new { userId = userId, projectId = project.Id }), project);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPut]
        [Route("me/projects/{projectId}", Name = "UpdateCurrentUserProject")]
        public async Task<IHttpActionResult> UpdateProject(int projectId, Project model)
        {
            try
            {
                var userClaim = (RequestContext.Principal as ClaimsPrincipal).GetClaim("userId");

                if (userClaim == null)
                    return NotFound();

                return await UpdateProject(int.Parse(userClaim.Value), projectId, model);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPut]
        [Route("{userId}/projects/{projectId}", Name = "UpdateUserProject")]
        public async Task<IHttpActionResult> UpdateProject(int userId, int projectId, Project model)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);

                if (profile == null)
                    return NotFound();

                profile.Projects.Add(model);
                _profileRepo.Add(profile);
                await _profileRepo.SaveChangesAsync();

                return Ok(model);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("me/projects/{projectId}", Name = "RemoveCurrentUserProject")]
        public async Task<IHttpActionResult> DeleteProject(int projectId)
        {
            try
            {
                var userClaim = (RequestContext.Principal as ClaimsPrincipal).GetClaim("userId");

                if (userClaim == null)
                    return NotFound();

                return await DeleteProject(int.Parse(userClaim.Value), projectId);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("{userId}/projects/{projectId}", Name = "DeleteProject")]
        public async Task<IHttpActionResult> DeleteProject(int userId, int projectId)
        {
            try
            {
                var profile = await _profileRepo.FirstOrDefaultAsync(p => p.UserId == userId);

                if (profile == null)
                    return NotFound();

                var project = await _projectRepo.FirstOrDefaultAsync(s => s.Id == profile.Id);

                if (project == null)
                    return NotFound();

                _projectRepo.Remove(project);

                await _projectRepo.SaveChangesAsync();

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
    }
}
