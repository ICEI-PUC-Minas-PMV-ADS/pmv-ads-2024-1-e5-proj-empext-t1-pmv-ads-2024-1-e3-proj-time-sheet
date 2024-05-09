using TimeSheet.Models;

namespace TimeSheet.Commands {
    public class StartLunchTimeCommandHandler : ICommandHandler<StartLunchTimeCommand, StartLunchTimeCommandResult> {

        private readonly UserRepository _userRepository;
        private readonly WorkJourneyInProgressRepository _repository;
        public StartLunchTimeCommandHandler(
            UserRepository userRepository,
            WorkJourneyInProgressRepository repository) {
            _userRepository = userRepository;
            _repository = repository;
        }

        public async Task<StartLunchTimeCommandResult> Handle(StartLunchTimeCommand command) {
            var User = await _userRepository.FindUser(command.UserId);

            if (User == null) {
                return new StartLunchTimeCommandResult {
                    Message = "Usuário não encontrado",
                    Status = StartLunchTimeComandResultStatus.UserNotFound
                };
            }

            var WorkJourneyInProgress = await _repository.GetWorkJourneyInProgress(command.UserId);

            if (WorkJourneyInProgress == null) {
                return new StartLunchTimeCommandResult {
                    Message = "Jornada de trabalho não iniciada",
                    Status = StartLunchTimeComandResultStatus.WorkJourneyNotStarted
                };
            }

            if (WorkJourneyInProgress.StartLunchTime != default(TimeOnly)) {
                return new StartLunchTimeCommandResult {
                    Message = "Horário de almoço já iniciado",
                    Status = StartLunchTimeComandResultStatus.LunchTimeAlreadyStarted
                };
            }

            WorkJourneyInProgress.StartLunchTime = DateTime.UtcNow.GetFromBrazilTimezone().ExtractTime();
            WorkJourneyInProgress.Status = WorkJourneyInProgressStatus.LunchTimeStarted;

            await _repository.SaveChanges();

            return new StartLunchTimeCommandResult {
                Message = "Horário de almoço iniciado",
                Status = StartLunchTimeComandResultStatus.LunchTimeStarted
            };
        }
    }
}
