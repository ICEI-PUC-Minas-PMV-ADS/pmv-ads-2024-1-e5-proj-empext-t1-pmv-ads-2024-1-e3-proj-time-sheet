
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
            _userRepositoy = userRepository;
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

            if ((workJourneyInProgress is not null) && workJourneyInProgress.EndTime == default(TimeOnly)) {
                return new StartWorkJourneyCommandResult {
                    Message = "O Usuário já iniciou a jornada de trabalho.",
                    Status = StartWorkJourneyCommandResultStatus.WorkJourneyAlreadyStarted
                };
            } else {
                await _repository.RemoveWorkJourneyInProgress(command.UserId);
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

            workJourneyInProgress = buildResult.Value;
            workJourneyInProgress.Status = WorkJourneyInProgressStatus.WorkJourneyStarted;

            await _repository.StoreWorkJourneyInProgress(workJourneyInProgress);

            return new StartWorkJourneyCommandResult {
                Message = "Jornada de trabalho iniciada",
                Status = StartWorkJourneyCommandResultStatus.WorkJourneyStarted
            };
        }
    }
}
