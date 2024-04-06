using TimeSheet.Repositories;

namespace TimeSheet.Commands {
    public class DeleteUserCommandHandler
        : ICommandHandler<DeleteUserCommand, DeleteUserCommandResult> {

        private readonly UserRepository _repository;
        public DeleteUserCommandHandler(UserRepository repository) {
            _repository = repository;
        }

        public async Task<DeleteUserCommandResult> Handle(DeleteUserCommand command) {

            var user = await _repository
                .FindUser(command.UserId);

            if (user is null) {
                return new DeleteUserCommandResult {
                    Message = "Usuário não encontrado.",
                    Status = DeleteUserCommandResultStatus.UserNotFound
                };
            }

            await _repository.DeleteUser(user);

            return new DeleteUserCommandResult {
                Message = "Usuário deletado.",
                Status = DeleteUserCommandResultStatus.UserDeleted
            };
        }
    }
}
