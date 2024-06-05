namespace TimeSheet.Queries {
    public class GetWorkJourneyInProgressQueryHandler
        : IQueryHandler<GetWorkJourneyInProgressQuery, GetWorkJourneyInProgressQueryResult> {

        private readonly WorkJourneyInProgressRepository _repository;
        public GetWorkJourneyInProgressQueryHandler(WorkJourneyInProgressRepository repository) {
            _repository = repository;
        }
        public async Task<GetWorkJourneyInProgressQueryResult?> Handle(GetWorkJourneyInProgressQuery query) {

            var workJourneyInProgress = await _repository
                .GetWorkJourneyInProgress(query.UserId);

            if (workJourneyInProgress is null) {
                return null;
            }

            return new GetWorkJourneyInProgressQueryResult {
                Date = workJourneyInProgress.Date,
                EndLunchTime = workJourneyInProgress.EndLunchTime,
                StartLunchTime = workJourneyInProgress.StartLunchTime,
                StartTime = workJourneyInProgress.StartTime,
                UserId = workJourneyInProgress.UserId,
                Id = workJourneyInProgress.Id,
                Status = workJourneyInProgress.Status,
                EndTime = workJourneyInProgress.EndTime
            };
        }
    }
}
