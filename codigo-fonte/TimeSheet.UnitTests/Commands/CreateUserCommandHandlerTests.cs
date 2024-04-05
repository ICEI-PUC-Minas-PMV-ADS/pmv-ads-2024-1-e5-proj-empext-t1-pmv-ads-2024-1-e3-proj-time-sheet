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
                Name = "a",
                CPF = "11111111111",
                Password = "c",
                LunchTime = 5,
                TotalTime = .30,
                Role = Models.UserRole.Employee
            };

            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, CreateUserCommandResult.CommandResultStatus.Error);
        }

        [TestMethod]
        public void Handle_UserThatAlreadyExists_ShouldReturnsUserAlreadyExistsStatus() {
            var command = new CreateUserCommand {
                Name = "Bruce Wayne",
                CPF = "04037535033",
                Password = "Teste@123",
                TotalTime = 9,
                LunchTime = 2,
                Role = Models.UserRole.Administrator
            };

            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, CreateUserCommandResult.CommandResultStatus.UserAlreadyExists);
        }

        [TestMethod]
        public void Handle_NewUser_ShouldReturnsUserCreatedStatus() {
            var command = new CreateUserCommand {
                Name = "Raul Oliveira",
                CPF = "36133786043",
                Password = "Teste@123",
                TotalTime = 8,
                LunchTime = 1.30,
                Role = Models.UserRole.Employee
            };

            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, CreateUserCommandResult.CommandResultStatus.UserCreated);
        }
    }
}
