using Autofac;
using Autofac.Integration.Mvc;
using Gallery.Service;

namespace Gallery.WEB.Autofac
{
    public class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(ImageService).Assembly)
                .Where(t => t.Name.EndsWith("Service"))
                .AsImplementedInterfaces().InstancePerHttpRequest();
        }
    }
}