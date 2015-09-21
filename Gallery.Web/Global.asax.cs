#region using

using Arsis.RekodWMS.Web.Mappings;
using Autofac;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac.Integration.Mvc;

#endregion

namespace Gallery.WEB
{
    using Autofac;

    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);


            var builder = new ContainerBuilder();

            builder.RegisterControllers(Assembly.GetExecutingAssembly()).PropertiesAutowired();

            builder.RegisterModule<UnitOfWorkModule>();
            builder.RegisterModule<RepositoryModule>();
            builder.RegisterModule<ServiceModule>();

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            AutoMapperConfiguration.Configure();
        }
    }
}