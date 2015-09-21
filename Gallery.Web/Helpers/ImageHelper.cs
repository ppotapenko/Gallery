#region using

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.Helpers;
using System.Web.Hosting;
using Gallery.ServiceContracts;
using Gallery.WEB.Extensions;
using Image = Gallery.Core.Domain.Image;

#endregion

namespace Gallery.WEB.Helpers
{
    public static class ImageHelper

    {
        public class ImageDimensions
        {
            public int Width { get; set; }

            public int Height { get; set; }
        }

        public enum ImageSize
        {
            Small,
            Medium,
            Large,
            LogoProfile,
            LogoReport,
        }

        public static void ImageUpload(IImageService imageService)
        {
            var resorce = HostingEnvironment.ApplicationPhysicalPath + GetDefaultImageRootFolder() + "\\data";
            var files = Directory.GetFiles(resorce);
            foreach (var file in files)
            {
                var hash = (Guid.NewGuid()).ToString();
                var regDate = DateTime.Now;
                var images = new Image
                {
                    Name = new FileInfo(file).Name,
                    Hash = hash,
                    CreateDate = regDate
                };
                imageService.Add(images);
                File.Copy(file, GetImageFilePath(hash, regDate));
            }
        }

        private static string GetDefaultImageRootFolder()
        {
            return ConfigurationManager.AppSettings["ImagesFolderName"];
        }

        public static string GetImageFilePath(string hash, DateTime date)
        {
            var rootFolder = HostingEnvironment.ApplicationPhysicalPath + GetDefaultImageRootFolder() + "\\";

            var dateFolders = string.Concat(Convert.ToString(date.Year), "\\", Convert.ToString(date.Month));

            var path = rootFolder + dateFolders;

            if (!Directory.Exists(path)) Directory.CreateDirectory(path);

            return string.Concat(path, "\\", hash);
        }

        public static void ResizeImage(ref WebImage webImage, int maxWidth, int maxHeight)
        {
            var transparencyFormats = new Dictionary<string, ImageFormat>(StringComparer.OrdinalIgnoreCase)
            {
                {"png", ImageFormat.Png},
                {"gif", ImageFormat.Gif}
            };

            ImageFormat format;

            float originalWidth = webImage.Width;
            float originalHight = webImage.Height;
            var hw = originalHight/originalWidth;
            var wh = originalWidth/originalHight;
            if (webImage.Width > webImage.Height)
            {
                originalWidth = maxWidth;
                originalHight = originalWidth*hw;

                if (originalHight > maxHeight)
                {
                    originalHight = maxHeight;
                    originalWidth = originalHight*wh;
                }
            }
            else
            {
                originalHight = maxHeight;
                originalWidth = originalHight*wh;
                if (webImage.Width > webImage.Height)
                {
                    originalWidth = maxWidth;
                    originalHight = originalWidth*hw;
                }
            }

            if (transparencyFormats.TryGetValue(webImage.ImageFormat.ToLower(), out format))
            {
                using (var resizedImage = new Bitmap((int) originalWidth, (int) originalHight))
                {
                    using (var source = new Bitmap(new MemoryStream(webImage.GetBytes())))
                    {
                        using (var g = Graphics.FromImage(resizedImage))
                        {
                            g.SmoothingMode = SmoothingMode.AntiAlias;
                            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            g.DrawImage(source, 0, 0, (int) originalWidth, (int) originalHight);
                        }
                    }

                    using (var ms = new MemoryStream())
                    {
                        resizedImage.Save(ms, format);
                        webImage = new WebImage(ms.ToArray());
                    }
                }
            }
            else
            {
                webImage.Resize((int) originalWidth, (int) originalHight, false, true);
            }
        }

        public static ImageDimensions GetDefaultImageDimensions(ImageSize type)
        {
            switch (type)
            {
                case ImageSize.Small:
                    return new ImageDimensions
                    {
                        Height = 200,
                        Width = 400
                    };

                default:
                    return new ImageDimensions();
            }
        }

        public static ImageResult GetDefaultImage(ImageDimensions dimensions)
        {
            HttpContext.Current.Response.AppendHeader("content-disposition", "attachment; filename = default");

            var defaultImage = new WebImage("~/Content/img/default.png");

            ResizeImage(ref defaultImage, dimensions.Width, dimensions.Height);

            return new ImageResult {Image = defaultImage, ImageFormat = GetImageFormat(defaultImage.FileName)};
        }

        public static ImageFormat GetImageFormat(string fileName)
        {
            var extension = Path.GetExtension(fileName);

            switch (extension)
            {
                case ".jpg":
                    return ImageFormat.Jpeg;
                case "jpeg":
                    return ImageFormat.Jpeg;
                case "png":
                    return ImageFormat.Png;
                case ".gif":
                    return ImageFormat.Gif;
                case ".bmp":
                    return ImageFormat.Bmp;
                case ".icon":
                    return ImageFormat.Icon;
                case ".tiff":
                    return ImageFormat.Tiff;
                default:
                    return ImageFormat.Jpeg;
            }
        }
    }
}