using System.Text.Json.Serialization;

namespace TimeSheet.Queries {
    public class GetUserQueryResult : IQueryResult {
        public Guid Id { get; set; }
        public string CPF { get; set; } = null!;
        public string Name { get; set; } = null!;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserRole Role { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserStatus Status { get; set; }
        public double WorkTime { get; set; }
        public double LunchTime { get; set; }

        #region Static
        public static GetUserQueryResult FromUser(User user) {
            return new GetUserQueryResult {
                Id = user.Id,
                CPF = user.CPF,
                Name = user.Name,
                Role = user.Role,
                Status = user.Status,
                WorkTime = user.WorkTime,
                LunchTime = user.LunchTime,
            };
        }

        #endregion
    }
}
