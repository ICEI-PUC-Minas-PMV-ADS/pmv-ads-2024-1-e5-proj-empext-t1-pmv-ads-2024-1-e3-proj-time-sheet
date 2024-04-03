using FluentResults;
using TimeSheet.Models;
using TimeSheet.Services;

namespace TimeSheet.Builders {
    public class UserBuilder {

        private readonly PasswordService _passwordService;
        private Result<User>? _result = null;
        private User? _user = null;
        public UserBuilder(PasswordService passwordService) {
            _passwordService = passwordService;
        }
        public UserBuilder CreateNew() {
            _result = new Result<User>();
            _user = new User();
            _user.Id = Guid.NewGuid();
            _user.Status = UserStatus.Active;

            return this;
        }
        public UserBuilder WithName(string name) {

            if (_result is null || _user is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            if (name is null) {
                _result.WithError(new ArgumentNullError(nameof(name)));
                return this;
            }

            PropertyValidations.Normalize(ref name);

            if (PropertyValidations.IsBlank(name)) {
                _result.WithError(new PropertyIsBlankError(nameof(name)));
                return this;
            }

            if (!PropertyValidations.HasMinLength(name, 3)) {
                _result.WithError(new PropertyLengthTooShortError(nameof(name), 3));
                return this;
            }

            if (!PropertyValidations.HasMaxLength(name, 50)) {
                _result.WithError(new PropertyLengthTooLongError(nameof(name), 50));
                return this;
            }

            _user.Name = name;

            return this;
        }
        public UserBuilder WithCPF(string cpf) {

            if (_result is null || _user is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            if (cpf is null) {
                _result.WithError(new ArgumentNullError(nameof(cpf)));
                return this;
            }

            CPFValidations.Normalize(ref cpf);

            if (PropertyValidations.IsBlank(cpf)) {
                _result.WithError<CPFIsBlankError>();
                return this;
            }

            if (!CPFValidations.IsValidLength(cpf)) {
                _result.WithError<CPFLengthError>();
                return this;
            }

            if (CPFValidations.IsAllDigitsSame(cpf)) {
                _result.WithError<CPFAllDigitsSameError>();
            }

            if (!CPFValidations.ValidateCpf(cpf)) {
                _result.WithError<CPFIsInvalidError>();
            }

            _user.CPF = cpf;

            return this;
        }
        public UserBuilder WithPassword(string password) {

            if (_result is null || _user is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            if (password is null) {
                _result.WithError(new ArgumentNullError(nameof(password)));
                return this;
            }

            PasswordValidations.Normalize(ref password);

            if (PasswordValidations.IsBlank(password)) {
                _result.WithError<PasswordIsBlankError>();
                return this;
            }

            if (PasswordValidations.IsInvalid(password)) {
                _result.WithError<PasswordIsInvalidError>();
                return this;
            }

            _user.Password = password;

            return this;
        }
        public UserBuilder EncryptPassword() {

            if (_result is null || _user is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            if (_user.Password is null) {
                _result.WithError("A Senha do usuário não foi definida.");
                return this; ;
            }

            _user.Password = _passwordService
                .EncryptPassword(_user.Password);

            return this;
        }
        public UserBuilder WithRole(UserRole role) {
            if (_result is null || _user is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            _user.Role = role;

            return this;
        }
        public Result<User> Build() {

            if (_result is null || _user is null) {
                throw new InvalidOperationException("É necessário chamar o método 'CreateNew' primeiro.");
            }

            if (_result.IsSuccess) {
                _result.WithValue(_user);
            }

            return _result;
        }
    }
}
