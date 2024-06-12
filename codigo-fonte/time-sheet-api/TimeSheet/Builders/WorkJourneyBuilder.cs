using FluentResults;

namespace TimeSheet.Builders {
    public class WorkJourneyBuilder {

        private Result<WorkJourney>? _result;
        private WorkJourney? _workJourney;
        public WorkJourneyBuilder CreateNew() {
            _result = new Result<WorkJourney>();
            _workJourney = new WorkJourney();
            _workJourney.Id = Guid.NewGuid();
            _workJourney.JourneyType = WorkJourneyType.Normal;

            return this;
        }
        public WorkJourneyBuilder WithExcusedAbsenceType() {

            if (_result is null || _workJourney is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _workJourney.JourneyType = WorkJourneyType.ExcusedAbsence;

            return this;
        }
        public WorkJourneyBuilder WithDate(DateOnly date) {

            if (_result is null || _workJourney is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _workJourney.Date = date;

            return this;
        }
        public WorkJourneyBuilder WithStartTime(TimeOnly startTime) {

            if (_result is null || _workJourney is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _workJourney.StartTime = startTime;

            return this;
        } 
        public WorkJourneyBuilder WithLunchTime(TimeOnly startTime, TimeOnly endTime) {

            if (_result is null || _workJourney is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _workJourney.StartLunchTime = startTime;
            _workJourney.EndLunchTime = endTime;

            return this;
        }
        public WorkJourneyBuilder WithEndTime(TimeOnly endTime) {

            if (_result is null || _workJourney is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _workJourney.EndTime = endTime;

            return this;
        }
        public Result<WorkJourney> Build() {

            if (_result is null || _workJourney is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            if (_result.IsSuccess) {
                _result.WithValue(_workJourney);
            }

            return _result;
        }
    }
}
