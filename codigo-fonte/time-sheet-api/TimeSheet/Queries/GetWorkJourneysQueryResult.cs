namespace TimeSheet.Queries {
    public class GetWorkJourneysQueryResult : IQueryResult {
        public Guid UserId { get; set; }
        public IEnumerable<GetWorkJourneyResult> WorkJourneys { get; set; } = new List<GetWorkJourneyResult>();
    }
}