#region using

using System;
using System.Data.Entity.Validation;
using Gallery.Core.Contracts;
using Gallery.Core.Contracts.Repositories.Base;
using Gallery.ServiceContracts;

#endregion

namespace Gallery.Service
{
    public abstract class BaseService<TEntity, TRepo> : IBaseService<TEntity>
        where TEntity : class
        where TRepo : IBaseRepository<TEntity>
    {
        protected readonly TRepo Repo;
        protected readonly IUnitOfWork UnitOfWork;

        protected BaseService(TRepo repo, IUnitOfWork unitOfWork)
        {
            Repo = repo;
            UnitOfWork = unitOfWork;
        }

        public virtual TEntity Find(int id)
        {
            return Repo.Find(id);
        }

        public virtual TEntity Add(TEntity entity)
        {
            var addedEntity = Repo.Add(entity);
            try
            {
                UnitOfWork.Save();

            }
            catch (DbEntityValidationException exception)
            {   
                
                throw;
            }
           
            return addedEntity;
        }

        public virtual TEntity Update(TEntity entity)
        {
            var updatedEntity = Repo.Update(entity);
            UnitOfWork.Save();
            return updatedEntity;
        }

        public virtual TEntity Remove(int id)
        {
            var entity = Repo.Remove(id);
            UnitOfWork.Save();
            return entity;
        }
    }
}
