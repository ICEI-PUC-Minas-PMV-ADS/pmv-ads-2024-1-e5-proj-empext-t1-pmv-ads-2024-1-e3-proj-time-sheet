namespace TimeSheet.Models {
    public class User {
        public Guid Id { get; set; }
        public string CPF { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Password { get; set; } = null!;
        public UserRole Role { get; set; }
        public UserStatus Status { get; set; }
        public double WorkTime { get; set; }
        public double LunchTime { get; set; }
    }
    public enum UserRole {
        Administrator,
        Employee
    }
    public enum UserStatus {
        Active,
        Inactive
    }
}
