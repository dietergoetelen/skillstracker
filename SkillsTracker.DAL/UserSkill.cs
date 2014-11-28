using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillsTracker.DAL
{
    public class UserSkill
    {
        [Key, Column(Order = 1)]
        [ForeignKey("Skill")]
        public int SkillId { get; set; }

        [Key, Column(Order = 2)]
        [ForeignKey("Profile")]
        public int ProfileId { get; set; }
     
        public virtual Skill Skill { get; set; }        
        public virtual Profile Profile { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }
    }
}
