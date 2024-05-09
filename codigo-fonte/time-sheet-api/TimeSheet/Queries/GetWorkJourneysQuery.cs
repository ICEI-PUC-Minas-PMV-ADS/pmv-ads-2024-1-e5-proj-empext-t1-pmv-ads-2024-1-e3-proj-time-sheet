namespace TimeSheet.Queries {
    public class GetWorkJourneysQuery : IQuery {
        public Guid UserId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
    }
}
