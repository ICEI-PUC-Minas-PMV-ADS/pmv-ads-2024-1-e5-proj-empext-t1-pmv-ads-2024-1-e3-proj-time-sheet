namespace TimeSheet.Configuration {
    public class AppOptions {
        public string ConnectionString { get; set; } = null!;
        public JwtBearerOptions JwtBearer { get; set; } = null!;
    }
}
