using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace SkillsTracker.API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Claim GetClaim(this ClaimsPrincipal principal, string claimType)
        {
            if (!principal.Claims.Any())
                return null;

            Claim claim = principal.Claims.FirstOrDefault(c => c.Type.Equals(claimType, StringComparison.Ordinal));

            return claim;
        }
    }
}