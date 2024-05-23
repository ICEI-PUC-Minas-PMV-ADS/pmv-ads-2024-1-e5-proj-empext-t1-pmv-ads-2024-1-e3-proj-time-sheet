using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class DeleteUserCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DeleteUserCommandResultStatus Status { get; set; }
    }

    public enum DeleteUserCommandResultStatus {
        UserNotFound,
        UserDeleted,
        UserNotDeleted,
        Error
    }
}
