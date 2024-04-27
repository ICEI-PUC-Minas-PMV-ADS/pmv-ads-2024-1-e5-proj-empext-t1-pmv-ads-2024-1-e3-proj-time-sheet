namespace TimeSheet.Models {
    public class WorkJourney {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public LunchTime Lunch { get; set; }
    }
}
