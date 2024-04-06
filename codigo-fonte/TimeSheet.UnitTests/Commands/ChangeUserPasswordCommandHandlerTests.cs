using TimeSheet.Builders;
using TimeSheet.Commands;
using TimeSheet.Repositories;

namespace TimeSheet.UnitTests.Commands {
    [TestClass]
    public class ChangeUserPasswordCommandHandlerTests {

        private readonly ChangeUserPasswordCommandHandler _handler;
        public ChangeUserPasswordCommandHandlerTests() {

            var respository = new UserRepository(DevSettings.GetInMemoryContext());
            var builder = new UserBuilder(new Services.PasswordService());

            _handler = new ChangeUserPasswordCommandHandler(respository, builder);
        }

        [TestMethod]
        public void Handle_UserThatNotExists_ReturnsFailureWithUserNotFoundStatus() {

            var command = new ChangeUserPasswordCommand { CPF = "12312312342", Password = "Senha123" };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, ChangeUserPasswordCommandResultStatus.UserNotFound);
        }

        [TestMethod]
        public void Handle_InvalidPassword_ReturnsFailureWithInvalidPasswordStatus() {

            var command = new ChangeUserPasswordCommand { CPF = "04037535033", Password = "123123" };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, ChangeUserPasswordCommandResultStatus.InvalidPassword);
        }

        [TestMethod]
        public void Handle_ValidData_ReturnsSuccess() {

            var command = new ChangeUserPasswordCommand { CPF = "04037535033", Password = "Teste@345" };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, ChangeUserPasswordCommandResultStatus.PasswordChanged);
        }
    }
}
