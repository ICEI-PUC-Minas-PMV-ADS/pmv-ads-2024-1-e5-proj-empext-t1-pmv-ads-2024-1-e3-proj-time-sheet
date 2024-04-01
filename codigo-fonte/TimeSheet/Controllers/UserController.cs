using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeSheet.Commands;
using TimeSheet.Queries;

namespace TimeSheet.Controllers {

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase {

        private readonly CommandHandler _commandHandler;
        private readonly QueryHandler _queryHandler;
        public UserController(CommandHandler commandHandler, QueryHandler queryHandler) {
            _commandHandler = commandHandler;
            _queryHandler = queryHandler;
        }

        [Authorize]
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

            if (commandResult.Status is not CreateUserCommandResult.CommandResultStatus.UserCreated) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateCommand command) {

            var commandResult = await _commandHandler
                .Handle<AuthenticateCommand, AuthenticateCommandResult>(command);

            if (commandResult.Status is not AuthenticateCommandStatus.UserAuthenticated) {
                return Unauthorized(commandResult);
            }

            return Ok(commandResult);
        }
        [HttpPut]
        [Route("disable")]
        public async Task<IActionResult> DisableUser ([FromBody] DisableUserCommand command)
        {

            var commandResult = await _commandHandler
                .Handle<DisableUserCommand, DisableUserCommandResult>(command);

            if (commandResult.Status is DisableUserCommandResultStatus.UserNotFound)
            {
                return NotFound(commandResult);
            }

            if (commandResult.Status is DisableUserCommandResultStatus.UserAlreadyDisabled) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }
    }
}
