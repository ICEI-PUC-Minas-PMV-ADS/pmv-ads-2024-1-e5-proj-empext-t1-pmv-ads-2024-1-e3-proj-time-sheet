namespace TimeSheet.Models {
    public class User {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
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
