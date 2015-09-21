namespace Gallery.ServiceContracts
{
    public interface IBaseService<TEntity>
    {
        TEntity Find(int id);
        TEntity Add(TEntity entity);
        TEntity Update(TEntity entity);
        TEntity Remove(int id);
    }
}
