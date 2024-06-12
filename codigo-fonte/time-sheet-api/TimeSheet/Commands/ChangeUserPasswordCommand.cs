namespace TimeSheet.Commands {
    public class ChangeUserPasswordCommand : ICommand {
        public string CPF { get; set; } = null!;
        public string Password { get; set; } = null!;
        public Guid AuthenticatedUserId { get; set; } = Guid.Empty;
    }
}


