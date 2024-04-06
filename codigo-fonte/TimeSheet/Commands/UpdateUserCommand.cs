using TimeSheet.Models;

namespace TimeSheet.Commands {
    public class UpdateUserCommand : ICommand {
        public Guid UserId { get; set; }
        public string Name { get; set; } = null!;
        public string CPF { get; set; } = null!;
        public double TotalTime { get; set; }
        public double LunchTime { get; set; }
        public UserRole Role { get; set; }
    }
}
