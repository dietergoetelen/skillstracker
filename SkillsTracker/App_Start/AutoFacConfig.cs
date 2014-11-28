using Autofac;
using Autofac.Integration.WebApi;
using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System.Reflection;
using System.Web.Http;
namespace SkillsTracker
{
    public class AutoFacConfig
    {
        public static void Configure()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<SkillsTrackerDbContext>().AsSelf().InstancePerRequest();
            builder.RegisterGeneric(typeof(BaseRepository<>)).AsImplementedInterfaces().InstancePerRequest();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            var container = builder.Build();

            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}