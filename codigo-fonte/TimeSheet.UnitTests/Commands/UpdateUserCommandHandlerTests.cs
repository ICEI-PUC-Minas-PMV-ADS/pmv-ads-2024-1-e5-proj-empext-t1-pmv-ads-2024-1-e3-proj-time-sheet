using TimeSheet.Builders;
using TimeSheet.Commands;
using TimeSheet.Repositories;

namespace TimeSheet.UnitTests.Commands {

    [TestClass]
    public class UpdateUserCommandHandlerTests {

        private readonly UpdateUserCommandHandler _handler;
        public UpdateUserCommandHandlerTests() {

            var repository = new UserRepository(DevSettings.GetInMemoryContext());
            var builder = new UserBuilder(new Services.PasswordService());

            _handler = new UpdateUserCommandHandler(repository, builder);
        }


        [TestMethod]
        public void Handle_UserThatNotExists_ReturnsFailureWithUserNotFoundStatus() {

            var command = new UpdateUserCommand {
                UserId = Guid.NewGuid(),
                CPF = "61154646092",
                Name = "Bruce Wayne",
                TotalTime = 8,
                LunchTime = 2,
                Role = Models.UserRole.Administrator
            };
            var commandResult = _handler.Handle(command).RunSync();


            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, UpdateUserCommandResultStatus.UserNotFound);
        }

        [TestMethod]
        public void Handle_InvalidUserData_ReturnsFailureWithInvalidUserDataStatus() {

            var command = new UpdateUserCommand {
                UserId = Guid.Parse("ba56273d-0c8b-4ea6-90ac-691494d1f402"),
                CPF = "11111111111",
                Name = "B",
                TotalTime = 25,
                LunchTime = 27,
                Role = Models.UserRole.Administrator
            };
            var commandResult = _handler.Handle(command).RunSync();


            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, UpdateUserCommandResultStatus.InvalidUserData);
        }

        [TestMethod]
        public void Handle_ValidUserData_ReturnsSuccess() {

            var command = new UpdateUserCommand {
                UserId = Guid.Parse("ba56273d-0c8b-4ea6-90ac-691494d1f402"),
                CPF = "44309223060",
                Name = "Bruce Wayne",
                TotalTime = 10,
                LunchTime = 3,
                Role = Models.UserRole.Employee
            };
            var commandResult = _handler.Handle(command).RunSync();


            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, UpdateUserCommandResultStatus.UserUpdated);
        }
    }
}
