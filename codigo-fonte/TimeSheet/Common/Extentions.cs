﻿namespace TimeSheet.Common {
    public static class Extentions {
        public static String convertToString(this Enum eff) {
            return Enum.GetName(eff.GetType(), eff);
        }

        public static EnumType converToEnum<EnumType>(this String enumValue) {
            return (EnumType)Enum.Parse(typeof(EnumType), enumValue);
        }
    }
}
