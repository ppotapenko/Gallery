#region using

using PagedList;

#endregion

namespace Gallery.ServiceContracts
{
    public interface IBasePagingService<TEntity, in TSearchCriteria> : IBaseService<TEntity>
    {
        IPagedList<TEntity> PagedFilter(TSearchCriteria filter, string column, string direction, int? page = 1,
            int size = 12);
    }

    public interface IBasePagingService<TEntity> : IBasePagingService<TEntity, TEntity> where TEntity : class
    {
    }
}
