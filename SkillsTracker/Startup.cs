using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using SkillsTracker.Provider;
using System;
namespace SkillsTracker
{
    public class Startup
    {
        public void Configuration(IAppBuilder App)
        {
            App.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(1),
                AllowInsecureHttp = true,

                Provider = new SimpleAuthorizationServerProvider()
            });

            App.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            App.UseWebApi(WebApiConfig.Register());
        }
    }
}