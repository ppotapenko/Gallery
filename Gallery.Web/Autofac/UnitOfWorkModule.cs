using Autofac;
using Autofac.Integration.Mvc;
using Gallery.Core.Contracts;
using GalleryCore;

namespace Gallery.WEB.Autofac
{
    public class UnitOfWorkModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<DataBaseFactory>().As<IDatabaseFactory>().InstancePerHttpRequest();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerHttpRequest();
        }
    }
}