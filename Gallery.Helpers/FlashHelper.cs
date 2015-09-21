using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Gallery.Helpers
{
    public enum FlashLevel
    {
        Success = 1,
        Info = 2,
        Warning = 3,
        Error = 4
    }

    public static class FlashHelper
    {
        public static void ModelError(this Controller controller, ModelStateDictionary state)
        {
            var messages = string.Join("<br />", state.Values.SelectMany(v => v.Errors).Select(v => v.ErrorMessage));

            controller.Flash(messages, FlashLevel.Error);
        }

        public static void Flash(this Controller controller, string message, FlashLevel level)
        {
            string key = String.Format("flash-{0}", level.ToString().ToLower());

            var messages = (controller.TempData.ContainsKey(key)) ? (IList<string>)controller.TempData[key] : new List<string>();

            messages.Add(message);

            controller.TempData[key] = messages;
        }

        public static string СssClass(this FlashLevel flashLevel)
        {
            switch (flashLevel)
            {
                case FlashLevel.Success: return "alert-success";
                case FlashLevel.Info: return "alert-info";
                case FlashLevel.Warning: return "alert-warning";
                default: return "alert-error";
            }
        }

        public static string UiKitСssClass(this FlashLevel flashLevel)
        {
            switch (flashLevel)
            {
                case FlashLevel.Success: return "uk-alert-success";
                case FlashLevel.Info: return string.Empty;
                case FlashLevel.Warning: return "uk-alert-warning";
                default: return "uk-alert-dangerr";
            }
        }
    }
}