using System.Security.Claims;

namespace TimeSheet.Commands {
    public class DeleteUserCommandHandler
        : ICommandHandler<DeleteUserCommand, DeleteUserCommandResult> {

        private readonly UserRepository _repository;
        public DeleteUserCommandHandler(UserRepository repository) {
            _repository = repository;
        }

        public async Task<DeleteUserCommandResult> Handle(DeleteUserCommand command) {

            try {

                var user = await _repository.FindUser(command.UserId);

                if (user is null) {
                    return new DeleteUserCommandResult {
                        Message = "Usuário não encontrado.",
                        Status = DeleteUserCommandResultStatus.UserNotFound
                    };
                }

                if (command.CurrentId == user.Id) {
                    return new DeleteUserCommandResult {
                        Message = "Usuário não pode deletar o própio usuário",
                        Status = DeleteUserCommandResultStatus.UserNotDeleted
                    };
                }

                await _repository.DeleteUser(user);

                return new DeleteUserCommandResult {
                    Message = "Usuário deletado.",
                    Status = DeleteUserCommandResultStatus.UserDeleted
                };

            } catch (Exception exc) {
                return new DeleteUserCommandResult {
                    Message = $"{exc.Message} | {exc.GetType()}",
                    Status = DeleteUserCommandResultStatus.Error
                };
            }
        }
    }
}
