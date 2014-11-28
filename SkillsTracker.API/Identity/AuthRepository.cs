using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using SkillsTracker.API.Models;
using SkillsTracker.DAL;
using System;
using System.Threading.Tasks;

namespace SkillsTracker.API.Identity
{
    public class AuthRepository: IDisposable
    {
        private AuthContext _ctx;

        private UserManager<IdentityUser> _userManager;

        public AuthRepository()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(UserModel user)
        {
            IdentityUser identityUser = new IdentityUser
            {
                UserName = user.Email
            };

            var result = await _userManager.CreateAsync(identityUser, user.Password);

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}