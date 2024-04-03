namespace TimeSheet.Commands {
    public class CreateUserCommand : ICommand {
        public string Name { get; set; } = null!;
        public string CPF { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
