#region using

using System;
using System.Linq;
using System.Linq.Expressions;
using PagedList;

#endregion

namespace Gallery.Core.Contracts.Repositories.Base
{
    public interface IBasePagingRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        int Count(Expression<Func<TEntity, bool>> predicate = null);

        IPagedList<TEntity> PagedFilter(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            int? page = 1, int size = 10);
    }
}
