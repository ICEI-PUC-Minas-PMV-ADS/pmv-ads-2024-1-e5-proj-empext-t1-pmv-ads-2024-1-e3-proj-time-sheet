namespace TimeSheet.Commands {
    public class EnableUserCommand : ICommand {
        public Guid UserId { get; set; }
    }
}
