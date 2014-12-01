using Microsoft.AspNet.Identity;
using SkillsTracker.API.Identity;
using SkillsTracker.API.Models;
using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SkillsTracker.API.Controllers
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private AuthRepository _authRepo = null;
        private IBaseRepository<User> _userRepo;
        private IBaseRepository<Profile> _profileRepo;

        public AccountController(IBaseRepository<User> userRepo, IBaseRepository<Profile> profileRepo)
        {
            _authRepo = new AuthRepository();
            _userRepo = userRepo;
            _profileRepo = profileRepo;
        }

        [AllowAnonymous]
        [Route("register")]
        public async Task<IHttpActionResult> Register(UserModel userModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                IdentityResult result = await _authRepo.RegisterUser(userModel);

                IHttpActionResult errorResult = GetErrorResult(result);

                if (errorResult != null)
                {
                    return errorResult;
                }

                // create the User instance
                var user = new User
                {
                    Email = userModel.Email,
                    FirstName = userModel.Firstname,
                    LastName = userModel.Lastname,
                    EmployeeCode = userModel.EmployeeCode
                };

                var profile = new Profile
                {
                    User = user,
                    Introduction = "Put your introduction here"
                };

                _userRepo.Add(user);
                _profileRepo.Add(profile);

                await _profileRepo.SaveChangesAsync();

                return Ok();
            }
            catch (Exception)
            {
                return InternalServerError();
            }            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _authRepo.Dispose();
            }

            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
