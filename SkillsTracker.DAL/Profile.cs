using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillsTracker.DAL
{
    public class Profile
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, StringLength(400)]
        public string Introduction { get; set; }

        public virtual ICollection<UserSkill> Skills { get; set; }

        [Column(TypeName="text")]
        public string ProfileImage { get; set; }

        public virtual User User { get; set; }
    }
}
