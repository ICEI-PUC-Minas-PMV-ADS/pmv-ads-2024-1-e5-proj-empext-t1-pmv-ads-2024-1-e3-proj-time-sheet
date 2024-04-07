
using TimeSheet.Services;

namespace TimeSheet.Commands {
    public class VerifyTokenCommandHandler
        : ICommandHandler<VerifyTokenCommand, VerifyTokenCommandResult> {

        private readonly TokenService _tokenService;
        public VerifyTokenCommandHandler(TokenService tokenService) {
            _tokenService = tokenService;
        }
        public async Task<VerifyTokenCommandResult> Handle(VerifyTokenCommand command) {

            return await Task.Run<VerifyTokenCommandResult>(() => {

                if (string.IsNullOrEmpty(command.Token)) {
                    return new VerifyTokenCommandResult {
                        Message = "Token inválido",
                        Status = VerifyTokenCommandStatus.InvalidToken
                    };
                }

                var cpf = command.CPF;

                CPFValidations.Normalize(ref cpf);

                var isValid = _tokenService.ValidateToken(cpf, command.Token);

                if (isValid is false) {
                    return new VerifyTokenCommandResult {
                        Message = "Token inválido",
                        Status = VerifyTokenCommandStatus.InvalidToken
                    };
                }

                var isExpired = _tokenService.IsExpiredToken(command.Token);

                if (isExpired) {
                    return new VerifyTokenCommandResult {
                        Message = "Token expirado",
                        Status = VerifyTokenCommandStatus.TokenExpired
                    };
                }

                return new VerifyTokenCommandResult {
                    Message = "Token válido",
                    Status = VerifyTokenCommandStatus.ValidToken
                };
            });
        }
    }
}
