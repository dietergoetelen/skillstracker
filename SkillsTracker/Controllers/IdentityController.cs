using SkillsTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace SkillsTracker.Controllers
{
    [Authorize]
    public class IdentityController : ApiController
    {
        public IEnumerable<ViewClaim> Get()
        {
            var principal = Request.GetRequestContext().Principal as ClaimsPrincipal;

            return principal.Claims.Select(c => new ViewClaim { Type = c.Type, Value = c.Value });
        }
    }
}
