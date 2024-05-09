using FluentResults;

namespace TimeSheet.Common {
    public class CPFIsBlankError : Error {
        public CPFIsBlankError() : base("O CPF não pode estar em branco.") { }
    }

    public class CPFLengthError : Error {
        public CPFLengthError() : base("O CPF precisa ter 11 digitos.") { }
    }

    public class CPFAllDigitsSameError : Error {
        public CPFAllDigitsSameError() : base("O CPF não pode ter todos os digitos iguais.") { }
    }

    public class CPFIsInvalidError : Error {
        public CPFIsInvalidError() : base("O CPF não é válido.") { }
    }
}
