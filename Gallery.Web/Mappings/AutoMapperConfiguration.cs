using AutoMapper;
using Gallery.WEB.Mappings;

namespace Arsis.RekodWMS.Web.Mappings
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<DomainToViewModelMappingProfile>();
                x.AddProfile<ViewModelToDomainMappingProfile>();
                x.AddProfile<ViewModelToSearchCriteriaMappingProfile>();
            });
        }
    }
}