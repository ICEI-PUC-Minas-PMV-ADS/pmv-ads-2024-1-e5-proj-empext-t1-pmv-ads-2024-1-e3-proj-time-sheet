using TimeSheet.Builders;
using TimeSheet.Common;
using TimeSheet.Models;
using TimeSheet.Services;

namespace TimeSheet.UnitTests.Builders {
    [TestClass]
    public class UserBuilderTests {

        private readonly UserBuilder _builder;
        private readonly PasswordService _passwordService;
        public UserBuilderTests() {
            _passwordService = new PasswordService();
            _builder = new UserBuilder(_passwordService);
        }

        [TestMethod]
        public void Build_WithoutCallCreateNewMethod_ThrowInvalidOperationException() {
            Assert.ThrowsException<InvalidOperationException>(() => _builder.Build());
        }

        [TestMethod]
        public void WithName_WithoutCallCreateNewMethod_ThrowInvalidOperationException() {
            Assert.ThrowsException<InvalidOperationException>(() => _builder.WithName(string.Empty));
        }

        [TestMethod]
        public void WithName_ArgumentNull_ReturnsFailureWithArgumentNullError() {

            var buildResult = _builder.
                CreateNew().
                WithName(null).
                Build();

            Assert.IsTrue(buildResult.IsFailed);
            Assert.IsInstanceOfType(buildResult.Errors[0], typeof(ArgumentNullError));
        }

        [TestMethod]
        public void WithName_BlankName_ReturnsFailureWithPropertyIsBlankError() {

            var buildResult = _builder.
                CreateNew().
                WithName(string.Empty).
                Build();

            Assert.IsTrue(buildResult.IsFailed);
            Assert.IsInstanceOfType(buildResult.Errors[0], typeof(PropertyIsBlankError));
        }

        [TestMethod]
        public void WithName_NameLengthTooShort_ReturnsFailureWithPropertyLengthTooShortError() {

            var buildResult = _builder.
                CreateNew().
                WithName("a").
                Build();

            Assert.IsTrue(buildResult.IsFailed);
            Assert.IsInstanceOfType(buildResult.Errors[0], typeof(PropertyLengthTooShortError));
        }

        [TestMethod]
        public void WithName_NameLengthTooLong_ReturnsFailureWithPropertyLengthTooLongError() {

            var buildResult = _builder.
                CreateNew().
                WithName(StringUtils.CreateLongString("aa", 30)).
                Build();

            Assert.IsTrue(buildResult.IsFailed);
            Assert.IsInstanceOfType(buildResult.Errors[0], typeof(PropertyLengthTooLongError));
        }

        [TestMethod]
        public void WithName_ValidName_ReturnsSuccess() {

            var buildResult = _builder.
                CreateNew().
                WithName("Batman").
                Build();

            Assert.IsTrue(buildResult.IsSuccess);
            Assert.AreEqual(buildResult.Value.Name, "Batman");
        }

        [TestMethod]
        public void WithCPF_WithoutCallCreateNewMethod_ThrowInvalidOperationException() {
            Assert.ThrowsException<InvalidOperationException>(() => _builder.WithCPF(string.Empty));
        }

        [TestMethod]
        public void WithCPF_ArgumentNull_ReturnsFailureWithArgumentNullError() {

            var result = _builder.
                CreateNew().
                WithCPF(null).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(ArgumentNullError));
        }

