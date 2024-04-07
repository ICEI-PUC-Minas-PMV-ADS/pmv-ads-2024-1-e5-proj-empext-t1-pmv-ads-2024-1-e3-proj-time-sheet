namespace TimeSheet.Commands {
    public class VerifyTokenCommand : ICommand {
        public string CPF { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}
