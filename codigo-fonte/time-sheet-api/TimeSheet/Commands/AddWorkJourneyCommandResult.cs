using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class AddWorkJourneyCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AddWorkJourneyCommandResultStatus Status { get; set; }
    }
    public enum AddWorkJourneyCommandResultStatus {
        UserNotFound,
        WorkJourneyAdded,
        WorkJourneyAlreadyMarked,
        InvalidData,
        Error
    }
}
