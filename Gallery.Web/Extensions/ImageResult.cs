#region using

using System;
using System.Drawing.Imaging;
using System.Web.Helpers;
using System.Web.Mvc;

#endregion

namespace Gallery.WEB.Extensions
{
    public class ImageResult : ActionResult
    {
        public WebImage Image { get; set; }

        public ImageFormat ImageFormat { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            if (Image == null || ImageFormat == null)
            {
                throw new ArgumentNullException();
            }

            context.HttpContext.Response.Clear();

            if (ImageFormat.Equals(ImageFormat.Jpeg)) context.HttpContext.Response.ContentType = "image/jpeg";
            else if (ImageFormat.Equals(ImageFormat.Png)) context.HttpContext.Response.ContentType = "image/png";
            else if (ImageFormat.Equals(ImageFormat.Bmp)) context.HttpContext.Response.ContentType = "image/bmp";
            else if (ImageFormat.Equals(ImageFormat.Gif)) context.HttpContext.Response.ContentType = "image/gif";
            else if (ImageFormat.Equals(ImageFormat.Icon))
                context.HttpContext.Response.ContentType = "image/vnd.microsoft.icon";
            else if (ImageFormat.Equals(ImageFormat.Tiff)) context.HttpContext.Response.ContentType = "image/tiff";
            else if (ImageFormat.Equals(ImageFormat.Wmf)) context.HttpContext.Response.ContentType = "image/wmf";
            // Render Image
            Image.Write();
        }
    }
}