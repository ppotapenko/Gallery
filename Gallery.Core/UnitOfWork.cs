#region using

using Gallery.Core.Contracts;

#endregion

namespace GalleryCore
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDatabaseFactory _databaseFactory;
        private GalleryContext _dataContext;

        public UnitOfWork(IDatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        protected GalleryContext DataContext
        {
            get { return _dataContext ?? (_dataContext = _databaseFactory.Get()); }
        }

        public void Save()
        {
            DataContext.SaveChanges();
        }
    }
}
