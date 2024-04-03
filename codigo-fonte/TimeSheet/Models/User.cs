namespace TimeSheet.Models {
    public class User {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string CPF { get; set; } = null!;
        public string Password { get; set; } = null!;
        public UserRole Role { get; set; }
        public UserStatus Status { get; set; }
    }

    public enum UserRole {
        Employee,
        Administrator
    }
    public enum UserStatus {
        Active,
        Inactive
    }
}
