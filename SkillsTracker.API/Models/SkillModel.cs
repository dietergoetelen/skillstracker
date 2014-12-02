using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillsTracker.API.Models
{
    public class SkillModel
    {
        public int UserId { get; set; }
        public int SkillId { get; set; }
        public int Rating { get; set; }
    }
}