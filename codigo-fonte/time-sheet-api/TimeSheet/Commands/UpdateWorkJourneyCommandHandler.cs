
namespace TimeSheet.Commands {
    public class UpdateWorkJourneyCommandHandler
        : ICommandHandler<UpdateWorkJourneyCommand, UpdateWorkJourneyCommandResult> {

        private readonly WorkJourneyRepository _repository;
        private readonly WorkJourneyBuilder _builder;
        public UpdateWorkJourneyCommandHandler(
            WorkJourneyRepository repository,
            WorkJourneyBuilder builder) {

            _repository = repository;
            _builder = builder;
        }

        public async Task<UpdateWorkJourneyCommandResult> Handle(UpdateWorkJourneyCommand command) {

            try {

                var workJourney = await _repository
                    .GetWorkJourney(command.WorkJourneyId);

                if (workJourney is null) {
                    return new UpdateWorkJourneyCommandResult {
                        Message = "Jornada de trabalho não encontrada.",
                        Status = UpdateWorkJourneyCommandResultStatus.WorkJourneyNotFound
                    };
                }

                FluentResults.Result<WorkJourney>? workJourneyBuild = null;

                if (command.JourneyType == WorkJourneyType.MedicalCertificate) {

                    workJourneyBuild = _builder
                        .CreateNew()
                        .WithDate(command.Date)
                        .WithMedicalCertificateType()
                        .Build();
                } else {
                    workJourneyBuild = _builder
                        .CreateNew()
                        .WithDate(command.Date)
                        .WithStartTime(command.StartJourney)
                        .WithLunchTime(command.StartLunchTime, command.FinishLunchTime)
                        .WithEndTime(command.FinishJourney)
                        .Build();
                }

                if (workJourneyBuild.IsFailed) {
                    return new UpdateWorkJourneyCommandResult {
                        Message = "Error",
                        Status = UpdateWorkJourneyCommandResultStatus.Error
                    };
                }

                workJourney.Date = workJourneyBuild.Value.Date;
                workJourney.StartTime = workJourneyBuild.Value.StartTime;
                workJourney.StartLunchTime = workJourneyBuild.Value.StartLunchTime;
                workJourney.EndLunchTime = workJourneyBuild.Value.EndLunchTime;
                workJourney.EndTime = workJourneyBuild.Value.EndTime;
                workJourney.JourneyType = workJourneyBuild.Value.JourneyType;

                await _repository.SaveChanges();

                return new UpdateWorkJourneyCommandResult {
                    Message = "Registro alterado com sucesso",
                    Status = UpdateWorkJourneyCommandResultStatus.WorkJourneyUpdated
                };

            } catch (Exception exc) {
                return new UpdateWorkJourneyCommandResult {
                    Message = exc.Message,
                    Status = UpdateWorkJourneyCommandResultStatus.Error
                };
            }
        }
    }
}
