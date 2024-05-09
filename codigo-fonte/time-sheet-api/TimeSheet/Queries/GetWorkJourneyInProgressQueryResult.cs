using System.Text.Json.Serialization;

namespace TimeSheet.Queries {
    public class GetWorkJourneyInProgressQueryResult : IQueryResult {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly Date { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartTime { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartLunchTime { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly EndLunchTime { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public WorkJourneyInProgressStatus Status { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly EndTime { get; set; }
    }
}
