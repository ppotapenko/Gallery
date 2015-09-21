using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Arsis.RekodWMS.Helpers;
using Gallery.WEB.Properties;

namespace Gallery.WEB.Controllers
{
    using Core.Domain;
    using Helpers;
    using Extensions.Attributes;

    [CustomHandleError(View = "CommonError")]
    public class BaseController : Controller
    {

    }
}
