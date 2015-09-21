#region using

using System;
using System.Linq;
using System.Linq.Expressions;
using Gallery.Core.Contracts.Repositories.Base;
using LinqKit;
using PagedList;

#endregion

namespace GalleryCore.Repositories.Base
{
    public abstract class BasePagingRepository<TEntity> : BaseRepository<TEntity>, IBasePagingRepository<TEntity>
        where TEntity : class
    {
        protected BasePagingRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

        public virtual int Count(Expression<Func<TEntity, bool>> predicate = null)
        {
            return predicate != null ? DbSet.AsExpandable().Where(predicate).Count() : DbSet.Count();
        }

        public virtual IPagedList<TEntity> PagedFilter(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            int? page = 1, int size = 15)
        {
            IQueryable<TEntity> query = DbSet;

            if (filter != null)
            {
                query = query.AsExpandable().Where(filter);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            page = page.HasValue ? page : 1;

            var skipCount = (page.Value - 1)*size;

            query = skipCount == 0 ? query.Take(size) : query.Skip(skipCount).Take(size);

            return new StaticPagedList<TEntity>(query.AsEnumerable(), page.Value, size, Count(filter));
        }
    }
}
