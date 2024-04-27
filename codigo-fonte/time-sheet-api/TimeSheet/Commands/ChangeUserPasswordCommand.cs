namespace TimeSheet.Commands {
    public class ChangeUserPasswordCommand : ICommand {
        public string CPF { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}


