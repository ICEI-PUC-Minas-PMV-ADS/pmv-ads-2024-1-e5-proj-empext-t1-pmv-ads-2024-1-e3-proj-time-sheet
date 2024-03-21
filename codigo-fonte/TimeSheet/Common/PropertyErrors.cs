using FluentResults;

namespace TimeSheet.Common {
    public class PropertyIsBlankError : Error {
        public PropertyIsBlankError(string property) : base($"A propriedade {property} não pode estar em branco.") { }
    }
    public class PropertyLengthTooLongError : Error {
        public PropertyLengthTooLongError(string property, int maxLength) : base($"A propriedade {property} deve ter no máximo {maxLength} caracteres.") { }
    }
    public class PropertyLengthTooShortError : Error {
        public PropertyLengthTooShortError(string property, int minLength) : base($"A propriedade {property} deve ter no mínimo {minLength} caracteres.") { }
    }
}
