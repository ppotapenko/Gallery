#region using

using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Gallery.Core.Contracts.Repositories.Base;
using LinqKit;

#endregion

namespace GalleryCore.Repositories.Base
{
    public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly IDbSet<TEntity> DbSet;
        protected readonly GalleryContext DbContext;

        protected BaseRepository(IDatabaseFactory databaseFactory)
        {
            DbSet = databaseFactory.Get().Set<TEntity>();
            DbContext = databaseFactory.Get();
        }

        public virtual IQueryable<TEntity> All()
        {
            return DbSet;
        }

        public virtual IQueryable<TEntity> AllAsNoTracking()
        {
            return DbSet.AsNoTracking();
        }

        public virtual IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
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

            return query;
        }

        public virtual TEntity Find(int id)
        {
            return DbSet.Find(id);
        }

        public virtual TEntity FindAsNoTracking(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.AsNoTracking().FirstOrDefault(predicate);
        }

        public virtual TEntity Find(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.FirstOrDefault(predicate);
        }

        public virtual TEntity Add(TEntity entity)
        {
            DbSet.Add(entity);
            return entity;
        }

        public virtual TEntity Update(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public virtual TEntity Remove(TEntity entity)
        {
            return DbSet.Remove(entity);
        }

        public virtual TEntity Remove(int id)
        {
            var entity = DbSet.Find(id);
            return DbSet.Remove(entity);
        }

        public virtual void Remove(Expression<Func<TEntity, bool>> predicate)
        {
            var entities = Filter(predicate);
            foreach (var entity in entities)
                DbSet.Remove(entity);
        }
    }
}
