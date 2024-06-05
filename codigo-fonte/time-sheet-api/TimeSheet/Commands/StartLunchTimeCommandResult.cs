using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class StartLunchTimeCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public StartLunchTimeComandResultStatus Status { get; set; }
    }
    public enum StartLunchTimeComandResultStatus {
        WorkJourneyNotStarted,
        UserNotFound,
        LunchTimeAlreadyStarted,
        Error,
        LunchTimeStarted
    }
}
