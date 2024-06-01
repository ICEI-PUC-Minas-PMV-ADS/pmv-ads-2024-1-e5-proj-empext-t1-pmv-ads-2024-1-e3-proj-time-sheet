namespace TimeSheet.Queries {
    public class GetPendingEntriesQueryResult : IQueryResult {
        public IEnumerable<GetPendingEntryQueryResult> PendingEntries { get; set; } = new List<GetPendingEntryQueryResult>();
    }
}
