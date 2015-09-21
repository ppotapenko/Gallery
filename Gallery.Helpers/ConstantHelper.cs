using System;

namespace Arsis.RekodWMS.Helpers
{
    public static class ConstantHelper
    {
        #region Html

        public const string DropDownOptinalLabel = "<...>";
        public const int NumberOfPagesToDispay = 10;
        

        #endregion Html

        #region Other

        public const string UserProfileSf = "UserProfile";
        public const string PrevUrlSf = "PrevUrl";
        public const string Settings = "Settings";
        public const string TimeSpanPattern = @"^([0-9])?[0-9]:([0-5])?[0-9]:([0-5])?[0-9]$";

        #endregion Other

        #region Wms Grid

        public const String WmsGridName = "WmsGrid";
        public const string FilterExpressionSf = "FilterExpression";

        #endregion Wms Grid
    }
}
