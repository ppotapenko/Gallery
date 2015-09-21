using System.Web.Mvc;
using Arsis.RekodWMS.Helpers;

namespace Gallery.WEB.Extensions.Attributes
{
    public class RememberUrlAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var httpContext = filterContext.HttpContext;
            if (filterContext.HttpContext.Session != null &&
            httpContext.Request.RequestType == "GET" &&
            !httpContext.Request.IsAjaxRequest())
            {
                filterContext.HttpContext.Session[ConstantHelper.PrevUrlSf] = httpContext.Request.Url;
            }
        }
    }
}