namespace TimeSheet.Queries {
    public class GetAllWorkJourneysQueryHandler : IQueryHandler<GetAllWorkJourneysQuery, GetAllWorkJourneysQueryResult> {

        private readonly WorkJourneyRepository _repository;
        private readonly UserRepository _userRepository;
        public GetAllWorkJourneysQueryHandler(WorkJourneyRepository repository, UserRepository userRepository) {
            _repository = repository;
            _userRepository = userRepository;
        }
        public async Task<GetAllWorkJourneysQueryResult?> Handle(GetAllWorkJourneysQuery query) {

            var workJourneys = new List<GetWorkJourneysQueryResult>();

            foreach(var user in await _userRepository.GetAll()) {

                if (!query.IncludeInactiveUsers && user.Status is UserStatus.Inactive) {
                    continue;
                }

                var journeys = (await _repository.GetWorkJourneys(user.Id, query.Year, query.Month)).ToList();
                var journeysResult = new List<GetWorkJourneyResult>();

                if (journeys.Count == 0)
                    continue;

                journeys.ForEach(journey => {
                    journeysResult.Add(GetWorkJourneyResult.FromWorkJourney(journey));
                });

                workJourneys.Add(new GetWorkJourneysQueryResult {
                    UserId = user.Id,
                    WorkJourneys = journeysResult
                });
            }

            return new GetAllWorkJourneysQueryResult {
                WorkJourneys = workJourneys
            };
        }
    }
}
