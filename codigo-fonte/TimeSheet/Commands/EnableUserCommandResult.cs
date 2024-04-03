using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class EnableUserCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public EnableUserCommandResultStatus Status { get; set; }
    }
    public enum EnableUserCommandResultStatus {
        UserAlreadyEnabled,
        UserNotFound,
        UserEnabled,
        Error
    }
}
