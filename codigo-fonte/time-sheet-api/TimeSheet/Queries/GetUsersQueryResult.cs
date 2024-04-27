namespace TimeSheet.Queries {
    public class GetUsersQueryResult : IQueryResult {
        public IEnumerable<GetUserQueryResult> Users { get; set; } = null!;
    }
}
