using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillsTracker.DAL
{
    public class Profile
    {

        public int Id { get; set; }

        public string Introduction { get; set; }

        public ICollection<string> PrimarySkills { get; set; }

        [Column(TypeName="text")]
        public string ProfileImage { get; set; }

        public virtual User User { get; set; }
    }
}
