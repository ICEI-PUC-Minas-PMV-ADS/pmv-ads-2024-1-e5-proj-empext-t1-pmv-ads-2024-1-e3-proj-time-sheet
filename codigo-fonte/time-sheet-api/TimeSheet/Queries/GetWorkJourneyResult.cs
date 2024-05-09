using System.Text.Json.Serialization;

namespace TimeSheet.Queries {
    public class GetWorkJourneyResult : IQueryResult {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly Date { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartTime { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly EndTime { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartLunchTime { get; set; }

        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly EndLunchTime { get; set; }

        public static GetWorkJourneyResult FromWorkJourney(WorkJourney workJourney) {
            return new GetWorkJourneyResult {
                Id = workJourney.Id,
                UserId = workJourney.UserId,
                Date = workJourney.Date,
                StartTime = workJourney.StartTime,
                EndTime = workJourney.EndTime,
                StartLunchTime = workJourney.StartLunchTime,
                EndLunchTime = workJourney.EndLunchTime
            };
        }
    }
}
