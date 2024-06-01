
namespace TimeSheet.Queries {
    public class GetPendingEntriesQueryHandler
        : IQueryHandler<GetPendingEntriesQuery, GetPendingEntriesQueryResult> {

        private readonly PendingJourneyEntryRepository _repository;
        public GetPendingEntriesQueryHandler(PendingJourneyEntryRepository repository) {
            _repository = repository;
        }

        public async Task<GetPendingEntriesQueryResult> Handle(GetPendingEntriesQuery query) {

            var pendings = await _repository.GetPendingJourneyEntries();
            var pendingsResult = new List<GetPendingEntryQueryResult>();

            foreach(var pending in pendings) {
                pendingsResult.Add(new GetPendingEntryQueryResult {
                    Id = pending.Id,
                    UserId = pending.UserId,
                    Date = pending.Date,
                    StartTime = pending.StartTime,
                    EndTime = pending.EndTime,
                    EndLunchTime = pending.EndLunchTime,
                    StartLunchTime = pending.StartLunchTime
                });
            }

            return new GetPendingEntriesQueryResult {
                PendingEntries = pendingsResult
            };
        }
    }
}
