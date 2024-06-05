namespace TimeSheet.Commands {
    public class CreateUserCommand : ICommand {
        public string Name { get; set; } = null!;
        public string CPF { get; set; } = null!;
        public string Password { get; set; } = null!;
        public UserRole Role { get; set; }
        public double WorkTime { get; set; }
        public double LunchTime { get; set; }
    }
}
