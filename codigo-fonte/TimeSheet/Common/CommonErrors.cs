using FluentResults;

namespace TimeSheet.Common {
    public class ArgumentNullError : Error {
        public ArgumentNullError(string name) : base($"O Argumento '{name}' não pode ser nulo.") { }
    }
}
