using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.WebPages;
using Arsis.RekodRIAS.Web.Helpers;
using Gallery.WEB.Controllers;
using Microsoft.Web.Mvc;

namespace Gallery.WEB.Extensions
{

    public static class HtmlExtensions
    {

        public static string Image<T>(this HtmlHelper helper, Expression<Action<T>> action) where T : ImageController
        {
            string url = helper.BuildUrlFromExpression(action);
            return string.Format("<img src=\"{0}\" />", url);
        }

        public static string Image<T>(this HtmlHelper helper, Expression<Action<T>> action, string title) where T : ImageController
        {
            string url = helper.BuildUrlFromExpression(action);
            return string.Format("<img src=\"{0}\" title=\"{1}\"/>", url, title);
        }

        public static string Image<T>(this HtmlHelper helper, Expression<Action<T>> action, string alt, string title) where T : ImageController
        {
            string url = helper.BuildUrlFromExpression(action);
            return string.Format("<img src=\"{0}\" alt=\"{1}\" title=\"{2}\"/>", url, alt, title);
        }

        public static HelperResult Join<T>(this IEnumerable<T> list, Func<T, HelperResult> template, Func<T, HelperResult> separator)
        {
            var first = true;
            var result = new HelperResult(writer =>
            {
                foreach (var item in list)
                {
                    if (first == false)
                        separator(item).WriteTo(writer);
                    first = false;
                    template(item).WriteTo(writer);
                }
            });

            return result;
        }

        public static string ToHtmlString(this ActionResult result, ControllerContext controllerContext)
        {
            using (var it = new ResponseCaptureHelper(controllerContext.RequestContext.HttpContext.Response))
            {
                result.ExecuteResult(controllerContext);
                return it.ToString();
            }
        }
    }
}