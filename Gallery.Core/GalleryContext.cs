#region using

using System.Data.Common;
using System.Data.Entity;
using Gallery.Core.Domain;
using System.Net.Mime;
using GalleryCore.Configurations;

#endregion

namespace GalleryCore
{
    public class GalleryContext : DbContext
    {
        public GalleryContext() : base("name=GalleryContext")
        {
        }

        public GalleryContext(DbConnection connection)
            : base(connection, true)
        {
        }

        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ImageConfiguration());
        }
    }
}
