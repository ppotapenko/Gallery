using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gallery.Core.Contracts.Repositories;
using Gallery.Core.Domain;
using GalleryCore.Repositories.Base;

namespace GalleryCore.Repositories
{
    public class ImageRepository : BasePagingRepository<Image>, IImageRepository
    {
        public ImageRepository(IDatabaseFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
