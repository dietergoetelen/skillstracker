using SkillsTracker.DAL.Mapping;
using System.Data.Entity;
namespace SkillsTracker.DAL
{
    public class SkillsTrackerDbContext: DbContext
    {
        public SkillsTrackerDbContext(): base("SkillsTrackerDB")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Configurations.Add(new UserMap());
            modelBuilder.Configurations.Add(new SkillMap());
            modelBuilder.Configurations.Add(new ProfileMap());
            modelBuilder.Configurations.Add(new UserSkillMap());
        }
    }
}
