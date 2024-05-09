namespace TimeSheet.Commands {
    public class StartWorkJourneyCommand : ICommand {
        public Guid UserId { get; set; }
    }
}
