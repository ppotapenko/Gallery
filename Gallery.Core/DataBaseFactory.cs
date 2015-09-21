#region using

using System;

#endregion

namespace GalleryCore
{
    public class DataBaseFactory : IDatabaseFactory
    {
        private GalleryContext _dataContext;
        private bool _disposed;

        public GalleryContext Get()
        {
            return _dataContext ?? (_dataContext = new GalleryContext());
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    Get().Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }

    public interface IDatabaseFactory : IDisposable
    {
        GalleryContext Get();
    }
}
