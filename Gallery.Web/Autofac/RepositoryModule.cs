#region using

using Autofac;
using Autofac.Integration.Mvc;
using GalleryCore.Repositories;

#endregion

namespace Gallery.WEB.Autofac
{
    public class RepositoryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof (ImageRepository).Assembly).
                Where((t => t.Name.EndsWith("Repository"))).AsImplementedInterfaces().InstancePerHttpRequest();
        }
    }
}