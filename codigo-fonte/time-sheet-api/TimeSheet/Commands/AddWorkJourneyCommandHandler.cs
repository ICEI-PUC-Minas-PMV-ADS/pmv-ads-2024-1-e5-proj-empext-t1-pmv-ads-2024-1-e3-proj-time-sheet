
namespace TimeSheet.Commands {
    public class AddWorkJourneyCommandHandler
        : ICommandHandler<AddWorkJourneyCommand, AddWorkJourneyCommandResult> {

        private readonly WorkJourneyBuilder _builder;
        private readonly WorkJourneyRepository _repository;
        private readonly UserRepository _userRepository;
        public AddWorkJourneyCommandHandler(
            WorkJourneyBuilder builder,
            WorkJourneyRepository repository,
            UserRepository userRepository) {

            _builder = builder;
            _repository = repository;
            _userRepository = userRepository;
        }

        public async Task<AddWorkJourneyCommandResult> Handle(AddWorkJourneyCommand command) {
            
            try {

                if (!(await _userRepository.UserExists(command.UserId))) {
                    return new AddWorkJourneyCommandResult {
                        Message = "Usuário não encontrado",
                        Status = AddWorkJourneyCommandResultStatus.UserNotFound
                    };
                }

                var workJourney = (await _repository
                    .GetWorkJourneys(command.UserId, command.Date.Year, command.Date.Month))
                    .FirstOrDefault(wj => wj.Date == command.Date);

                if (workJourney is not null) {
                    return new AddWorkJourneyCommandResult {
                        Message = "Já existe uma jornada de trabalho no dia informado.",
                        Status = AddWorkJourneyCommandResultStatus.WorkJourneyAlreadyMarked
                    };
                }

                FluentResults.Result<WorkJourney>? workJourneyBuild = null;

                if (command.JourneyType is WorkJourneyType.ExcusedAbsence) {

                    workJourneyBuild = _builder
                    .CreateNew()
                    .WithDate(command.Date)
                    .WithExcusedAbsenceType()
                    .Build();

                } else { 

                    workJourneyBuild = _builder
                    .CreateNew()
                    .WithDate(command.Date)
                    .WithStartTime(command.StartTime)
                    .WithLunchTime(command.StartLunchTime, command.EndLunchTime)
                    .WithEndTime(command.EndTime)
                    .Build();
                }

                if (workJourneyBuild.IsFailed) {
                    return new AddWorkJourneyCommandResult {
                        Message = "Algumas informações não estão válidas.",
                        Status = AddWorkJourneyCommandResultStatus.InvalidData
                    };
                }

                workJourney = workJourneyBuild.Value;
                workJourney.UserId = command.UserId;

                await _repository.StoreWorkJourney(workJourneyBuild.Value);

                return new AddWorkJourneyCommandResult {
                    Message = "Registro adicionado com sucesso.",
                    Status = AddWorkJourneyCommandResultStatus.WorkJourneyAdded
                };

            } catch(Exception exc) {
                return new AddWorkJourneyCommandResult {
                    Message = exc.Message,
                    Status = AddWorkJourneyCommandResultStatus.Error
                };
            }
        }
    }
}
