using Microsoft.EntityFrameworkCore;

namespace TimeSheet.Infrastructure {
    public class TimeSheetContext : DbContext {
        public TimeSheetContext(DbContextOptions<TimeSheetContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<WorkJourney> WorkJourneys { get; set; } = null!;
        public DbSet<WorkJourneyInProgress> WorkJourneyInProgresses { get; set; } = null!;
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder) {

            configurationBuilder
                .Properties<DateOnly>()
                .HaveConversion<DateOnlyValueConverter>()
                .HaveColumnType("date");

            configurationBuilder
                .Properties<TimeOnly>()
                .HaveConversion<TimeOnlyValueConverter>()
                .HaveColumnType("time");

            base.ConfigureConventions(configurationBuilder);
        }
    }
}
