#region using

using System.Web.Helpers;
using System.Web.Mvc;
using AutoMapper;
using Gallery.Core.Domain;
using Gallery.Core.Domain.SearchCriteria;
using Gallery.Helpers.Models;
using Gallery.ServiceContracts;
using Gallery.WEB.Extensions;
using Gallery.WEB.Extensions.Attributes;
using Gallery.WEB.Helpers;

#endregion

namespace Gallery.WEB.Controllers
{
    public class ImageController : BaseController
    {
        private readonly IImageService imageService;

        public ImageController(IImageService imageService)
        {
            this.imageService = imageService;
        }

        [RememberUrl]
        public ActionResult Images()
        {
            var filter = ApplyReportsFilter();
            ViewBag.Title = "Галерея";

            return View(filter);
        }

        [HttpPost]
        public JsonResult ImageListPartial(PagedFilterViewModel<Image, ImageSearchCriteria> filter)
        {
            var appliedFilter = ApplyReportsFilter(filter);
            return Json(new
            {
                code = 0,
                message = new
                {
                    html = View("ImageListPartial", appliedFilter.Items).ToHtmlString(ControllerContext),
                    hasNext = appliedFilter.Items.HasNextPage
                }
            },
            JsonRequestBehavior.AllowGet);
        }

        [NonAction]
        private PagedFilterViewModel<Image, ImageSearchCriteria> ApplyReportsFilter(
            PagedFilterViewModel<Image, ImageSearchCriteria> filter = null)
        {
            filter = filter ?? new PagedFilterViewModel<Image, ImageSearchCriteria>();
            filter.Column = filter.Column ?? "Name";
            filter.Direction = filter.Direction ?? "Descending";
            var criteria = Mapper.Map<ImageSearchCriteria>(filter.State);

            filter.Items = imageService.PagedFilter(criteria, filter.Column, filter.Direction, filter.Page);
            return filter;
        }

        public ImageResult GetImage(int id, string hash, ImageHelper.ImageSize dimensions)
        {
            var image = imageService.Find(id);

            var imageSize = ImageHelper.GetDefaultImageDimensions(dimensions);

            if (image == null || image.Hash != hash)
            {
                return GetDefaultImage(dimensions);
            }

            var imageFile = ImageHelper.GetImageFilePath(image.Hash, image.CreateDate);

            if (!System.IO.File.Exists(imageFile))
            {
                return GetDefaultImage(dimensions);
            }

            Response.AppendHeader("content-disposition", "attachment; filename=" + image.Name);

            var webImage = new WebImage(imageFile);

            ImageHelper.ResizeImage(ref webImage, imageSize.Width, imageSize.Height);

            return new ImageResult {Image = webImage, ImageFormat = ImageHelper.GetImageFormat(image.Name)};
        }

        public ImageResult GetDefaultImage(ImageHelper.ImageSize dimensions)
        {
            var imageSize = ImageHelper.GetDefaultImageDimensions(dimensions);

            return ImageHelper.GetDefaultImage(imageSize);
        }
    }
}