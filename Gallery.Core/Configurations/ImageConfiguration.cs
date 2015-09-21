using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Gallery.Core.Domain;

namespace GalleryCore.Configurations
{
    class ImageConfiguration : EntityTypeConfiguration<Image>
    {
        public ImageConfiguration()
        {
            Property(p => p.Name).HasMaxLength(255).IsRequired();
            Property(p => p.Hash).HasMaxLength(36).IsRequired();
            Property(p => p.CreateDate).IsRequired();
        }
    }
}
