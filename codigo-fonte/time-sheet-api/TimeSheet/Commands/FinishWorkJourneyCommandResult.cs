using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class FinishWorkJourneyCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public FinishWorkJourneyCommandResultStatus Status { get; set; }
    }

    public enum FinishWorkJourneyCommandResultStatus { 
        WorkJourneyFinished,
        WorkJourneyNotStarted,
        UserNotFound,
        Error,
    }
}
