namespace TimeSheet.Commands {
    public class UpdateUserCommandHandler
        : ICommandHandler<UpdateUserCommand, UpdateUserCommandResult> {

        private readonly UserRepository _repository;
        private readonly UserBuilder _builder;
        public UpdateUserCommandHandler(UserRepository repository, UserBuilder builder) {
            _repository = repository;
            _builder = builder;
        }

        public async Task<UpdateUserCommandResult> Handle(UpdateUserCommand command) {

            try {

                var user = await _repository
                    .FindUser(command.UserId);

                if (user is null) {
                    return new UpdateUserCommandResult {
                        Message = "Usuário não encontrado",
                        Status = UpdateUserCommandResultStatus.UserNotFound
                    };
                }

                var result = _builder
                    .CreateNew()
                    .WithName(command.Name)
                    .WithCPF(command.CPF)
                    .WithWorkJourney(command.WorkTime, command.LunchTime)
                    .WithRole(command.Role)
                    .Build();

                if (result.IsFailed) {
                    return new UpdateUserCommandResult {
                        Message = result.Errors[0].Message,
                        Status = UpdateUserCommandResultStatus.InvalidUserData
                    };
                }

                user.CPF = result.Value.CPF;
                user.Name = result.Value.Name;
                user.Role = result.Value.Role;
                user.LunchTime = result.Value.LunchTime;
                user.WorkTime = result.Value.WorkTime;

                await _repository.SaveChanges();

                return new UpdateUserCommandResult {
                    Message = "Usuário atualizado.",
                    Status = UpdateUserCommandResultStatus.UserUpdated
                };

            } catch(Exception exc) {
                return new UpdateUserCommandResult {
                    Message = $"{exc.Message} | {exc.GetType()}",
                    Status = UpdateUserCommandResultStatus.Error
                };
            }
        }
    }
}
