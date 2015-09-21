#region using

using System;

#endregion

namespace Gallery.Core.Domain
{
    public class Image
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Hash { get; set; }
        public DateTime CreateDate { get; set; }
        public string Description { get; set; }
    }
}
