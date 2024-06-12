using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class ChangeUserPasswordCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ChangeUserPasswordCommandResultStatus Status { get; set; }
    }

    public enum ChangeUserPasswordCommandResultStatus {
        UserNotFound,
        InvalidPassword,
        MasterUserPassCannotBeChanged,
        PasswordChanged,
        Error
    }
}
