
namespace TimeSheet.Commands {
    public class FinishWorkJourneyCommandHandler : ICommandHandler<FinishWorkJourneyCommand, FinishWorkJourneyCommandResult> {

        private readonly UserRepository _userRepository;
        private readonly WorkJourneyInProgressRepository _repository;
        private readonly WorkJourneyRepository _workJourneyRepository;
        private readonly WorkJourneyBuilder _workJorneyBuilder;

        public FinishWorkJourneyCommandHandler(
            WorkJourneyInProgressRepository repository,
            UserRepository userRepository,
            WorkJourneyRepository workJourneyRepository,
            WorkJourneyBuilder workJourneyBuilder) {
            _userRepository = userRepository;
            _repository = repository;
            _workJourneyRepository = workJourneyRepository;
            _workJorneyBuilder = workJourneyBuilder;
        }

        public async Task<FinishWorkJourneyCommandResult> Handle(FinishWorkJourneyCommand command) {

            try {

                var user = await _userRepository.FindUser(command.UserId);

                if (user == null) {
                    return new FinishWorkJourneyCommandResult {
                        Message = "Usuário não encontrado",
                        Status = FinishWorkJourneyCommandResultStatus.UserNotFound
                    };
                }

                var workJourneyInProgress = await _repository.GetWorkJourneyInProgress(command.UserId);

                if (workJourneyInProgress == null) {
                    return new FinishWorkJourneyCommandResult {
                        Message = "Jornada de trabalho não iniciada",
                        Status = FinishWorkJourneyCommandResultStatus.WorkJourneyNotStarted
                    };
                }

                var workJourneyBuild = _workJorneyBuilder
                    .CreateNew()
                    .WithDate(workJourneyInProgress.Date)
                    .WithStartTime(workJourneyInProgress.StartTime)
                    .WithLunchTime(workJourneyInProgress.StartLunchTime, workJourneyInProgress.EndLunchTime)
                    .WithEndTime(DateTime.UtcNow.GetFromBrazilTimezone().ExtractTime())
                    .Build();

                var workJourney = workJourneyBuild.Value;
                workJourney.UserId = command.UserId;

                await _workJourneyRepository.StoreWorkJourney(workJourney);

                workJourneyInProgress.Status = WorkJourneyInProgressStatus.WorkJourneyFinished;
                workJourneyInProgress.EndTime = DateTime.UtcNow.GetFromBrazilTimezone().ExtractTime();

                await _repository.SaveChanges();

                return new FinishWorkJourneyCommandResult {
                    Message = "Jornada de trabalho finalizada",
                    Status = FinishWorkJourneyCommandResultStatus.WorkJourneyFinished
                };

            } catch(Exception exc) {
                return new FinishWorkJourneyCommandResult {
                    Message = $"{exc.Message} | {exc.GetType()}",
                    Status = FinishWorkJourneyCommandResultStatus.Error
                };
            }
        }
    }
}
