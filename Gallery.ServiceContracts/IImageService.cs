#region using

using Gallery.Core.Domain;
using Gallery.Core.Domain.SearchCriteria;

#endregion

namespace Gallery.ServiceContracts
{
    public interface IImageService : IBasePagingService<Image, ImageSearchCriteria>
    {
    }
}
