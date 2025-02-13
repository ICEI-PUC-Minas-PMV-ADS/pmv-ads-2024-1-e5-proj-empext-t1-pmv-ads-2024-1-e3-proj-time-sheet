﻿using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace TimeSheet.Common.Converters {
    public class TimeOnlyJsonConverter : JsonConverter<TimeOnly> {
        private const string TimeFormat = "HH:mm";

        public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
            return TimeOnly.ParseExact(reader.GetString() ?? string.Empty, TimeFormat, CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options) {
            writer.WriteStringValue(value.ToString(TimeFormat, CultureInfo.InvariantCulture));
        }
    }
}
