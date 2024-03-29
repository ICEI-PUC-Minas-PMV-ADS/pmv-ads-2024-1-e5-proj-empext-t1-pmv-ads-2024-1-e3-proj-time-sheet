using System.Text.Json.Serialization;

namespace TimeSheet.Commands
{
    public class DisableUserCommandResult : ICommandResult
    {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DisableUserCommandResultState Status { get; set; }
        

    }
    public enum DisableUserCommandResultState
    {
        UserAlreadyDisable,
        UserNotFound,
        Disable,
        Error

    }
}
