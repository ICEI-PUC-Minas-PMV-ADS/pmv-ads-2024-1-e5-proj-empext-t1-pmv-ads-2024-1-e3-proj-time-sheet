using TimeSheet.Repositories;

namespace TimeSheet.Commands
{
    public class DisableUserCommandHandler : ICommandHandler<DisableUserCommand, DisableUserCommandResult>
    {
        private readonly UserRepository _repository;
        public DisableUserCommandHandler(UserRepository repository)

        {
            _repository = repository;
        }

        public async Task<DisableUserCommandResult> Handle(DisableUserCommand command)
        {
            var user = await _repository.FindUser(command.UserId);
             if(user == null)
            {
                return new DisableUserCommandResult { Message = "Usuário Não encontrado", Status = DisableUserCommandResultState.UserNotFound };
            }
            if (user.State == Models.UserStatus.Disable)
            {
                return new DisableUserCommandResult { Message = "Usuário Já desabilitado", Status = DisableUserCommandResultState.UserAlreadyDisable };
            }

            user.State = Models.UserStatus.Disable;
            await _repository.SavedChange();
            return new DisableUserCommandResult { Message = "Usuário desabilitado Com sucesso", Status = DisableUserCommandResultState.Disable };





        }

    }
}
