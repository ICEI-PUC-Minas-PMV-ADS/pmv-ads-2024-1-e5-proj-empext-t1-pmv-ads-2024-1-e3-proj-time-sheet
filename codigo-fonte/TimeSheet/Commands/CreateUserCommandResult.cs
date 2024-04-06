using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class CreateUserCommandResult : ICommandResult {
        public Guid Id { get; set; }
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public CommandResultStatus Status { get; set; }
    }
    public enum CommandResultStatus {
        UserCreated,
        UserAlreadyExists,
        InvalidUserData,
        Error
    }
}
