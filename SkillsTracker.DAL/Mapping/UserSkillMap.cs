using System.Data.Entity.ModelConfiguration;
namespace SkillsTracker.DAL.Mapping
{
    public class UserSkillMap : EntityTypeConfiguration<UserSkill>
    {
        public UserSkillMap()
        {
            ToTable("UserSkill");
        }
    }
}
