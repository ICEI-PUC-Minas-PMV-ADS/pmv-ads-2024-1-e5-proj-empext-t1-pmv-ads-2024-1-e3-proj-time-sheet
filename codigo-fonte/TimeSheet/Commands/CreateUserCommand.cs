namespace TimeSheet.Commands {
    public class CreateUserCommand : ICommand {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public double TotalTime { get; set; }
        public double LunchTime { get; set; }
    }
}
