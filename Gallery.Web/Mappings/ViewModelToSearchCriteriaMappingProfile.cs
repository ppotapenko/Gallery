using AutoMapper;

namespace Arsis.RekodWMS.Web.Mappings
{
    public class ViewModelToSearchCriteriaMappingProfile:Profile
    {
        public override string ProfileName
        {
            get { return "ViewModelToSearchCriteriaMappings"; }
        }

        protected override void Configure()
        {
        }
    }
}