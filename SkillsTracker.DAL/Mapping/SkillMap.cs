using System.Data.Entity.ModelConfiguration;
namespace SkillsTracker.DAL.Mapping
{
    public class SkillMap : EntityTypeConfiguration<Skill>
    {
        public SkillMap()
        {
            ToTable("Skill");            
        }
    }
}
