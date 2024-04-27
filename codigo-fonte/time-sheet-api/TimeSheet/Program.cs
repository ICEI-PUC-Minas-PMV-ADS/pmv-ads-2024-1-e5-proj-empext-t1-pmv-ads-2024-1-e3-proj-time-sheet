using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<AppOptions>(builder.Configuration);

var appOptions = builder.Configuration.Get<AppOptions>();
builder.Services.AddScoped<TimeSheet.Configuration.JwtBearerOptions>((service) => {
    return appOptions.JwtBearer;
});

var jwtBearerOptions = appOptions.JwtBearer;

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserBuilder>();
builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<TokenService>();

builder.Services.UseQueries();
builder.Services.UseCommands();

builder.Services.RegisterCommandHandler<EnableUserCommand, EnableUserCommandHandler, EnableUserCommandResult>();
builder.Services.RegisterCommandHandler<DisableUserCommand, DisableUserCommandHandler, DisableUserCommandResult>();
builder.Services.RegisterCommandHandler<AuthenticateCommand, AuthenticateCommandHandler, AuthenticateCommandResult>();
builder.Services.RegisterCommandHandler<CreateUserCommand, CreateUserCommandHandler, CreateUserCommandResult>();
builder.Services.RegisterCommandHandler<UpdateUserCommand, UpdateUserCommandHandler, UpdateUserCommandResult>();
builder.Services.RegisterCommandHandler<ChangeUserPasswordCommand, ChangeUserPasswordCommandHandler, ChangeUserPasswordCommandResult>();
builder.Services.RegisterCommandHandler<DeleteUserCommand, DeleteUserCommandHandler, DeleteUserCommandResult>();
builder.Services.RegisterCommandHandler<VerifyTokenCommand, VerifyTokenCommandHandler, VerifyTokenCommandResult>();
builder.Services.RegisterQueryHandler<GetUsersQuery, GetUsersQueryHandler, GetUsersQueryResult>();
builder.Services.RegisterQueryHandler<GetUserQuery, GetUserQueryHandler, GetUserQueryResult>();

builder.Services.AddAuthentication(opt => {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt => {
    opt.RequireHttpsMetadata = false;
    opt.SaveToken = true;
    opt.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtBearerOptions.SecretKey)),
        ValidateIssuer = jwtBearerOptions.ValidateIssuer,
        ValidIssuer = jwtBearerOptions.Issuer,
        ValidateAudience = jwtBearerOptions.ValidateAudience,
        ValidAudience = jwtBearerOptions.Audience,
    };
});

builder.Services.AddDbContext<TimeSheetContext>(options => {
    options
        .UseInMemoryDatabase("timesheet-database")
        .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope()) {

    var provider = scope.ServiceProvider;
    var appContext = provider.GetRequiredService<TimeSheetContext>();

    TimeSheetContextSeed.SeedContext(appContext);

    scope.Dispose();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
