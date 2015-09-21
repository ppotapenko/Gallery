using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Gallery.WEB.Extensions.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class AccessAuthorizeAttribute : AuthorizeAttribute
    {
        public AccessAuthorizeAttribute(params object[] roles)
        {
            if (roles.Any(r => r.GetType().BaseType != typeof (Enum)))
                throw new ArgumentException("roles");

            Roles = string.Join(",", roles.Select(r => Enum.GetName(r.GetType(), r)));
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            HttpContextBase context = filterContext.RequestContext.HttpContext;

            if (context.User.Identity.IsAuthenticated)
            {
                context.Response.Redirect("/Error/AccessDenied");
            }
            else
            {
                string extraQueryString = context.Request.RawUrl;
                FormsAuthentication.RedirectToLoginPage(extraQueryString);
            }
        }
    }
}