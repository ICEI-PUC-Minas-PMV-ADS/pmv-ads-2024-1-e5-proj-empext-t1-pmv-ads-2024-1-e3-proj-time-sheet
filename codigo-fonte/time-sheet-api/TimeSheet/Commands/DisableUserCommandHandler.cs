using System.Security.Claims;

namespace TimeSheet.Commands {
    public class DisableUserCommandHandler : ICommandHandler<DisableUserCommand, DisableUserCommandResult> {
        private readonly UserRepository _repository;
        public DisableUserCommandHandler(UserRepository repository) {
            _repository = repository;
        }

        public async Task<DisableUserCommandResult> Handle(DisableUserCommand command) {

            var user = await _repository.FindUser(command.UserId);
            var currenteid = Guid.Parse(ClaimsPrincipal.Current.Claims.First(c => c.Type == ClaimTypes.Sid).Value);
            if (user == null) {
                return new DisableUserCommandResult {
                    Message = "Usuário não encontrado.",
                    Status = DisableUserCommandResultStatus.UserNotFound
                };
            }
            if (currenteid == user.Id)
            {
                return new DisableUserCommandResult
                {
                    Message = "Impossível desabilitar o próprio usuário",
                    Status = DisableUserCommandResultStatus.UserWithSameId
                };
            }

            if (user.Status == Models.UserStatus.Inactive) {
                return new DisableUserCommandResult {
                    Message = "Usuário já desabilitado.",
                    Status = DisableUserCommandResultStatus.UserAlreadyDisabled
                };
            }

            user.Status = Models.UserStatus.Inactive;

            await _repository.SaveChanges();

            return new DisableUserCommandResult {
                Message = "Usuário desabilitado com sucesso.",
                Status = DisableUserCommandResultStatus.UserDisabled
            };
        }
    }
}
