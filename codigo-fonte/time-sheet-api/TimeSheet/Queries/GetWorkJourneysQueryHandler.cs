
namespace TimeSheet.Queries {
    public class GetWorkJourneysQueryHandler : IQueryHandler<GetWorkJourneysQuery, GetWorkJourneysQueryResult> {

        private readonly WorkJourneyRepository _workJourneyRepository;
        public GetWorkJourneysQueryHandler(WorkJourneyRepository workJourneyRepository) {
            _workJourneyRepository = workJourneyRepository;
        }

        public async Task<GetWorkJourneysQueryResult?> Handle(GetWorkJourneysQuery query) {

            var WorkJourneys = (await _workJourneyRepository.GetWorkJourneys(query.UserId, query.Year, query.Month)).ToList();
            var workJourneysResult = new List<GetWorkJourneyResult>();

            WorkJourneys.ForEach(workJourney => {
                workJourneysResult.Add(GetWorkJourneyResult.FromWorkJourney(workJourney));
            });

            return new GetWorkJourneysQueryResult {
                UserId = query.UserId,
                WorkJourneys = workJourneysResult
            };
        }
    }
}
