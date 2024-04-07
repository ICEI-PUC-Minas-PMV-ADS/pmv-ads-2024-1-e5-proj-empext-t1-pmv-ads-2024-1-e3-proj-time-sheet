using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class VerifyTokenCommandResult : ICommandResult {
        public string Message { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public VerifyTokenCommandStatus Status { get; set; }
    }

    public enum VerifyTokenCommandStatus {
        TokenExpired,
        ValidToken,
        InvalidToken
    }
}
