using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class DisableUserCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DisableUserCommandResultStatus Status { get; set; }
    }
    public enum DisableUserCommandResultStatus {
        UserAlreadyDisabled,
        UserNotFound,
        CurrentUser,
        UserDisabled,
        Error
    }
}
