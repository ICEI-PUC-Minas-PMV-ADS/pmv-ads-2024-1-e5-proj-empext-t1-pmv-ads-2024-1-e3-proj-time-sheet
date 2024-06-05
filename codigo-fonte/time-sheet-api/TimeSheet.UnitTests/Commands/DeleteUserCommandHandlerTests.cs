using TimeSheet.Commands;
using TimeSheet.Repositories;

namespace TimeSheet.UnitTests.Commands {

    [TestClass]
    public class DeleteUserCommandHandlerTests {

        private readonly DeleteUserCommandHandler _handler;
        public DeleteUserCommandHandlerTests() {

            var repository = new UserRepository(DevSettings.GetInMemoryContext());

            _handler = new DeleteUserCommandHandler(repository);
        }

        [TestMethod]
        public void Handle_UserThatNotExists_ReturnsFailureWithUserNotFoundStatus() {

            var command = new DeleteUserCommand { UserId = Guid.NewGuid() };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, DeleteUserCommandResultStatus.UserNotFound);
        }

        [TestMethod]
        public void Handle_TryDeleteCurrentUser_ReturnsFailureWithUserNotFoundStatus() {

            var command = new DeleteUserCommand { UserId = Guid.Parse("b6a5e04a-60cd-4a47-960c-1a189ecd221a"), CurrentId = Guid.Parse("b6a5e04a-60cd-4a47-960c-1a189ecd221a") };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, DeleteUserCommandResultStatus.UserNotDeleted);
        }

        [TestMethod]
        public void Handle_ValidUser_ReturnsSuccessWithUserDeletedStatus() {

            var command = new DeleteUserCommand { UserId = Guid.Parse("b6a5e04a-60cd-4a47-960c-1a189ecd221a"), CurrentId = Guid.NewGuid() };
            var commandResult = _handler.Handle(command).RunSync();

            Assert.IsNotNull(commandResult);
            Assert.AreEqual(commandResult.Status, DeleteUserCommandResultStatus.UserDeleted);
        }
    }
}
