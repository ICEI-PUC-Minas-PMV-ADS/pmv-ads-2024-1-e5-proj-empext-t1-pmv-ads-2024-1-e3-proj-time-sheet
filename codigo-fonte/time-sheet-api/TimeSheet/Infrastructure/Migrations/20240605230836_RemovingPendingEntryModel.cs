using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeSheet.Infrastructure.Migrations
{
    public partial class RemovingPendingEntryModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalTime",
                table: "Users",
                newName: "WorkTime");

            migrationBuilder.AddColumn<int>(
                name: "JourneyType",
                table: "WorkJourneys",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JourneyType",
                table: "WorkJourneys");

            migrationBuilder.RenameColumn(
                name: "WorkTime",
                table: "Users",
                newName: "TotalTime");
        }
    }
}
