
using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class FinishLunchTimeCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public FinishLunchTimeCommandResultStatus Status { get; set; }
    }
    public enum FinishLunchTimeCommandResultStatus {
        WorkJourneyNotStarted,
        UserNotFound,
        LunchTimeNotStarted,
        LunchTimeAlreadyFinished,
        Error,
        LunchTimeFinished
    }
}