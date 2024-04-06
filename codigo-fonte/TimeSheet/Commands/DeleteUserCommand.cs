namespace TimeSheet.Commands {
    public class DeleteUserCommand : ICommand {
        public Guid UserId { get; set; }
    }
}
