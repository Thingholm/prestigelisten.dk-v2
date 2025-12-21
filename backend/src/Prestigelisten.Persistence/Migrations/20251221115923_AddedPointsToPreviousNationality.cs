using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Prestigelisten.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedPointsToPreviousNationality : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "points",
                table: "previous_nationalities",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "points",
                table: "previous_nationalities");
        }
    }
}
