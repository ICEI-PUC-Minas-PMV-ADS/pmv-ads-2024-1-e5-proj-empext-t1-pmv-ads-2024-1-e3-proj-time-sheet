using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TimeSheet.Controllers {

    [ApiController]
    [Route("[controller]")]
    public class PendingController : ControllerBase {

        private readonly CommandHandler _commandHandler;
        private readonly QueryHandler _queryHandler;

        public PendingController(CommandHandler commandHandler, QueryHandler queryHandler) {
            _commandHandler = commandHandler;
            _queryHandler = queryHandler;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("all")]
        public async Task<IActionResult> GetPendingEntries() {

            var query = new GetPendingEntriesQuery();
            var queryResult = await _queryHandler
                .Handle<GetPendingEntriesQuery, GetPendingEntriesQueryResult>(query);

            return Ok(queryResult);
        }

        [HttpPost]
        [Authorize]
        [Route("register")]
        public async Task<IActionResult> RegisterPendingJourney([FromBody] RegisterPendingJourneyEntryCommand command) {

            var commandResult = await _commandHandler
                .Handle<RegisterPendingJourneyEntryCommand, RegisterPendingJourneyEntryCommandResult>(command);

            if (commandResult.Status is not RegisterPendingJourneyEntryCommandResultStatus.JourneyRegistered) {
                return BadRequest(commandResult);
            }


            return Ok(commandResult);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [Route("remove")]
        public async Task<IActionResult> RemovePendingJourney([FromBody] RemovePendingJourneyEntryCommand command) {

            var commandResult = await _commandHandler
                .Handle<RemovePendingJourneyEntryCommand, RemovePendingJourneyEntryCommandResult>(command);

            if (commandResult.Status is not RemovePendingJourneyEntryCommandResultStatus.PendingJourneyRemoved) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }
    }
}
