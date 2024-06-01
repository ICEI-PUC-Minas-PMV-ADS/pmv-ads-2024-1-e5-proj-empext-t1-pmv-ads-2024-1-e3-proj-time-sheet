using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Claims;

namespace TimeSheet.Controllers {

    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class WorkJourneyController : ControllerBase {

        private readonly CommandHandler _commandHandler;
        private readonly QueryHandler _queryHandler;
        public WorkJourneyController(CommandHandler commandHandler, QueryHandler queryHandler) {
            _commandHandler = commandHandler;
            _queryHandler = queryHandler;
        }

        [HttpGet]
        [Route("journeys/{year}/{month}")]
        public async Task<IActionResult> GetWorkJourneys(int year, int month) {

            var userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Sid);

            if (userId is null) {
                return NotFound();
            }

            var query = new GetWorkJourneysQuery { UserId = Guid.Parse(userId.Value), Year = year, Month = month  };
            var queryResult = await _queryHandler.
                Handle<GetWorkJourneysQuery, GetWorkJourneysQueryResult>(query);

            return Ok(queryResult);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("all/{year}/{month}")]
        public async Task<IActionResult> GetAllWorkJourneys(int year, int month, [FromQuery] bool includeInactive) {

            var query = new GetAllWorkJourneysQuery { IncludeInactiveUsers = includeInactive, Month = month, Year = year };
            var queryResult = await _queryHandler.
                Handle<GetAllWorkJourneysQuery, GetAllWorkJourneysQueryResult>(query);

            return Ok(queryResult);
        }

        [HttpGet]
        [Route("inprogress")]
        public async Task<IActionResult> GetWorkJourneyInProgress() {

            var userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Sid);

            if (userId is null) {
                return NotFound();
            }

            var query = new GetWorkJourneyInProgressQuery { UserId = Guid.Parse(userId.Value) };
            var queryResult = await _queryHandler
                .Handle<GetWorkJourneyInProgressQuery, GetWorkJourneyInProgressQueryResult>(query);

            if (queryResult is null) {
                return NotFound();
            }

            return Ok(queryResult);
        }

        [HttpPost]
        [Route("startWorkJourney")]
        public async Task<IActionResult> StartWorkJourney() {

            var userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Sid);

            if (userId is null) {
                return NotFound();
            }

            var command = new StartWorkJourneyCommand { UserId = Guid.Parse(userId.Value) };
            var commandResult = await _commandHandler
                .Handle<StartWorkJourneyCommand, StartWorkJourneyCommandResult>(command);

            if (commandResult.Status is StartWorkJourneyCommandResultStatus.UserNotFound) {
                return NotFound(commandResult);
            }

            if (commandResult.Status is StartWorkJourneyCommandResultStatus.WorkJourneyAlreadyStarted) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [Route("startLunchTime")]
        public async Task<IActionResult> StartLunchTime() {

            var userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Sid);

            if (userId is null) {
                return NotFound();
            }

            var command = new StartLunchTimeCommand { UserId = Guid.Parse(userId.Value) };
            var commandResult = await _commandHandler
                .Handle<StartLunchTimeCommand, StartLunchTimeCommandResult>(command);

            if (commandResult.Status is not StartLunchTimeComandResultStatus.LunchTimeStarted) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [Route("finishLunchTime")]
        public async Task<IActionResult> FinishLunchTime() {

            var userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Sid);

            if (userId is null) {
                return NotFound();
            }

            var command = new FinishLunchTimeCommand { UserId = Guid.Parse(userId.Value) };
            var commandResult = await _commandHandler
                .Handle<FinishLunchTimeCommand, FinishLunchTimeCommandResult>(command);

            if (commandResult.Status is not FinishLunchTimeCommandResultStatus.LunchTimeFinished) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [Route("finishWorkJourney")]
        public async Task<IActionResult> FinishWorkJourney() {

            var userId = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Sid);

            if (userId is null) {
                return NotFound();
            }

            var command = new FinishWorkJourneyCommand { UserId = Guid.Parse(userId.Value) };
            var commandResult = await _commandHandler
                .Handle<FinishWorkJourneyCommand, FinishWorkJourneyCommandResult>(command);

            if (commandResult.Status is FinishWorkJourneyCommandResultStatus.UserNotFound) {
                return NotFound(commandResult);
            }

            if (commandResult.Status is FinishWorkJourneyCommandResultStatus.WorkJourneyNotStarted) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [Route("addjourney")]
        public async Task<IActionResult> AddNewJourney([FromBody] AddWorkJourneyCommand command) {

            var commandResult = await _commandHandler
                .Handle<AddWorkJourneyCommand, AddWorkJourneyCommandResult>(command);

            if (commandResult.Status is not AddWorkJourneyCommandResultStatus.WorkJourneyAdded) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [Route("updatejourney")]
        public async Task<IActionResult> UpdateJourney([FromBody] UpdateWorkJourneyCommand command) {

            var commandResult = await _commandHandler
                .Handle<UpdateWorkJourneyCommand, UpdateWorkJourneyCommandResult>(command);

            if (commandResult.Status is not UpdateWorkJourneyCommandResultStatus.WorkJourneyUpdated) {
                return BadRequest(commandResult);
            }

            return Ok(commandResult);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("servertime")]
        public IActionResult ServerTime() {
            return Ok(new {
                date = DateTime.UtcNow.GetFromBrazilTimezone().ExtractDate().ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                time = DateTime.UtcNow.GetFromBrazilTimezone().ExtractTime().ToString("HH:mm", CultureInfo.InvariantCulture)
            });
        }
    }
}
