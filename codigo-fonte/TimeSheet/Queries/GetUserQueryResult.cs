using System.Text.Json.Serialization;
using TimeSheet.Models;

namespace TimeSheet.Queries {
    public class GetUserQueryResult : IQueryResult {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string CPF { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserRole Role { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserStatus Status { get; set; }
        public double TotalTime { get; set; }
        public double LunchTime { get; set; }
    }
}
