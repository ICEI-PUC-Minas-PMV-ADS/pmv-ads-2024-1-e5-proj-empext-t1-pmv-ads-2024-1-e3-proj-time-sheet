namespace TimeSheet.Common {
    public static class Extentions {
        public static string convertToString(this Enum eff) {
            return Enum.GetName(eff.GetType(), eff) ?? string.Empty;
        }

        public static EnumType converToEnum<EnumType>(this String enumValue) {
            return (EnumType)Enum.Parse(typeof(EnumType), enumValue);
        }

        public static TimeOnly ExtractTime(this DateTime dateTime) {
            return new TimeOnly(dateTime.Hour, dateTime.Minute, dateTime.Second, dateTime.Millisecond);
        }

        public static DateOnly ExtractDate(this DateTime dateTime) {
            return new DateOnly(dateTime.Year, dateTime.Month, dateTime.Day);
        }
    }
}
