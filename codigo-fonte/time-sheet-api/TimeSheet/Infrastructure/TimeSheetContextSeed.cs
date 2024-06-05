namespace TimeSheet.Infrastructure {
    public static class TimeSheetContextSeed {
        public static void SeedContext(TimeSheetContext context) {

            var passwordServices = new PasswordService();

            if (!context.Users
                .Any(u => u.Name == "admin" &&
                          u.CPF == "00000000000")) {

                context.Users.Add(new User {
                    Id = Guid.Parse("fd87aebe-6584-4163-8b2f-e6296d1a8e62"),
                    Name = "admin",
                    CPF = "00000000000",
                    WorkTime = 8,
                    LunchTime = 2,
                    Password = passwordServices.EncryptPassword("admin@123"),
                    Role = Models.UserRole.Administrator,
                    Status = Models.UserStatus.Active
                });

                context.SaveChanges();
            };
        }
    }
}
