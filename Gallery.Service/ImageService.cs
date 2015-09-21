#region using

using Gallery.Core.Contracts;
using Gallery.Core.Contracts.Repositories;
using Gallery.Core.Domain;
using Gallery.Core.Domain.SearchCriteria;
using Gallery.Helpers;
using Gallery.ServiceContracts;
using LinqKit;
using PagedList;

#endregion

namespace Gallery.Service
{
    public class ImageService : BaseService<Image, IImageRepository>, IImageService
    {
        public ImageService(IImageRepository repo, IUnitOfWork unitOfWork) : base(repo, unitOfWork)
        {
        }

        public IPagedList<Image> PagedFilter(ImageSearchCriteria filter, string column, string direction, int? page,
            int size = 15)
        {
            var filterExpression = PredicateBuilder.True<Image>();

            if (!string.IsNullOrEmpty(filter.Description))
            {
                filterExpression = filterExpression.And(i => i.Description.Contains(filter.Description));
            }
            return Repo.PagedFilter(filterExpression, EntityHelper<Image>.GetOrderBy(column, direction), page, size);
        }
    }
}
