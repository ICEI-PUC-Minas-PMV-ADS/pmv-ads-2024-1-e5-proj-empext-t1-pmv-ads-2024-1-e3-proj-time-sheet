namespace TimeSheet.Commands {
    public class DisableUserCommand : ICommand {
        public Guid UserId { get; set; }
        public Guid CurrentId { get; set; }
    }
}
