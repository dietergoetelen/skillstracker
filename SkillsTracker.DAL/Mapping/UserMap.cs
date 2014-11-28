using System.Data.Entity.ModelConfiguration;


namespace SkillsTracker.DAL.Mapping
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("User");


        }
    }
}
