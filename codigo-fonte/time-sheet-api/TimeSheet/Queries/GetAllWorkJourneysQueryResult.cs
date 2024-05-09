namespace TimeSheet.Queries {
    public class GetAllWorkJourneysQueryResult : IQueryResult {
        public IEnumerable<GetWorkJourneysQueryResult> WorkJourneys { get; set; } = new List<GetWorkJourneysQueryResult>();
    }
}
