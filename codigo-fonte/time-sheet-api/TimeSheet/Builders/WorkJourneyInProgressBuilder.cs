using FluentResults;

namespace TimeSheet.Builders {
    public class WorkJourneyInProgressBuilder {

        private Result<WorkJourneyInProgress> _result;
        private WorkJourneyInProgress _workJourneyInProgress;
        public WorkJourneyInProgressBuilder CreateNew() {
            _result = new Result<WorkJourneyInProgress>();
            _workJourneyInProgress = new WorkJourneyInProgress();
            _workJourneyInProgress.Id = Guid.NewGuid();

            return this;
        }
        public WorkJourneyInProgressBuilder ForUser(Guid userId) {

            if (_result is null || _workJourneyInProgress is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _workJourneyInProgress.UserId = userId;

            return this;
        }
        public WorkJourneyInProgressBuilder StartUsingCurrentTime() {

            if (_result is null || _workJourneyInProgress is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _workJourneyInProgress.Date = DateTime.UtcNow.GetFromBrazilTimezone().ExtractDate();
            _workJourneyInProgress.StartTime = DateTime.UtcNow.GetFromBrazilTimezone().ExtractTime();

            return this;
        }
        public Result<WorkJourneyInProgress> Build() {

            if (_result is null || _workJourneyInProgress is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            if (_result.IsSuccess) {
                _result.WithValue(_workJourneyInProgress);
            }

            return _result;
        }
    }
}
