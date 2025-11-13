using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Prestigelisten.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedRaceDateToResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_results_nation_seasons_nation_season_id",
                table: "results");

            migrationBuilder.DropForeignKey(
                name: "fk_results_rider_seasons_rider_season_id",
                table: "results");

            migrationBuilder.AlterColumn<int>(
                name: "rider_season_id",
                table: "results",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "nation_season_id",
                table: "results",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "race_date_id",
                table: "results",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_results_race_date_id",
                table: "results",
                column: "race_date_id");

            migrationBuilder.AddForeignKey(
                name: "fk_results_nation_seasons_nation_season_id",
                table: "results",
                column: "nation_season_id",
                principalTable: "nation_seasons",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_results_race_dates_race_date_id",
                table: "results",
                column: "race_date_id",
                principalTable: "race_dates",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_results_rider_seasons_rider_season_id",
                table: "results",
                column: "rider_season_id",
                principalTable: "rider_seasons",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_results_nation_seasons_nation_season_id",
                table: "results");

            migrationBuilder.DropForeignKey(
                name: "fk_results_race_dates_race_date_id",
                table: "results");

            migrationBuilder.DropForeignKey(
                name: "fk_results_rider_seasons_rider_season_id",
                table: "results");

            migrationBuilder.DropIndex(
                name: "ix_results_race_date_id",
                table: "results");

            migrationBuilder.DropColumn(
                name: "race_date_id",
                table: "results");

            migrationBuilder.AlterColumn<int>(
                name: "rider_season_id",
                table: "results",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "nation_season_id",
                table: "results",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_results_nation_seasons_nation_season_id",
                table: "results",
                column: "nation_season_id",
                principalTable: "nation_seasons",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_results_rider_seasons_rider_season_id",
                table: "results",
                column: "rider_season_id",
                principalTable: "rider_seasons",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
