using TimeSheet.Builders;
using TimeSheet.Commands;
using TimeSheet.Repositories;
using TimeSheet.Services;

namespace TimeSheet.UnitTests.Commands {
    [TestClass]
    public class CreateUserCommandHandlerTests {

        private readonly CreateUserCommandHandler _handler;
        public CreateUserCommandHandlerTests() {

            var builder = new UserBuilder(new PasswordService());
            var repository = new UserRepository(DevSettings.GetInMemoryContext());

            _handler = new CreateUserCommandHandler(builder, repository);
        }

        [TestMethod]
        public void Handle_InvalidCommandData_ShouldReturnsErrorStatus() {

            var command = new CreateUserCommand {
                FirstName = "a",
                LastName = "b",
                Email = "abacaxi",
                Password = "c",
            };

            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, CreateUserCommandResult.CommandResultStatus.Error);
        }

        [TestMethod]
        public void Handle_UserThatAlreadyExists_ShouldReturnsUserAlreadyExistsStatus() {
            var command = new CreateUserCommand {
                FirstName = "Bruce",
                LastName = "Wayne",
                Email = "batman@mail.com",
                Password = "Teste@123"
            };

            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, CreateUserCommandResult.CommandResultStatus.UserAlreadyExists);
        }

        [TestMethod]
        public void Handle_NewUser_ShouldReturnsUserCreatedStatus() {
            var command = new CreateUserCommand {
                FirstName = "Raul",
                LastName = "Oliveira",
                Email = "raul@mail.com",
                Password = "Teste@123"
            };

            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, CreateUserCommandResult.CommandResultStatus.UserCreated);
        }
    }
}
