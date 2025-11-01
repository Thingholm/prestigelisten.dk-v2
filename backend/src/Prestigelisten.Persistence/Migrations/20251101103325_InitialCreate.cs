using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Prestigelisten.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "images",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    credit = table.Column<string>(type: "text", nullable: true),
                    credit_url = table.Column<string>(type: "text", nullable: true),
                    image_url = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_images", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "nation_seasons",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    year = table.Column<int>(type: "integer", nullable: false),
                    points_for_year = table.Column<int>(type: "integer", nullable: true),
                    points_all_time = table.Column<int>(type: "integer", nullable: false),
                    rank_for_year = table.Column<int>(type: "integer", nullable: true),
                    rank_all_time = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_nation_seasons", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "nations",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    code = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    points = table.Column<int>(type: "integer", nullable: false),
                    active_points = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_nations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "race_classes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    sorting_index = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_race_classes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "meta_races",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    color_hex = table.Column<string>(type: "text", nullable: true),
                    dark_text = table.Column<bool>(type: "boolean", nullable: false),
                    nation_id = table.Column<int>(type: "integer", nullable: true),
                    image_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_meta_races", x => x.id);
                    table.ForeignKey(
                        name: "fk_meta_races_images_image_id",
                        column: x => x.image_id,
                        principalTable: "images",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_meta_races_nations_nation_id",
                        column: x => x.nation_id,
                        principalTable: "nations",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "teams",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    nation_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_teams", x => x.id);
                    table.ForeignKey(
                        name: "fk_teams_nations_nation_id",
                        column: x => x.nation_id,
                        principalTable: "nations",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "point_system",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    points = table.Column<int>(type: "integer", nullable: false),
                    race_class_id = table.Column<int>(type: "integer", nullable: false),
                    result_type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_point_system", x => x.id);
                    table.ForeignKey(
                        name: "fk_point_system_race_classes_race_class_id",
                        column: x => x.race_class_id,
                        principalTable: "race_classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "races",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    active_span_string = table.Column<string>(type: "text", nullable: true),
                    race_class_id = table.Column<int>(type: "integer", nullable: false),
                    meta_race_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_races", x => x.id);
                    table.ForeignKey(
                        name: "fk_races_meta_races_meta_race_id",
                        column: x => x.meta_race_id,
                        principalTable: "meta_races",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_races_race_classes_race_class_id",
                        column: x => x.race_class_id,
                        principalTable: "race_classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "riders",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    first_name = table.Column<string>(type: "text", nullable: true),
                    last_name = table.Column<string>(type: "text", nullable: false),
                    year = table.Column<int>(type: "integer", nullable: true),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    nation_id = table.Column<int>(type: "integer", nullable: false),
                    team_id = table.Column<int>(type: "integer", nullable: true),
                    points = table.Column<int>(type: "integer", nullable: false),
                    image_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_riders", x => x.id);
                    table.ForeignKey(
                        name: "fk_riders_images_image_id",
                        column: x => x.image_id,
                        principalTable: "images",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_riders_nations_nation_id",
                        column: x => x.nation_id,
                        principalTable: "nations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_riders_teams_team_id",
                        column: x => x.team_id,
                        principalTable: "teams",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "calendar",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    start_date = table.Column<DateOnly>(type: "date", nullable: false),
                    end_date = table.Column<DateOnly>(type: "date", nullable: false),
                    race_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_calendar", x => x.id);
                    table.ForeignKey(
                        name: "fk_calendar_races_race_id",
                        column: x => x.race_id,
                        principalTable: "races",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "race_dates",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    stage = table.Column<int>(type: "integer", nullable: true),
                    date = table.Column<DateOnly>(type: "date", nullable: false),
                    race_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_race_dates", x => x.id);
                    table.ForeignKey(
                        name: "fk_race_dates_races_race_id",
                        column: x => x.race_id,
                        principalTable: "races",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "previous_nationalities",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    start_year = table.Column<int>(type: "integer", nullable: true),
                    end_year = table.Column<int>(type: "integer", nullable: true),
                    rider_id = table.Column<int>(type: "integer", nullable: false),
                    nation_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_previous_nationalities", x => x.id);
                    table.ForeignKey(
                        name: "fk_previous_nationalities_nations_nation_id",
                        column: x => x.nation_id,
                        principalTable: "nations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_previous_nationalities_riders_rider_id",
                        column: x => x.rider_id,
                        principalTable: "riders",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "rider_seasons",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rider_id = table.Column<int>(type: "integer", nullable: false),
                    year = table.Column<int>(type: "integer", nullable: false),
                    points_for_year = table.Column<int>(type: "integer", nullable: true),
                    points_all_time = table.Column<int>(type: "integer", nullable: false),
                    rank_for_year = table.Column<int>(type: "integer", nullable: true),
                    rank_all_time = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_rider_seasons", x => x.id);
                    table.ForeignKey(
                        name: "fk_rider_seasons_riders_rider_id",
                        column: x => x.rider_id,
                        principalTable: "riders",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "results",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    year = table.Column<int>(type: "integer", nullable: false),
                    placement = table.Column<int>(type: "integer", nullable: true),
                    stage = table.Column<int>(type: "integer", nullable: true),
                    sheet_index = table.Column<int>(type: "integer", nullable: false),
                    result_type = table.Column<int>(type: "integer", nullable: false),
                    race_id = table.Column<int>(type: "integer", nullable: false),
                    rider_id = table.Column<int>(type: "integer", nullable: false),
                    rider_season_id = table.Column<long>(type: "bigint", nullable: false),
                    nation_season_id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_results", x => x.id);
                    table.ForeignKey(
                        name: "fk_results_nation_seasons_nation_season_id",
                        column: x => x.nation_season_id,
                        principalTable: "nation_seasons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_results_races_race_id",
                        column: x => x.race_id,
                        principalTable: "races",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_results_rider_seasons_rider_season_id",
                        column: x => x.rider_season_id,
                        principalTable: "rider_seasons",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_results_riders_rider_id",
                        column: x => x.rider_id,
                        principalTable: "riders",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_calendar_race_id",
                table: "calendar",
                column: "race_id");

            migrationBuilder.CreateIndex(
                name: "ix_meta_races_image_id",
                table: "meta_races",
                column: "image_id");

            migrationBuilder.CreateIndex(
                name: "ix_meta_races_nation_id",
                table: "meta_races",
                column: "nation_id");

            migrationBuilder.CreateIndex(
                name: "ix_point_system_race_class_id",
                table: "point_system",
                column: "race_class_id");

            migrationBuilder.CreateIndex(
                name: "ix_previous_nationalities_nation_id",
                table: "previous_nationalities",
                column: "nation_id");

            migrationBuilder.CreateIndex(
                name: "ix_previous_nationalities_rider_id",
                table: "previous_nationalities",
                column: "rider_id");

            migrationBuilder.CreateIndex(
                name: "ix_race_dates_race_id",
                table: "race_dates",
                column: "race_id");

            migrationBuilder.CreateIndex(
                name: "ix_races_meta_race_id",
                table: "races",
                column: "meta_race_id");

            migrationBuilder.CreateIndex(
                name: "ix_races_race_class_id",
                table: "races",
                column: "race_class_id");

            migrationBuilder.CreateIndex(
                name: "ix_results_nation_season_id",
                table: "results",
                column: "nation_season_id");

            migrationBuilder.CreateIndex(
                name: "ix_results_race_id",
                table: "results",
                column: "race_id");

            migrationBuilder.CreateIndex(
                name: "ix_results_rider_id",
                table: "results",
                column: "rider_id");

            migrationBuilder.CreateIndex(
                name: "ix_results_rider_season_id",
                table: "results",
                column: "rider_season_id");

            migrationBuilder.CreateIndex(
                name: "ix_rider_seasons_rider_id",
                table: "rider_seasons",
                column: "rider_id");

            migrationBuilder.CreateIndex(
                name: "ix_riders_image_id",
                table: "riders",
                column: "image_id");

            migrationBuilder.CreateIndex(
                name: "ix_riders_nation_id",
                table: "riders",
                column: "nation_id");

            migrationBuilder.CreateIndex(
                name: "ix_riders_team_id",
                table: "riders",
                column: "team_id");

            migrationBuilder.CreateIndex(
                name: "ix_teams_nation_id",
                table: "teams",
                column: "nation_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "calendar");

            migrationBuilder.DropTable(
                name: "point_system");

            migrationBuilder.DropTable(
                name: "previous_nationalities");

            migrationBuilder.DropTable(
                name: "race_dates");

            migrationBuilder.DropTable(
                name: "results");

            migrationBuilder.DropTable(
                name: "nation_seasons");

            migrationBuilder.DropTable(
                name: "races");

            migrationBuilder.DropTable(
                name: "rider_seasons");

            migrationBuilder.DropTable(
                name: "meta_races");

            migrationBuilder.DropTable(
                name: "race_classes");

            migrationBuilder.DropTable(
                name: "riders");

            migrationBuilder.DropTable(
                name: "images");

            migrationBuilder.DropTable(
                name: "teams");

            migrationBuilder.DropTable(
                name: "nations");
        }
    }
}
