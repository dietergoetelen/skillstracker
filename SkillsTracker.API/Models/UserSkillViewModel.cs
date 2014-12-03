using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillsTracker.API.Models
{
    public class UserSkillViewModel
    {
        public int UserId { get; set; }
        public int SkillId { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
    }
}