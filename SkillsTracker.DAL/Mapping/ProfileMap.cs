using System.Data.Entity.ModelConfiguration;
namespace SkillsTracker.DAL.Mapping
{
    public class ProfileMap: EntityTypeConfiguration<Profile>
    {
        public ProfileMap()
        {
            ToTable("Profile");             
        }
    }
}
