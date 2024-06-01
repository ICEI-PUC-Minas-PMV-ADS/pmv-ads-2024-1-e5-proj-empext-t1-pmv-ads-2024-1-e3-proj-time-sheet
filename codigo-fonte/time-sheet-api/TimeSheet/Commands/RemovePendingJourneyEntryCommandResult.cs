using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class RemovePendingJourneyEntryCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RemovePendingJourneyEntryCommandResultStatus Status { get; set; }
    }
    public enum RemovePendingJourneyEntryCommandResultStatus {
        PendingJourneyNotFound,
        PendingJourneyRemoved,
        Error
    }
}
