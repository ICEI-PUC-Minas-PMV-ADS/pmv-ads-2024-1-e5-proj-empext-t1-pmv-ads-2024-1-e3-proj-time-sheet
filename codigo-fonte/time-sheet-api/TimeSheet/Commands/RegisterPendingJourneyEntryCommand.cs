using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class RegisterPendingJourneyEntryCommand : ICommand {
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
    }
}
