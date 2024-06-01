using System.Text.Json.Serialization;

namespace TimeSheet.Commands {
    public class UpdateWorkJourneyCommand : ICommand {
        public Guid WorkJourneyId { get; set; }
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly Date { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartJourney { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly StartLunchTime { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly FinishLunchTime { get; set; }
        [JsonConverter(typeof(TimeOnlyJsonConverter))]
        public TimeOnly FinishJourney { get; set; }
        public WorkJourneyType JourneyType { get; set; }
    }
}
