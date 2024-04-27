namespace TimeSheet.Commands {
    public class UpdateUserCommand : ICommand {
        public Guid UserId { get; set; }
        public string Name { get; set; } = null!;
        public string CPF { get; set; } = null!;
        public UserRole Role { get; set; }
        public double TotalTime { get; set; }
        public double LunchTime { get; set; }
    }
}
