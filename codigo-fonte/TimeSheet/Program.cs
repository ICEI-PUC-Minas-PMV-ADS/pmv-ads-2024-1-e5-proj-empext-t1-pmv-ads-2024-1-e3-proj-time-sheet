using Microsoft.EntityFrameworkCore;
using TimeSheet.Builders;
using TimeSheet.Commands;
using TimeSheet.Infrastructure;
using TimeSheet.Queries;
using TimeSheet.Repositories;
using TimeSheet.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserBuilder>();
builder.Services.AddScoped<PasswordService>();

builder.Services.UseQueries();
builder.Services.UseCommands();

builder.Services.RegisterCommandHandler<CreateUserCommand, CreateUserCommandHandler, CreateUserCommandResult>();
builder.Services.RegisterQueryHandler<GetUsersQuery, GetUsersQueryHandler, GetUsersQueryResult>();

builder.Services.AddDbContext<TimeSheetContext>(options => {
    options
        .UseInMemoryDatabase("timesheet-database")
        .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment()) {
    app.UseHsts();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
