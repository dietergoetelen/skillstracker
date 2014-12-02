using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;
using SkillsTracker.API.Providers;
using SkillsTracker.DAL;
using SkillsTracker.DAL.Repositories;
using System;
using System.Web.Http;

[assembly: OwinStartup(typeof(SkillsTracker.API.Startup))]
namespace SkillsTracker.API
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            
            WebApiConfig.Register(config);
            AutoFacConfig.Configure(config);

            ConfigureOAuth(app, config.DependencyResolver.GetService(typeof(IBaseRepository<User>)) as IBaseRepository<User>);
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app, IBaseRepository<User> userRepo)
        {
            OAuthAuthorizationServerOptions authServerOptions = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(1),
                Provider = new SimpleAuthorizationServerProvider(userRepo)
            };

            app.UseOAuthAuthorizationServer(authServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}