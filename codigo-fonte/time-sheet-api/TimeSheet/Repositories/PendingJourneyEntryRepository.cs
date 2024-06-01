using Microsoft.EntityFrameworkCore;

namespace TimeSheet.Repositories {
    public class PendingJourneyEntryRepository {

        private readonly TimeSheetContext _context;
        public PendingJourneyEntryRepository(TimeSheetContext context) {
            _context = context;
        }
        public async Task<IEnumerable<PendingJourneyEntry>> GetPendingJourneyEntries() {
            return await _context.PendingJourneyEntries.ToListAsync();
        }
        public async Task RegisterPendingJourneyEntry(PendingJourneyEntry pendingJourneyEntry) {

            await _context.PendingJourneyEntries.AddAsync(pendingJourneyEntry);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> RemovePendingJourneyEntry(Guid id) {

            var pendingJourney = await _context.PendingJourneyEntries
                .FirstOrDefaultAsync(x => x.Id == id);

            if (pendingJourney is null)
            {
                return false;
            }

            _context.PendingJourneyEntries.Remove(pendingJourney);
            _context.SaveChanges();

            return true;
        }
    }
}