        [TestMethod]
        public void WithCPF_BlankCPF_ReturnsFailureWithCPFIsBlankError() {

            var result = _builder.
                CreateNew().
                WithCPF(string.Empty).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(CPFIsBlankError));
        }

        [TestMethod]
        [DataRow("11111111111111111111")]
        [DataRow("22")]
        public void WithCPF_InvalidLength_ReturnsFailureWithCPFLengthError(string cpf) {

            var result = _builder.
                CreateNew().
                WithCPF(cpf).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(CPFLengthError));
        }

        [TestMethod]
        [DataRow("11111111111")]
        [DataRow("22222222222")]
        public void WithCPF_CPFWithAllDigitsSame_ReturnsFailureWithCPFAllDigitsSameError(string cpf) {

            var result = _builder.
                CreateNew().
                WithCPF(cpf).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(CPFAllDigitsSameError));
        }

        [TestMethod]
        [DataRow("98765432109")]
        [DataRow("12345678900")]
        public void WithCPF_InvalidCPF_ReturnsFailureWithCPFIsInvalidError(string cpf) {

            var result = _builder.
                CreateNew().
                WithCPF(cpf).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(CPFIsInvalidError));
        }

        [TestMethod]
        [DataRow("79007129090")]
        public void WithCPF_ValidCPF_ReturnsSuccess(string cpf) {

            var result = _builder.
                CreateNew().
                WithCPF(cpf).
                Build();

            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(result.Value.CPF, cpf);
        }

        [TestMethod]
        public void WithPassword_WithoutCallCreateNewMethod_ThrowInvalidOperationException() {
            Assert.ThrowsException<InvalidOperationException>(() => _builder.WithPassword(string.Empty));
        }

        [TestMethod]
        public void WithPassword_ArgumentNull_ReturnsFailureWithArgumentNullError() {

            var result = _builder.
                CreateNew().
                WithPassword(null).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(ArgumentNullError));
        }

        [TestMethod]
        public void WithPassword_BlankPassword_ReturnsFailureWithPasswordIsBlankError() {

            var result = _builder.
                CreateNew().
                WithPassword(string.Empty).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(PasswordIsBlankError));
        }

        [TestMethod]
        [DataRow("pas")]
        [DataRow("pas123")]
        [DataRow("pass@123")]
        [DataRow("pass 123")]
        [DataRow("Pass123")]
        [DataRow("123")]
        [DataRow("@123")]
        [DataRow("Pass/123")]
        public void WithPassword_InvalidPassword_ReturnsFailureWithPasswordIsInvalidError(string password) {

            var result = _builder.
                CreateNew().
                WithPassword(password).
                Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(PasswordIsInvalidError));
        }

        [TestMethod]
        [DataRow("Pass@123")]
        public void WithPassword_ValidPassword_ReturnsSuccess(string password) {

            var result = _builder.
                CreateNew().
                WithPassword(password).
                Build();

            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(result.Value.Password, password);
        }

        [TestMethod]
        public void EncryptPassword_WithoutCallCreateNewMethod_ThrowInvalidOperationException() {
            Assert.ThrowsException<InvalidOperationException>(() => _builder.EncryptPassword());
        }

        [TestMethod]
        public void EncryptPassword_WithoutAddPassword_ReturnsFailure() {
            var result = _builder
                .CreateNew()
                .EncryptPassword()
                .Build();

            Assert.IsTrue(result.IsFailed);
            Assert.AreEqual(result.Errors[0].Message, "A Senha do usuário não foi definida.");
        }

        [TestMethod]
        [DataRow("Pass@123")]
        public void EncryptPassword_WithPasswordDefined_ReturnsSuccessAndEncryptPassword(string password) {

            var result = _builder
                .CreateNew()
                .WithPassword(password)
                .EncryptPassword()
                .Build();

            Assert.IsTrue(result.IsSuccess);
            Assert.IsTrue(_passwordService.VerifyPassword(password, result.Value.Password));
        }

        [TestMethod]
        public void WithRole_WithoutCallCreateNewMethod_ThrowInvalidOperationException() {
            Assert.ThrowsException<InvalidOperationException>(() => _builder.WithRole(Models.UserRole.Employee));
        }

        [TestMethod]
        [DataRow(UserRole.Employee)]
        [DataRow(UserRole.Administrator)]
        public void WithRole_ValidData_ReturnsSucess(UserRole role) {
            
            var result = _builder
                .CreateNew()
                .WithRole(role)
                .Build();

            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(result.Value.Role, role);
        }

        [TestMethod]
        public void WithWorkJourney_WithoutCallCreateNewMethod_ThrowInvalidOperationException() {
            Assert.ThrowsException<InvalidOperationException>(() => _builder.WithWorkJourney(0, 0));
        }

        [TestMethod]
        [DataRow(-1)]
        [DataRow(25)]
        public void WithWorkJourney_WorkTimeOutsideTimeBounds_ReturnsFailureWithValueOutsideTimeBoundsError(double workTime) {
            var result = _builder
                .CreateNew()
                .WithWorkJourney(workTime, lunchTime: 2)
                .Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(ValueOutsideTimeBoundsError));
        }

        [TestMethod]
        [DataRow(-1)]
        [DataRow(25)]
        public void WithWorkJourney_LunchTimeOutsideTimeBounds_ReturnsFailureWithValueOutsideTimeBoundsError(double lunchTime) {
            var result = _builder
                .CreateNew()
                .WithWorkJourney(workTime: 8, lunchTime)
                .Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(ValueOutsideTimeBoundsError));
        }

        [TestMethod]
        public void WithWorkJourney_LunchTimeLongerThanWorkTime_ReturnsFailureWithInconsistentLunchTimeError() {
            var result = _builder
                .CreateNew()
                .WithWorkJourney(workTime: 1, lunchTime: 8)
                .Build();

            Assert.IsTrue(result.IsFailed);
            Assert.IsInstanceOfType(result.Errors[0], typeof(InconsistentLunchTimeError));
        }

        [TestMethod]
        [DataRow(8, 1.3)]
        [DataRow(10, 2)]
        public void WithWorkJourney_ValidValues_ReturnsSuccess(double workTime, double lunchTime) {
            var result = _builder
                .CreateNew()
                .WithWorkJourney(workTime, lunchTime)
                .Build();

            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(result.Value.WorkTime, workTime);
            Assert.AreEqual(result.Value.LunchTime, lunchTime);
        }
    }
}
