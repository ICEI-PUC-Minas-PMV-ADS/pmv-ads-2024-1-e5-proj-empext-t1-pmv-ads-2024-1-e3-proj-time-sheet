namespace TimeSheet.Queries {
    public class GetAllWorkJourneysQuery : IQuery {
        public int Year { get; set; }
        public int Month { get; set; }
        public bool IncludeInactiveUsers { get; set; } = false;
    }
}
