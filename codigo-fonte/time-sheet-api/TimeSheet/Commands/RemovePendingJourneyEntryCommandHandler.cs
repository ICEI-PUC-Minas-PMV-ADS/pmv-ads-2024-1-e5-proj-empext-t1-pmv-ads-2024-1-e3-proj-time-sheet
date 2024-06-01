
namespace TimeSheet.Commands {
    public class RemovePendingJourneyEntryCommandHandler
        : ICommandHandler<RemovePendingJourneyEntryCommand, RemovePendingJourneyEntryCommandResult> {

        private readonly PendingJourneyEntryRepository _repository;
        public RemovePendingJourneyEntryCommandHandler(PendingJourneyEntryRepository repository) {
            _repository = repository;
        }

        public async Task<RemovePendingJourneyEntryCommandResult> Handle(RemovePendingJourneyEntryCommand command) {
            
            try {

                if (!(await _repository.RemovePendingJourneyEntry(command.Id))) {
                    return new RemovePendingJourneyEntryCommandResult {
                        Message = "Registro não encontrado",
                        Status = RemovePendingJourneyEntryCommandResultStatus.PendingJourneyNotFound
                    };
                }

                return new RemovePendingJourneyEntryCommandResult {
                    Message = "Pendência removida.",
                    Status = RemovePendingJourneyEntryCommandResultStatus.PendingJourneyRemoved
                };

            } catch(Exception exc) {
                return new RemovePendingJourneyEntryCommandResult {
                    Message = exc.Message,
                    Status = RemovePendingJourneyEntryCommandResultStatus.Error
                };
            }
        }
    }
}
