using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace TimeSheet.Common.Converters {
    public class DateOnlyValueConverter : ValueConverter<DateOnly, DateTime> {
        public DateOnlyValueConverter()
            : base(dateOnly =>
                    dateOnly.ToDateTime(TimeOnly.MinValue),
                dateTime => DateOnly.FromDateTime(dateTime)) { }
    }
}
