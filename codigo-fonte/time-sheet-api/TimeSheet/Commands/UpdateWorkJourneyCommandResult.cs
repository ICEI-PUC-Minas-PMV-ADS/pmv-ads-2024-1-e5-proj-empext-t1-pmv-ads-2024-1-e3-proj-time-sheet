using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class UpdateWorkJourneyCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UpdateWorkJourneyCommandResultStatus Status { get; set; }
    }
    public enum UpdateWorkJourneyCommandResultStatus {
        WorkJourneyNotFound,
        WorkJourneyUpdated,
        Error
    }
}
