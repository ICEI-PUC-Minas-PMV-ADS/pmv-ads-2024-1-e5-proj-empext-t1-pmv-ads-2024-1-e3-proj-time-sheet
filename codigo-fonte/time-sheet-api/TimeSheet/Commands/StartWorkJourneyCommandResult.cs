using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class StartWorkJourneyCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public StartWorkJourneyCommandResultStatus Status { get; set; }
    }
    public enum StartWorkJourneyCommandResultStatus {
        WorkJourneyStarted,
        WorkJourneyAlreadyStarted,
        UserNotFound,
        Error
    }
}
