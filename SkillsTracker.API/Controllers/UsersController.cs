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
    public class UsersController : ApiController
    {
        private IBaseRepository<User> _userRepo;

        public UsersController(IBaseRepository<User> userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        [Route("", Name="GetAllUsers")]
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var allUsers = await _userRepo.Get();

                if (allUsers == null)
                    return BadRequest();

                return Ok(allUsers);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("me", Name="CurrentUser")]
        public async Task<IHttpActionResult> GetCurrentUser()
        {
            try
            {
                var id = RequestContext.Principal as ClaimsPrincipal;

                var userClaim = id.Claims.FirstOrDefault(c => c.Type == "sub");

                if (userClaim == null)
                    return NotFound();

                var user = await _userRepo.FirstOrDefaultAsync(u => u.Email.Equals(userClaim.Value, StringComparison.OrdinalIgnoreCase));

                if (user == null)
                    return NotFound();

                return Ok(user);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("{id}", Name="GetSingleUser")]
        public async Task<IHttpActionResult> Get(int id)
        {
            try
            {
                var user = await _userRepo.FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                    return NotFound();

                return Ok(user);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
    }
}
