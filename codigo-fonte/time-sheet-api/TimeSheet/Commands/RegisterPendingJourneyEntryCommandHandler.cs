
namespace TimeSheet.Commands {
    public class RegisterPendingJourneyEntryCommandHandler
        : ICommandHandler<RegisterPendingJourneyEntryCommand, RegisterPendingJourneyEntryCommandResult> {

        private readonly WorkJourneyBuilder _builder;
        private readonly PendingJourneyEntryRepository _repository;
        private readonly UserRepository _userRepository;
        public RegisterPendingJourneyEntryCommandHandler(
            PendingJourneyEntryRepository repository,
            UserRepository userRepository,
            WorkJourneyBuilder builder) {

            _repository = repository;
            _userRepository = userRepository;
            _builder = builder;
        }

        public async Task<RegisterPendingJourneyEntryCommandResult> Handle(RegisterPendingJourneyEntryCommand command) {
            
            try {

                if (!(await _userRepository.UserExists(command.UserId))) {
                    return new RegisterPendingJourneyEntryCommandResult {
                        Message = "Usuário não encontrado.",
                        Status = RegisterPendingJourneyEntryCommandResultStatus.UserNotFound
                    };
                }

                var pendingJourneyBuild = _builder
                    .CreateNew()
                    .WithDate(command.Date)
                    .WithStartTime(command.StartTime)
                    .WithLunchTime(command.StartLunchTime, command.EndLunchTime)
                    .WithEndTime(command.EndTime)
                    .Build();
                    
                if (pendingJourneyBuild.IsFailed) {
                    return new RegisterPendingJourneyEntryCommandResult {
                        Message = "Error",
                        Status = RegisterPendingJourneyEntryCommandResultStatus.Error
                    };
                }

                var pendingJourney = new PendingJourneyEntry();
                pendingJourney.Id = Guid.NewGuid();
                pendingJourney.UserId = command.UserId;
                pendingJourney.Date = pendingJourneyBuild.Value.Date;
                pendingJourney.StartTime = pendingJourneyBuild.Value.StartTime;
                pendingJourney.StartLunchTime = pendingJourneyBuild.Value.StartLunchTime;
                pendingJourney.EndLunchTime = pendingJourneyBuild.Value.EndLunchTime;
                pendingJourney.EndTime = pendingJourneyBuild.Value.EndTime;

                await _repository.RegisterPendingJourneyEntry(pendingJourney);

                return new RegisterPendingJourneyEntryCommandResult {
                    Message = "Jornada pendente registrada.",
                    Status = RegisterPendingJourneyEntryCommandResultStatus.JourneyRegistered
                };

            } catch(Exception exc) {
                return new RegisterPendingJourneyEntryCommandResult {
                    Message = exc.Message,
                    Status = RegisterPendingJourneyEntryCommandResultStatus.Error
                };
            }
        }
    }
}
