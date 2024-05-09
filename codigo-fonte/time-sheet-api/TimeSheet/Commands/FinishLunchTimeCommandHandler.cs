using TimeSheet.Models;

namespace TimeSheet.Commands {
    public class FinishLunchTimeCommandHandler : ICommandHandler<FinishLunchTimeCommand, FinishLunchTimeCommandResult> {

        private readonly UserRepository _userRepository;
        private readonly WorkJourneyInProgressRepository _repository;

        public FinishLunchTimeCommandHandler(UserRepository userRepository, WorkJourneyInProgressRepository repository) {
            _userRepository = userRepository;
            _repository = repository;
        }

        public async Task<FinishLunchTimeCommandResult> Handle(FinishLunchTimeCommand command) {
            var User = await _userRepository.FindUser(command.UserId);

            if (User == null) {
                return new FinishLunchTimeCommandResult {
                    Message = "Usuário não encontrado",
                    Status = FinishLunchTimeCommandResultStatus.UserNotFound
                };
            }

            var WorkJourneyInProgress = await _repository.GetWorkJourneyInProgress(command.UserId);

            if (WorkJourneyInProgress == null) {
                return new FinishLunchTimeCommandResult {
                    Message = "Jornada de trabalho não iniciada",
                    Status = FinishLunchTimeCommandResultStatus.WorkJourneyNotStarted
                };
            }

            if (WorkJourneyInProgress.StartLunchTime == default(TimeOnly)) {
                return new FinishLunchTimeCommandResult {
                    Message = "Horário de almoço não iniciado",
                    Status = FinishLunchTimeCommandResultStatus.LunchTimeNotStarted
                };
            }

            if (WorkJourneyInProgress.EndLunchTime != default(TimeOnly)) {
                return new FinishLunchTimeCommandResult {
                    Message = "Horário de almoço já finalizado",
                    Status = FinishLunchTimeCommandResultStatus.LunchTimeAlreadyFinished
                };
            }

            WorkJourneyInProgress.EndLunchTime = DateTime.UtcNow.GetFromBrazilTimezone().ExtractTime();
            WorkJourneyInProgress.Status = WorkJourneyInProgressStatus.LunchTimeFinished;

            await _repository.SaveChanges();

            return new FinishLunchTimeCommandResult {
                Message = "Horário de almoço finalizado",
                Status = FinishLunchTimeCommandResultStatus.LunchTimeFinished
            };
        }
    }
}

