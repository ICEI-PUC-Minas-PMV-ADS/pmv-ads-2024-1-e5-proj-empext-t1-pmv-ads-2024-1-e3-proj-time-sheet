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
    }
}
