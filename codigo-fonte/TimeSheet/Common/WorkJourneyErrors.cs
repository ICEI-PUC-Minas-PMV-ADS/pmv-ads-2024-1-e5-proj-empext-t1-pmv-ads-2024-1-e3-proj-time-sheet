using FluentResults;

namespace TimeSheet.Common {
    public class ValueOutsideTimeBoundsError : Error {
        public ValueOutsideTimeBoundsError() : base("O valor está fora dos limites de tempo padrão.") { }
    }

    public class InconsistentLunchTimeError : Error {
        public InconsistentLunchTimeError() : base("O tempo de almoço não pode ter maior que o tempo total.") { }
    }
}
