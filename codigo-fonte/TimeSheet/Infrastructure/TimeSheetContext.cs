using Microsoft.EntityFrameworkCore;
using TimeSheet.Models;

namespace TimeSheet.Infrastructure {
    public class TimeSheetContext : DbContext {
        public TimeSheetContext(DbContextOptions<TimeSheetContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
    }
}
