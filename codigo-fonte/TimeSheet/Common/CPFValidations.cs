namespace TimeSheet.Common {
    public static class CPFValidations {
        public static void Normalize(ref string cpf) {
            cpf = cpf
                .Trim()
                .Replace(".", "")
                .Replace("-", "");
        }
        public static bool IsValidLength(string cpf) {
            return cpf.Length == 11;
        }
        public static bool IsAllDigitsSame(string cpf) {

            for (int i = 1; i < 11; i++) {
                if (cpf[i] != cpf[0]) {
                    return false;
                }
            }

            return true;
        }
        public static bool ValidateCpf(string cpf) {

            if (!IsValidLength(cpf)) {
                return false;
            }

            if (IsAllDigitsSame(cpf)) {
                return false;
            }

            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += (10 - i) * int.Parse(cpf[i].ToString());
            }
            int remainder = sum % 11;
            int digit1 = remainder < 2 ? 0 : 11 - remainder;

            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += (11 - i) * int.Parse(cpf[i].ToString());
            }
            remainder = sum % 11;
            int digit2 = remainder < 2 ? 0 : 11 - remainder;

            if (digit1 == int.Parse(cpf[9].ToString()) && digit2 == int.Parse(cpf[10].ToString())) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}
