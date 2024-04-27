
namespace TimeSheet.Commands {
    public class StartWorkJourneyCommandHandler
        : ICommandHandler<StartWorkJourneyCommand, StartWorkJourneyCommandResult> {

        private readonly WorkJourneyInProgressRepository _repository;
        private readonly WorkJourneyInProgressBuilder _builder;
        private readonly UserRepository _userRepositoy;
        public StartWorkJourneyCommandHandler(
            WorkJourneyInProgressRepository repository,
            WorkJourneyInProgressBuilder builder,
            UserRepository userRepository) {
            _repository = repository;
            _builder = builder;
        }

        public async Task<StartWorkJourneyCommandResult> Handle(StartWorkJourneyCommand command) {

            var user = await _userRepositoy
                .FindUser(command.UserId);

            if (user is null) {
                return new StartWorkJourneyCommandResult {
                    Message = "Usuário não encontrado.",
                    Status = StartWorkJourneyCommandResultStatus.UserNotFound
                };
            }

            var workJourneyInProgress = await _repository
                .GetWorkJourneyInProgress(command.UserId);

            if (workJourneyInProgress is not null) {
                return new StartWorkJourneyCommandResult {
                    Message = "O Usuário já iniciou a jornada de trabalho.",
                    Status = StartWorkJourneyCommandResultStatus.WorkJourneyAlreadyStarted
                };
            }

            var buildResult = _builder
                .CreateNew()
                .ForUser(command.UserId)
                .StartUsingCurrentTime()
                .Build();

            if (buildResult.IsFailed) {
                return new StartWorkJourneyCommandResult {
                    Message = "Error",
                    Status = StartWorkJourneyCommandResultStatus.Error
                };
            }

            await _repository.StoreWorkJourneyInProgress(buildResult.Value);

            return new StartWorkJourneyCommandResult {
                Message = "Jornada de trabalho iniciada",
                Status = StartWorkJourneyCommandResultStatus.WorkJourneyStarted
            };
        }
    }
}
