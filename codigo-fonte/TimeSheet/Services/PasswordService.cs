using static BCrypt.Net.BCrypt;

namespace TimeSheet.Services {
    public class PasswordService {
        public string EncryptPassword(string password) {
            return HashPassword(password, 12);
        }

        public bool VerifyPassword(string password, string encryptedPassword) {
            return Verify(password, encryptedPassword);
        }
    }
}
