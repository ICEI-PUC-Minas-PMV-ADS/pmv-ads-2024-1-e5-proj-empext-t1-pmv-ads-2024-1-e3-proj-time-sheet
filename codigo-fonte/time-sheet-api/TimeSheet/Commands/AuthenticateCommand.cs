namespace TimeSheet.Commands {
    public class AuthenticateCommand : ICommand {
        public string CPF { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
