namespace TimeSheet.Commands {
    public class EnableUserCommandHandler
        : ICommandHandler<EnableUserCommand, EnableUserCommandResult> {

        private readonly UserRepository _repository;
        public EnableUserCommandHandler(UserRepository repository) {
            _repository = repository;
        }

        public async Task<EnableUserCommandResult> Handle(EnableUserCommand command) {

            try {

                var user = await _repository.FindUser(command.UserId);

                if (user is null) {
                    return new EnableUserCommandResult {
                        Message = "Usuário não encontrado.",
                        Status = EnableUserCommandResultStatus.UserNotFound
                    };
                }

                if (user.Status is Models.UserStatus.Active) {
                    return new EnableUserCommandResult {
                        Message = "Usuário já está ativado.",
                        Status = EnableUserCommandResultStatus.UserAlreadyEnabled
                    };
                }

                user.Status = Models.UserStatus.Active;

                await _repository.SaveChanges();

                return new EnableUserCommandResult {
                    Message = "Usuário ativado com sucesso.",
                    Status = EnableUserCommandResultStatus.UserEnabled
                };

            } catch(Exception exc) {
                return new EnableUserCommandResult {
                    Message = exc.Message,
                    Status = EnableUserCommandResultStatus.Error
                };
            }
        }
    }
}
