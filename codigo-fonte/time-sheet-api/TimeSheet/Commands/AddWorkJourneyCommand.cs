using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class AddWorkJourneyCommand : ICommand {
        public Guid UserId { get; set; }
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly Date { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartTime { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartLunchTime { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly EndLunchTime { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly EndTime { get; set; }
        public WorkJourneyType JourneyType { get; set; }
    }
}
