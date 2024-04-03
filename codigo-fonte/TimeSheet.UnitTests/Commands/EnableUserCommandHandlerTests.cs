using TimeSheet.Commands;
using TimeSheet.Repositories;

namespace TimeSheet.UnitTests.Commands {
    [TestClass]
    public class EnableUserCommandHandlerTests {

        private readonly EnableUserCommandHandler _handler;
        public EnableUserCommandHandlerTests() {

            var context = DevSettings.GetInMemoryContext();
            var repository = new UserRepository(context);

            _handler = new EnableUserCommandHandler(repository);
        }

        [TestMethod]
        public void Handle_UserThatNotExists_ShouldReturnsUserNotFoundStatus() {
            
            var command = new EnableUserCommand { UserId = Guid.NewGuid() };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, EnableUserCommandResultStatus.UserNotFound);
        }

        [TestMethod]
        public void Handle_UserAlreadyEnabled_ShouldReturnsUserAlreadyEnabledStatus() {

            var command = new EnableUserCommand { UserId = Guid.Parse("ba56273d-0c8b-4ea6-90ac-691494d1f402") };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, EnableUserCommandResultStatus.UserAlreadyEnabled);
        }

        [TestMethod]
        public void Handle_UserInactived_ShouldReturnsUserEnabledStatus() {

            var command = new EnableUserCommand { UserId = Guid.Parse("b6a5e02a-40cd-4a47-960c-1a189ecd821a") };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, EnableUserCommandResultStatus.UserEnabled);
        }
    }
}
