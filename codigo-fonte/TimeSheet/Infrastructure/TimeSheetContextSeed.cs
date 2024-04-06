using TimeSheet.Services;

namespace TimeSheet.Infrastructure {
    public static class TimeSheetContextSeed {
        public static void SeedContext(TimeSheetContext context) {

            var passwordServices = new PasswordService();

            if (!context.Users
                .Any(u => u.Name == "admin" &&
                          u.CPF == "00000000000")) {

                context.Users.Add(new Models.User {
                    Id = Guid.NewGuid(),
                    Name = "admin",
                    CPF = "00000000000",
                    TotalTime = 8,
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
