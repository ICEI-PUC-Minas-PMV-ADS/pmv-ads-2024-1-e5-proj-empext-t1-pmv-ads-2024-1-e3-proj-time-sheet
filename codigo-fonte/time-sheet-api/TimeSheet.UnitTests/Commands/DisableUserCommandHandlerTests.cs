using TimeSheet.Commands;
using TimeSheet.Repositories;

namespace TimeSheet.UnitTests.Commands {
    [TestClass]
    public class DisableUserCommandHandlerTests {

        private readonly DisableUserCommandHandler _handler;
        public DisableUserCommandHandlerTests() {

            var context = DevSettings.GetInMemoryContext();
            var repository = new UserRepository(context);

            _handler = new DisableUserCommandHandler(repository);
        }

        [TestMethod]
        public void Handle_UserThatNotExists_ReturnsFailureWithUserNotFoundStatus() {
            
            var command = new DisableUserCommand { UserId = Guid.NewGuid(), CurrentId = Guid.NewGuid() };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, DisableUserCommandResultStatus.UserNotFound);
        }

        [TestMethod]
        public void Handle_CurrentUser_ReturnsFailureWithCurrentUserStatus() {

            var command = new DisableUserCommand { UserId = Guid.Parse("ba56273d-0c8b-4ea6-90ac-691494d1f402"), CurrentId = Guid.Parse("ba56273d-0c8b-4ea6-90ac-691494d1f402") };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, DisableUserCommandResultStatus.CurrentUser);
        }

        [TestMethod]
        public void Handle_UserAlreadyDisabled_ReturnsFailureWithUserAlreadyDisabledStatus() {

            var command = new DisableUserCommand { UserId = Guid.Parse("b6a5e02a-40cd-4a47-960c-1a189ecd821a"), CurrentId = Guid.NewGuid() };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, DisableUserCommandResultStatus.UserAlreadyDisabled);
        }

        [TestMethod]
        public void Handle_UserActived_ReturnsFailureWithUserDisabledStatus() {

            var command = new DisableUserCommand { UserId = Guid.Parse("ba56273d-0c8b-4ea6-90ac-691494d1f402"), CurrentId = Guid.NewGuid() };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, DisableUserCommandResultStatus.UserDisabled);
        }
    }
}
