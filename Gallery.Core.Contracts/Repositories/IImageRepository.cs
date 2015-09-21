using Gallery.Core.Contracts.Repositories.Base;
using Gallery.Core.Domain;

namespace Gallery.Core.Contracts.Repositories
{
    public interface IImageRepository : IBasePagingRepository<Image>
    {
    }
}
