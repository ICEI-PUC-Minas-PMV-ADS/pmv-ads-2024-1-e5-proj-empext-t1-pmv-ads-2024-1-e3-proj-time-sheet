using Microsoft.EntityFrameworkCore;

namespace TimeSheet.Repositories {
    public class WorkJourneyRepository {

        private readonly TimeSheetContext _context;
        public WorkJourneyRepository(TimeSheetContext context) {
            _context = context;
        }
        public async Task<IEnumerable<WorkJourney>> GetWorkJourneys(Guid UserId, int year, int month)
        {
           return await _context.WorkJourneys
                .Where(wj =>  (wj.UserId == UserId) && (wj.Date.Year == year && wj.Date.Month == month))
                .ToListAsync();
        }
        public async Task<bool> StoreWorkJourney(WorkJourney workJourney) {

            await _context.WorkJourneys.AddAsync(workJourney);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
