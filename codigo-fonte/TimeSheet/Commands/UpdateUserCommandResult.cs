using FluentResults;
using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class UpdateUserCommandResult : ICommandResult {
        public string Message { get; set; } = null!;
        public List<IError> Errors { get; set; } = new List<IError>();
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UpdateUserCommandResultStatus Status { get; set; }
    }

    public enum UpdateUserCommandResultStatus {
        UserNotFound,
        InvalidUserData,
        UserUpdated,
        Error
    }
}
