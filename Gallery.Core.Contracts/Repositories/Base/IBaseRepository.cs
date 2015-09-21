#region using

using System;
using System.Linq;
using System.Linq.Expressions;

#endregion

namespace Gallery.Core.Contracts.Repositories.Base
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> All();
        IQueryable<TEntity> AllAsNoTracking();

        IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null);

        TEntity Find(int id);
        TEntity FindAsNoTracking(Expression<Func<TEntity, bool>> predicate);
        TEntity Find(Expression<Func<TEntity, bool>> predicate);

        TEntity Add(TEntity entity);

        TEntity Update(TEntity entity);

        TEntity Remove(int id);
        TEntity Remove(TEntity entity);
        void Remove(Expression<Func<TEntity, bool>> predicate);
    }
}
