using TimeSheet.Models;

namespace TimeSheet.Queries {
    public class GetUsersQueryResult : IQueryResult {
        public IEnumerable<User> Users { get; set; } = null!;
    }
}
