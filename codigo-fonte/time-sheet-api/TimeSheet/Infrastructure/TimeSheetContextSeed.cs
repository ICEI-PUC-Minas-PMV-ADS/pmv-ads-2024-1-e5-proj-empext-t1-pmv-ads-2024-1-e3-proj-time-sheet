namespace TimeSheet.Infrastructure {
    public static class TimeSheetContextSeed {
        public static void SeedContext(TimeSheetContext context) {

            var passwordServices = new PasswordService();

            if (!context.Users
                .Any(u => u.Id == Guid.Parse(MasterUserConfig.UserGuid))) {

                context.Users.Add(new User {
                    Id = Guid.Parse(MasterUserConfig.UserGuid),
                    Name = MasterUserConfig.UserName,
                    CPF = MasterUserConfig.UserCPF,
                    WorkTime = MasterUserConfig.UserWorkTime,
                    LunchTime = MasterUserConfig.UserLunchTime,
                    Password = passwordServices.EncryptPassword(MasterUserConfig.UserPassword),
                    Role = Models.UserRole.Administrator,
                    Status = Models.UserStatus.Active
                });

                context.SaveChanges();
            };
        }
    }
}
