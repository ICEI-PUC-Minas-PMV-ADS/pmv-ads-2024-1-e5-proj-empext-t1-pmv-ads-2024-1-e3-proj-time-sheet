using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class RegisterPendingJourneyEntryCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RegisterPendingJourneyEntryCommandResultStatus Status { get; set; }
    }

    public enum RegisterPendingJourneyEntryCommandResultStatus {
        UserNotFound,
        JourneyRegistered,
        Error
    }
}
