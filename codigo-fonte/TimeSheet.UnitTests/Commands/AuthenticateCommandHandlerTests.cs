using TimeSheet.Commands;
using TimeSheet.Repositories;
using TimeSheet.Services;

namespace TimeSheet.UnitTests.Commands {
    [TestClass]
    public class AuthenticateCommandHandlerTests {

        private readonly AuthenticateCommandHandler _handler;
        public AuthenticateCommandHandlerTests() {

            var passwordService = new PasswordService();
            var tokenService = new TokenService(DevSettings.GetAppOptions().JwtBearer);
            var repository = new UserRepository(DevSettings.GetInMemoryContext());

            _handler = new AuthenticateCommandHandler(repository, tokenService, passwordService);
        }

        [TestMethod]
        public void Handle_UserThatNotExists_ShouldReturnsUserNotFoundStatus() {

            var command = new AuthenticateCommand { CPF = "08784013001", Password = "password" };
            var commandResult = _handler.Handle(command).RunSync();


            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, AuthenticateCommandStatus.UserNotFound);
        }

        [TestMethod]
        public void Handle_InvalidPassword_ShouldReturnsUserNotFoundStatus() {

            var command = new AuthenticateCommand { CPF = "04037535033", Password = "password" };
            var commandResult = _handler.Handle(command).RunSync();


            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, AuthenticateCommandStatus.UserNotFound);
        }


        [TestMethod]
        public void Handle_ValidUserData_ShouldReturnsUserAuthenticatedStatus() {

            var command = new AuthenticateCommand { CPF = "04037535033", Password = "Teste@123" };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, AuthenticateCommandStatus.UserAuthenticated);
        }
    }
}
