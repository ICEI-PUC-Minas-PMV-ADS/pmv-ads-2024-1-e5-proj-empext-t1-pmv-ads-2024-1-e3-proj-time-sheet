using Microsoft.EntityFrameworkCore;

namespace TimeSheet.Repositories {
    public class WorkJourneyInProgressRepository {

        private readonly TimeSheetContext _context;
        public WorkJourneyInProgressRepository(TimeSheetContext context) {
            _context = context;
        }
        public async Task<WorkJourneyInProgress?> GetWorkJourneyInProgress(Guid userId) {

            var workJourney = await _context.WorkJourneyInProgresses
                .FirstOrDefaultAsync(wj => wj.UserId == userId);

            return workJourney;
        }
        public async Task<bool> StoreWorkJourneyInProgress(WorkJourneyInProgress workJourneyInProgress) {

            if ((await _context.WorkJourneyInProgresses
                .AnyAsync(wj => wj.UserId == workJourneyInProgress.UserId))) {
                return false;
            }

            await _context.WorkJourneyInProgresses.AddAsync(workJourneyInProgress);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> RemoveWorkJourneyInProgress(Guid userId) {

            var workJourneyInProgress = await _context
                .WorkJourneyInProgresses.FirstOrDefaultAsync(wj => wj.UserId == userId);

            if (workJourneyInProgress is null)
                return false;

            _context.WorkJourneyInProgresses.Remove(workJourneyInProgress);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task SaveChanges() {
            await _context.SaveChangesAsync();
        }
    }
}
