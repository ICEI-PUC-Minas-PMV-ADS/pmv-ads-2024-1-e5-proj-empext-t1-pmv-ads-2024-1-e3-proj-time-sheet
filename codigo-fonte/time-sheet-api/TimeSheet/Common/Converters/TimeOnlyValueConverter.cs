using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace TimeSheet.Common.Converters {
    public class TimeOnlyValueConverter : ValueConverter<TimeOnly, TimeSpan> {
        public TimeOnlyValueConverter() : base(timeOnly =>
                timeOnly.ToTimeSpan(),
            timeSpan => TimeOnly.FromTimeSpan(timeSpan)) { }
    }
}
