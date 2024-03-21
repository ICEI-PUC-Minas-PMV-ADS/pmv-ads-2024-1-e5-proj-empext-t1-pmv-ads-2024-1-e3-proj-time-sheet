namespace TimeSheet.Common.CQRS {
    public interface ICommandHandler<TCommand, TCommandResult>
        where TCommand : ICommand
        where TCommandResult : ICommandResult {
        Task<TCommandResult> Handle(TCommand command);
    }
}
