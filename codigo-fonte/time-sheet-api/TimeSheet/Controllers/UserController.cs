using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace TimeSheet.Controllers {

    [ApiController]
    [Authorize(Roles = "Administrator")]
    [Route("[controller]")]
    public class UserController : ControllerBase {

        private readonly CommandHandler _commandHandler;
        private readonly QueryHandler _queryHandler;
        public UserController(CommandHandler commandHandler, QueryHandler queryHandler) {
            _commandHandler = commandHandler;
            _queryHandler = queryHandler;
        }

        [HttpGet]
        [Authorize]
        [Route("authenticated")]
        public async Task<IActionResult> Authenticated() {

            if(!User.Identity.IsAuthenticated) {
                return Unauthorized();
            }

            var userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Sid);

            if (userId is null) {
                return NotFound();
            }

            var query = new GetUserQuery { UserId =  Guid.Parse(userId.Value)};
            var queryResult = await _queryHandler
                .Handle<GetUserQuery, GetUserQueryResult>(query);

            if (queryResult is null) {
                return NotFound();
            }

            return Ok(queryResult);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All() {

            var query = new GetUsersQuery();
            var queryResult = await _queryHandler.Handle<GetUsersQuery, GetUsersQueryResult>(query);

            return Ok(queryResult);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateUserCommand command) {

            var commandResult = await _commandHandler
                .Handle<CreateUserCommand, CreateUserCommandResult>(command);

            if (commandResult.Status is not CommandResultStatus.UserCreated) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateCommand command) {

            var commandResult = await _commandHandler
                .Handle<AuthenticateCommand, AuthenticateCommandResult>(command);

            if (commandResult.Status is not AuthenticateCommandStatus.UserAuthenticated) {
                return Unauthorized(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("verify")]
        public async Task<IActionResult> VerifyToken([FromBody] VerifyTokenCommand command) {

            var commandResult = await _commandHandler
                .Handle<VerifyTokenCommand, VerifyTokenCommandResult>(command);

            if (commandResult.Status is not VerifyTokenCommandStatus.ValidToken) {
                return Unauthorized(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPut]
        [Route("disable")]
        public async Task<IActionResult> DisableUser([FromBody] DisableUserCommand command) {

            var commandResult = await _commandHandler
                .Handle<DisableUserCommand, DisableUserCommandResult>(command);

            if (commandResult.Status is DisableUserCommandResultStatus.UserNotFound) {
                return NotFound(commandResult);
            }

            if (commandResult.Status is DisableUserCommandResultStatus.UserAlreadyDisabled) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPut]
        [Route("enable")]
        public async Task<IActionResult> EnableUser([FromBody] EnableUserCommand command) {

            var commandResult = await _commandHandler
                .Handle<EnableUserCommand, EnableUserCommandResult>(command);

            if (commandResult.Status is EnableUserCommandResultStatus.UserNotFound) {
                return NotFound(commandResult);
            }

            if (commandResult.Status is EnableUserCommandResultStatus.UserAlreadyEnabled) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPut]
        [Authorize]
        [Route("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangeUserPasswordCommand command) {

            var commandResult = await _commandHandler
                .Handle<ChangeUserPasswordCommand, ChangeUserPasswordCommandResult>(command);

            if (commandResult.Status is ChangeUserPasswordCommandResultStatus.UserNotFound) {
                return NotFound(commandResult);
            }

            if (commandResult.Status is ChangeUserPasswordCommandResultStatus.InvalidPassword) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserCommand command) {

            var commandResult = await _commandHandler
                .Handle<UpdateUserCommand, UpdateUserCommandResult>(command);

            if (commandResult.Status is UpdateUserCommandResultStatus.UserNotFound) {
                return NotFound(commandResult);
            }

            if (commandResult.Status is UpdateUserCommandResultStatus.InvalidUserData) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserCommand command) {

            var commandResult = await _commandHandler
                .Handle<DeleteUserCommand, DeleteUserCommandResult>(command);

            if (commandResult.Status is DeleteUserCommandResultStatus.UserNotFound) {
                return NotFound(commandResult);
            }

            return Ok(commandResult);
        }
    }
}
