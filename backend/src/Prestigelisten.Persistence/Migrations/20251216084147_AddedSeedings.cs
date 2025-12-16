using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Prestigelisten.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedSeedings : Migration
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
                name: "id",
                table: "rider_seasons",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "rider_season_id",
                table: "results",
                type: "integer",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "nation_season_id",
                table: "results",
                type: "integer",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<int>(
                name: "race_date_id",
                table: "results",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "nation_seasons",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "nation_id",
                table: "nation_seasons",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "meta_races",
                columns: new[] { "id", "color_hex", "dark_text", "image_id", "name", "nation_id" },
                values: new object[,]
                {
                    { 225, null, false, null, "OL i enkeltstart", null },
                    { 226, null, false, null, "OL 12 timers løb", null },
                    { 227, "#ededed", true, null, "VM i linjeløb", null },
                    { 228, "#ededed", true, null, "VM i enkeltstart", null },
                    { 229, "#004494", false, null, "EM i linjeløb", null },
                    { 230, "#004494", false, null, "EM i enkeltstart", null },
                    { 231, null, false, null, "OL i linjeløb", null },
                    { 289, "#ededed", false, null, "VM (amatør)", null }
                });

            migrationBuilder.InsertData(
                table: "nations",
                columns: new[] { "id", "active", "active_points", "code", "name", "points" },
                values: new object[,]
                {
                    { 1, true, 0, "it", "Italien", 0 },
                    { 2, true, 0, "be", "Belgien", 0 },
                    { 3, true, 0, "fr", "Frankrig", 0 },
                    { 4, true, 0, "es", "Spanien", 0 },
                    { 5, true, 0, "nl", "Nederlandene", 0 },
                    { 6, true, 0, "ch", "Schweiz", 0 },
                    { 7, true, 0, "de", "Tyskland", 0 },
                    { 8, true, 0, "gb", "Storbritannien", 0 },
                    { 9, true, 0, "us", "USA", 0 },
                    { 10, true, 0, "au", "Australien", 0 },
                    { 11, true, 0, "lu", "Luxembourg", 0 },
                    { 12, true, 0, "co", "Colombia", 0 },
                    { 13, true, 0, "ie", "Irland", 0 },
                    { 14, true, 0, "dk", "Danmark", 0 },
                    { 15, true, 0, "si", "Slovenien", 0 },
                    { 16, true, 0, "ru", "Rusland", 0 },
                    { 17, true, 0, "no", "Norge", 0 },
                    { 18, true, 0, "sk", "Slovakiet", 0 },
                    { 19, true, 0, "pt", "Portugal", 0 },
                    { 20, true, 0, "pl", "Polen", 0 },
                    { 21, true, 0, "kz", "Kasakhstan", 0 },
                    { 22, true, 0, "se", "Sverige", 0 },
                    { 23, true, 0, "ua", "Ukraine", 0 },
                    { 24, true, 0, "at", "Østrig", 0 },
                    { 25, true, 0, "cz", "Tjekkiet", 0 },
                    { 26, true, 0, "ca", "Canada", 0 },
                    { 27, true, 0, "ec", "Ecuador", 0 },
                    { 28, true, 0, "lv", "Letland", 0 },
                    { 29, false, 0, "su", "Sovjetunionen", 0 },
                    { 30, true, 0, "uz", "Usbekistan", 0 },
                    { 31, true, 0, "lt", "Litauen", 0 },
                    { 32, true, 0, "za", "Sydafrika", 0 },
                    { 33, true, 0, "mx", "Mexico", 0 },
                    { 34, true, 0, "ee", "Estland", 0 },
                    { 35, true, 0, "by", "Belarus", 0 },
                    { 36, true, 0, "ve", "Venezuela", 0 },
                    { 37, false, 0, "dd", "Østtyskland", 0 },
                    { 38, true, 0, "md", "Moldova", 0 },
                    { 39, true, 0, "nz", "New Zealand", 0 },
                    { 40, true, 0, "ar", "Argentina", 0 },
                    { 41, true, 0, "er", "Eritrea", 0 },
                    { 42, true, 0, "cr", "Costa Rica", 0 },
                    { 43, true, 0, "hu", "Ungarn", 0 },
                    { 44, true, 0, "br", "Brasilien", 0 },
                    { 45, true, 0, "gr", "Grækenland", 0 },
                    { 46, true, 0, "hr", "Kroatien", 0 },
                    { 47, true, 0, "jp", "Japan", 0 },
                    { 48, true, 0, "bg", "Bulgarien", 0 },
                    { 49, true, 0, "fi", "Finland", 0 },
                    { 50, true, 0, "dz", "Algeriet", 0 },
                    { 51, true, 0, "ae", "UAE", 0 },
                    { 52, true, 0, "cn", "Kina", 0 },
                    { 53, true, 0, "tr", "Tyrkiet", 0 },
                    { 54, true, 0, "bh", "Bahrain", 0 },
                    { 55, true, 0, "il", "Israel", 0 },
                    { 56, true, 0, "ph", "Filippinerne", 0 }
                });

            migrationBuilder.InsertData(
                table: "race_classes",
                columns: new[] { "id", "name", "sorting_index" },
                values: new object[,]
                {
                    { 1, "Tour de France", 1 },
                    { 2, "Grand Tour", 2 },
                    { 3, "Monument", 4 },
                    { 4, "WTT A", 5 },
                    { 5, "WTC A", 6 },
                    { 6, "WTT B", 7 },
                    { 7, "WTC B", 8 },
                    { 8, "WTT C", 9 },
                    { 9, "WTC C", 10 },
                    { 10, "WTT D", 11 },
                    { 11, "WTC D", 12 },
                    { 12, "Nationale mesterskaber A", 24 },
                    { 13, "Nationale mesterskaber i ITT A", 25 },
                    { 14, "Nationale mesterskaber B", 26 },
                    { 15, "Nationale mesterskaber i ITT B", 27 },
                    { 16, "OL", 13 },
                    { 17, "OL ITT", 14 },
                    { 18, "VM", 17 },
                    { 19, "VM ITT", 18 },
                    { 20, "EM", 20 },
                    { 21, "EM ITT", 21 },
                    { 22, "OL (amatør)", 15 },
                    { 23, "OL ITT (amatør)", 16 },
                    { 24, "Parløb", 22 },
                    { 25, "Andre", 23 },
                    { 26, "Grand Tour B", 3 },
                    { 27, "VM (amatør)", 19 }
                });

            migrationBuilder.InsertData(
                table: "teams",
                columns: new[] { "id", "name", "nation_id" },
                values: new object[,]
                {
                    { 6, "Kinan Racing Team", null },
                    { 7, "Toscana Factory Team Vini Fantini", null },
                    { 9, "Petrolike", null },
                    { 10, "REMBE | rad-net", null },
                    { 12, "Orgullo Paisa", null },
                    { 13, "Factor Racing", null }
                });

            migrationBuilder.InsertData(
                table: "meta_races",
                columns: new[] { "id", "color_hex", "dark_text", "image_id", "name", "nation_id" },
                values: new object[,]
                {
                    { 1, "#ffff00", true, null, "Tour de France", 3 },
                    { 2, "#da291c", false, null, "Vuelta a España", 4 },
                    { 3, "#FF276E", false, null, "Giro d'Italia", 1 },
                    { 4, "#fce201", true, null, "Ronde van Vlaanderen", 2 },
                    { 5, "#ff0000", false, null, "Paris-Roubaix", 3 },
                    { 7, "#ff7b4d", false, null, "Milano-Sanremo", 1 },
                    { 8, "#12b362", false, null, "Il Lombardia", 1 },
                    { 9, "#009790", false, null, "Paris-Tours", 3 },
                    { 11, null, false, null, "Grand Prix Wolber", 3 },
                    { 12, null, false, null, "Cuca Cocoa Cup", 8 },
                    { 14, null, false, null, "Bol d'Or", 3 },
                    { 15, null, false, null, "Paris-Brest-Paris", 3 },
                    { 16, "#003866", false, null, "Tirreno-Adriatico", 1 },
                    { 17, "#e30c13", false, null, "Tour de Romandie", 6 },
                    { 18, "#0092cf", false, null, "Paris-Nice", 3 },
                    { 19, "#a61c2a", false, null, "Tour de Suisse", 6 },
                    { 20, "#d64c13", false, null, "Criterium du Dauphiné", 3 },
                    { 21, "#be2423", false, null, "Itzulia Basque Country", 4 },
                    { 22, "#ce122b", false, null, "Volta Ciclista a Catalunya", 4 },
                    { 23, null, false, null, "La Course du Tour de France", 3 },
                    { 24, "#e94f35", false, null, "Gent-Wevelgem", 2 },
                    { 25, "#ac9d6e", false, null, "Fleche Wallonne", 2 },
                    { 26, "#b0354a", false, null, "Strade Bianche", 1 },
                    { 28, "#407900", false, null, "Amstel Gold Race", 5 },
                    { 29, "#00491f", false, null, "Liège-Bastogne-Liège", 2 },
                    { 32, null, false, null, "Berlin-Cottbus-Berlin", 7 },
                    { 33, null, false, null, "Gran Fondo - La Seicento", 1 },
                    { 34, null, false, null, "Lyon-Paris-Lyon", 3 },
                    { 35, null, false, null, "Circuit de Paris", 3 },
                    { 36, null, false, null, "Bordeaux-Paris-Bordeaux", 3 },
                    { 38, null, false, null, "Roma-Napoli-Roma", 1 },
                    { 42, "#2c2c2c", false, null, "Tour de Pologne", 20 },
                    { 45, null, false, null, "Giro di Sicilia", 1 },
                    { 46, null, false, null, "Paris - Saint-Etienne", 3 },
                    { 47, null, false, null, "Circuit des Champs de Bataille", 3 },
                    { 48, null, false, null, "Circuit de France", 3 },
                    { 49, null, false, null, "Völkerschlacht-Jubiläumsfahrt", 7 },
                    { 50, null, false, null, "Ronde de France", 3 },
                    { 53, "#61c3d9", true, null, "Dwars door Vlaanderen", 2 },
                    { 54, "#011e41", false, null, "BEMER Cyclassics", 7 },
                    { 55, "#237AEB", false, null, "E3 Saxo Classic", 2 },
                    { 58, null, false, null, "Grand Prix des Nations", 3 },
                    { 59, null, false, null, "North Road 100", 8 },
                    { 60, null, false, null, "Paris-Spa", 2 },
                    { 61, null, false, null, "Marseille-Paris", 3 },
                    { 62, null, false, null, "Rund um Berlin", 7 },
                    { 63, null, false, null, "Paris-Rennes", 3 },
                    { 64, null, false, null, "Wien-Graz-Triest", 24 },
                    { 65, null, false, null, "Paris-Nantes-Paris", 3 },
                    { 66, "#407900", false, null, "Tour of the Alps", 1 },
                    { 67, "#e4362d", false, null, "Tour of Guangxi", 52 },
                    { 72, "#E73743", false, null, "UAE Tour", 51 },
                    { 73, "#78BE20", false, null, "Renewi Tour", 2 },
                    { 74, null, false, null, "G.P. Sporting", 3 },
                    { 77, null, false, null, "Tour du Sud-Est", 3 },
                    { 78, null, false, null, "Tour of Beijing", 52 },
                    { 79, "#e01021", false, null, "Deutschland Tour", 7 },
                    { 83, null, false, null, "Paris-Luxembourg", 11 },
                    { 84, null, false, null, "Presidential Cycling Tour of Turkey", 53 },
                    { 86, "#ffff00", true, null, "Bretagne Classic - Ouest-France", 3 },
                    { 87, "#cbdb2a", true, null, "Grand Prix Cycliste de Quebec", 26 },
                    { 88, "#e01021", false, null, "Eschborn-Frankfurt", 7 },
                    { 89, "#ccd93e", true, null, "Grand Prix Cycliste de Montreal", 26 },
                    { 90, "#00b1ff", false, null, "Cadel Evans Great Ocean Road Race", 10 },
                    { 91, "#ff4050", false, null, "Milano-Torino", 1 },
                    { 94, "#00A8E7", false, null, "Donostia San Sebastian Klasikoa", 4 },
                    { 97, null, false, null, "G.P. Stan Ockers", 3 },
                    { 98, null, false, null, "Grand Prix de Lunel", 3 },
                    { 99, null, false, null, "Grand Prix des Amériques", 3 },
                    { 101, null, false, null, "Marseille-Lyon", 3 },
                    { 102, null, false, null, "Milano-Modena", 1 },
                    { 103, null, false, null, "Nord-West Schweizer Rundfahrt", 6 },
                    { 104, null, false, null, "Paris-Menin", 3 },
                    { 105, null, false, null, "Bordeaux-Paris", 3 },
                    { 106, null, false, null, "Giro di Romagna", 1 },
                    { 107, null, false, null, "Wien-Berlin", 7 },
                    { 108, null, false, null, "Wincanton Classic", 8 },
                    { 109, null, false, null, "Zürich-München", 7 },
                    { 111, null, false, null, "Rund um Spessart und Rhön", 7 },
                    { 113, "#e32d33", false, null, "Gran Piemonte", 1 },
                    { 114, null, false, null, "Genoa-Nice", 3 },
                    { 115, "#3b8ced", false, null, "Volta a la Communitat Valenciana", 4 },
                    { 116, "#000D6E", false, null, "Baloise Belgium Tour", 2 },
                    { 118, "#003b6f", false, null, "Tour of Britain", 8 },
                    { 119, null, false, null, "4 Jours de Dunkerque", 3 },
                    { 120, "#ff671d", false, null, "Tour Down Under", 10 },
                    { 124, null, false, null, "Criterium International", 3 },
                    { 125, null, false, null, "Giro del Lazio", 1 },
                    { 128, null, false, null, "Tour de l'Avenir", 3 },
                    { 129, null, false, null, "Tour of California", 9 },
                    { 130, null, false, null, "Tour de l'Ouest", 3 },
                    { 133, null, false, null, "Setmana-Catalana", 4 },
                    { 134, null, false, null, "GP du Midi-Libre", 3 },
                    { 135, "#b91817", false, null, "Kuurne-Bruxelles-Kuurne", 2 },
                    { 137, "#afca0b", true, null, "Scheldeprijs", 2 },
                    { 138, "#c10b25", false, null, "Brabantse Pijl", 2 },
                    { 140, "#8ccaae", true, null, "Brussels Cycling Classic", 2 },
                    { 141, null, false, null, "Giro dell'Emilia", 1 },
                    { 142, "#e30613", false, null, "Tre Valli Varesine", 1 },
                    { 145, "#f37822", false, null, "Classic Brugge-De Panne", 2 },
                    { 147, "#242857", false, null, "Omloop Het Nieuwsblad", 2 },
                    { 155, null, false, null, "Grosser Sachsenpreis", 7 },
                    { 156, null, false, null, "Japan Cup Cycle Road Race", 47 },
                    { 158, null, false, null, "Circuit de Belgique", 2 },
                    { 159, null, false, null, "Paris-Clermont-Ferrand", 3 },
                    { 162, null, false, null, "Prudential RideLondon-Surrey Classic", 8 },
                    { 163, null, false, null, "Züri-Metzgete", 6 },
                    { 164, null, false, null, "North Road 24 Hour Road Race", 8 },
                    { 168, "#0055A4", false, null, "Fransk mester", 3 },
                    { 169, "#EF3340", false, null, "Spansk mester", 4 },
                    { 170, "#0098d4", false, null, "Belgisk mester", 2 },
                    { 171, "#F36C21", false, null, "Nederlandsk mester", 5 },
                    { 172, "#0A36AF", false, null, "Italiensk mester", 1 },
                    { 173, "#EF3340", false, null, "Spansk mester i enkeltstart", 4 },
                    { 174, "#0055A4", false, null, "Fransk mester i enkeltstart", 3 },
                    { 175, "#0098d4", false, null, "Belgisk mester i enkeltstart", 2 },
                    { 176, "#0A36AF", false, null, "Italiensk mester i enkeltstart", 1 },
                    { 177, "#F36C21", false, null, "Nederlandsk mester i enkeltstart", 5 },
                    { 178, "#003087", false, null, "Colombiansk mester", 12 },
                    { 179, "#FFD100", false, null, "Ecuadoriansk mester", 27 },
                    { 180, "#6dbd45", false, null, "Australsk mester", 10 },
                    { 181, "#2c2c2c", false, null, "Tysk mester", 7 },
                    { 182, "#BA0C2F", false, null, "Norsk mester", 17 },
                    { 183, "#B22234", false, null, "Amerikansk mester", 9 },
                    { 184, "#DA291C", false, null, "Portugisisk mester", 19 },
                    { 185, "#DA291C", false, null, "Schweizisk mester", 6 },
                    { 186, "#C7EA46", false, null, "Slovensk mester", 15 },
                    { 187, "#E40046", false, null, "Tjekkisk mester", 25 },
                    { 188, "#DA291C", false, null, "Dansk mester", 14 },
                    { 189, "#ed2939", false, null, "Østrigsk mester", 24 },
                    { 190, "#012169", false, null, "Britisk mester", 8 },
                    { 191, null, false, null, "Irsk mester", 13 },
                    { 192, null, false, null, "Canadisk mester", 26 },
                    { 193, null, false, null, "Belarusisk mester", 35 },
                    { 194, null, false, null, "Kasakhisk mester", 21 },
                    { 195, null, false, null, "Litauisk mester", 31 },
                    { 196, null, false, null, "Russisk mester", 16 },
                    { 197, null, false, null, "Svensk mester", 22 },
                    { 198, null, false, null, "Polsk mester", 20 },
                    { 199, null, false, null, "Ukrainsk mester", 23 },
                    { 200, null, false, null, "Luxembourgsk mester", 11 },
                    { 201, "#003087", false, null, "Colombiansk mester i enkeltstart", 12 },
                    { 202, "#FFD100", false, null, "Ecuadoriansk mester i enkeltstart", 27 },
                    { 203, "#BA0C2F", false, null, "Norsk mester i enkeltstart", 17 },
                    { 204, "#6dbd45", false, null, "Australsk mester i enkeltstart", 10 },
                    { 205, "#DA291C", false, null, "Schweizisk mester i enkeltstart", 6 },
                    { 206, "#E40046", false, null, "Tjekkisk mester i enkeltstart", 25 },
                    { 207, "#2c2c2c", false, null, "Tysk mester i enkeltstart", 7 },
                    { 208, "#DA291C", false, null, "Dansk mester i enkeltstart", 14 },
                    { 209, "#C7EA46", false, null, "Slovensk mester i enkeltstart", 15 },
                    { 210, "#DA291C", false, null, "Portugisisk mester i enkeltstart", 19 },
                    { 211, "#ed2939", false, null, "Østrigsk mester i enkeltstart", 24 },
                    { 212, "#B22234", false, null, "Amerikansk mester i enkeltstart", 9 },
                    { 213, "#012169", false, null, "Britisk mester i enkeltstart", 8 },
                    { 214, null, false, null, "Litauisk mester i enkeltstart", 31 },
                    { 215, null, false, null, "Polsk mester i enkeltstart", 20 },
                    { 216, null, false, null, "Russisk mester i enkeltstart", 16 },
                    { 217, null, false, null, "Ukrainsk mester i enkeltstart", 23 },
                    { 218, null, false, null, "Belarusisk mester i enkeltstart", 35 },
                    { 219, null, false, null, "Luxembourgsk mester i enkeltstart", 11 },
                    { 220, null, false, null, "Canadisk mester i enkeltstart", 26 },
                    { 221, null, false, null, "Kasakhisk mester i enkeltstart", 21 },
                    { 222, null, false, null, "Svensk mester i enkeltstart", 22 },
                    { 223, null, false, null, "Irsk mester i enkeltstart", 13 },
                    { 233, "#02B3E4", false, null, "Trofeo Baracchi", 1 },
                    { 234, null, false, null, "48 Hours Race North Shields", 8 },
                    { 235, null, false, null, "50 Miles Professional Championship", 8 },
                    { 236, null, false, null, "Amsterdam-Arnhem-Amsterdam", 5 },
                    { 237, null, false, null, "Anerley C.C. 24 hours race", 8 },
                    { 238, null, false, null, "Angers-Tours-Angers", 3 },
                    { 239, null, false, null, "Berlin-Hamburg", 7 },
                    { 240, null, false, null, "Championship of Britain", 8 },
                    { 241, null, false, null, "Caen-Cherbourg-Caen", 3 },
                    { 242, null, false, null, "Clarksville 100 Mile Road Race", 9 },
                    { 243, null, false, null, "Classique des Alpes", 3 },
                    { 244, null, false, null, "Coors Classic", 9 },
                    { 245, "#00ab4c", false, null, "Copenhagen Sprint", 14 },
                    { 246, null, false, null, "Corsa delle Tre Capitali", 1 },
                    { 247, null, false, null, "Derby Du Nord", 3 },
                    { 248, null, false, null, "Facile 24 Hours Race", 8 },
                    { 249, null, false, null, "GP de Fourmies", 3 },
                    { 250, null, false, null, "Giro di Campania", 1 },
                    { 251, null, false, null, "Grafenstaden-St. Ludvig-Grafenstaden", 3 },
                    { 252, null, false, null, "Grand Course International de la Union Sportive", 3 },
                    { 253, null, false, null, "Krakow-Lwow", 20 },
                    { 254, null, false, null, "Köln-Breslau", 7 },
                    { 255, null, false, null, "Le Mans-Paris", 3 },
                    { 256, null, false, null, "London T.C. 24", 8 },
                    { 257, null, false, null, "Louviers-Chartres-Louviers", 3 },
                    { 258, null, false, null, "Lyon-Montélimar-Lyon", 3 },
                    { 259, null, false, null, "Maastricht-Nijmegen-Maastricht", 5 },
                    { 260, null, false, null, "Melbourne 24 hours", 10 },
                    { 261, null, false, null, "Melbourne 6x6 Hours Race", 10 },
                    { 262, null, false, null, "Monaco-Paris", 3 },
                    { 263, null, false, null, "N.C.U. 50 Championship", 8 },
                    { 264, null, false, null, "New York 26 Hours", 9 },
                    { 265, null, false, null, "Paris - Bar-le-duc", 3 },
                    { 266, null, false, null, "Paris - Saint-Malo", 3 },
                    { 267, null, false, null, "Paris-Dieppe-Paris", 3 },
                    { 268, null, false, null, "Paris-Dinant", 3 },
                    { 269, null, false, null, "Philadelphia 72 Hours Race", 9 },
                    { 270, null, false, null, "Quer durch Thüringen", 7 },
                    { 271, null, false, null, "Roma-Trieste", 1 },
                    { 272, null, false, null, "Rund um Mitteldeutschland", 7 },
                    { 273, null, false, null, "Sankt Peterburg-Moskva", 16 },
                    { 274, null, false, null, "Six Days Aberdeen", 8 },
                    { 275, null, false, null, "Six Days Boston", 9 },
                    { 276, null, false, null, "Six Days London", 8 },
                    { 277, null, false, null, "Six Days Melbourne", 10 },
                    { 278, null, false, null, "Six Days New York", 9 },
                    { 279, null, false, null, "Six Days Sydney", 10 },
                    { 280, null, false, null, "Springfield Professional 10", 9 },
                    { 281, null, false, null, "Springfield Professional 20", 9 },
                    { 282, null, false, null, "Stanley C.C. 24 hour road race", 9 },
                    { 283, null, false, null, "Sydney-Melbourne", 10 },
                    { 284, null, false, null, "Toulouse-Bordeaux-Toulouse", 3 },
                    { 285, null, false, null, "Toulouse-Béziers-Toulouse", 3 },
                    { 286, null, false, null, "Tour d'Europe", 3 },
                    { 287, null, false, null, "Tour de la Nouvelle France", 3 },
                    { 288, null, false, null, "Tour of Ireland", 13 },
                    { 290, null, false, null, "Wien-Reichenberg", 24 },
                    { 291, null, false, null, "Zürich-Berlin", 7 },
                    { 292, null, false, null, "100 Miles Professional Championship of Britain", 8 },
                    { 293, null, false, null, "24 heures de Bordeaux", 3 },
                    { 294, null, false, null, "24 heures de Buffalo", 3 },
                    { 295, null, false, null, "24 heures de Verviers", 2 },
                    { 296, null, false, null, "24 heures du Palais des Arts Libereaux", 3 },
                    { 297, null, false, null, "Driedaagse Van Antwerpen", 2 },
                    { 298, null, false, null, "Dunlop Grand Prix", 8 },
                    { 299, null, false, null, "France-Championnat de fond", 3 },
                    { 300, null, false, null, "Milano-München", 7 },
                    { 301, null, false, null, "Six Days Memphis", 9 },
                    { 302, "#000000", false, null, "Newzealandsk mester", 39 },
                    { 303, "#000000", false, null, "Newzealandsk mester i enkeltstart", 39 }
                });

            migrationBuilder.InsertData(
                table: "point_system",
                columns: new[] { "id", "points", "race_class_id", "result_type" },
                values: new object[,]
                {
                    { 80, 110, 1, 1 },
                    { 81, 40, 1, 2 },
                    { 82, 18, 1, 3 },
                    { 83, 7, 1, 4 },
                    { 84, 18, 1, 5 },
                    { 85, 18, 1, 6 },
                    { 86, 12, 1, 7 },
                    { 87, 6, 1, 8 },
                    { 88, 3, 1, 9 },
                    { 89, 2, 1, 10 },
                    { 90, 1, 1, 11 },
                    { 91, 70, 2, 1 },
                    { 92, 25, 2, 2 },
                    { 93, 11, 2, 3 },
                    { 94, 4, 2, 4 },
                    { 95, 11, 2, 5 },
                    { 96, 11, 2, 6 },
                    { 97, 8, 2, 7 },
                    { 98, 3, 2, 8 },
                    { 99, 2, 2, 9 },
                    { 100, 1, 2, 11 },
                    { 101, 50, 3, 1 },
                    { 102, 13, 3, 2 },
                    { 103, 4, 3, 3 },
                    { 104, 25, 4, 1 },
                    { 105, 5, 4, 2 },
                    { 106, 3, 4, 7 },
                    { 107, 20, 5, 1 },
                    { 108, 4, 5, 2 },
                    { 109, 15, 6, 1 },
                    { 110, 3, 6, 2 },
                    { 111, 2, 6, 7 },
                    { 112, 14, 7, 1 },
                    { 113, 2, 7, 2 },
                    { 114, 8, 8, 1 },
                    { 115, 8, 9, 1 },
                    { 116, 4, 10, 1 },
                    { 117, 4, 11, 1 },
                    { 118, 5, 12, 1 },
                    { 119, 2, 13, 1 },
                    { 120, 3, 14, 1 },
                    { 121, 1, 15, 1 },
                    { 122, 65, 16, 12 },
                    { 123, 30, 16, 13 },
                    { 124, 25, 16, 14 },
                    { 125, 40, 17, 12 },
                    { 126, 20, 17, 13 },
                    { 127, 16, 17, 14 },
                    { 128, 80, 18, 12 },
                    { 129, 23, 18, 13 },
                    { 130, 17, 18, 14 },
                    { 131, 4, 18, 3 },
                    { 132, 35, 19, 12 },
                    { 133, 10, 19, 13 },
                    { 134, 7, 19, 14 },
                    { 135, 18, 20, 12 },
                    { 136, 3, 20, 13 },
                    { 137, 2, 20, 14 },
                    { 138, 10, 21, 12 },
                    { 139, 2, 21, 13 },
                    { 140, 1, 21, 14 },
                    { 141, 20, 22, 12 },
                    { 142, 8, 22, 13 },
                    { 143, 5, 22, 14 },
                    { 144, 15, 23, 12 },
                    { 145, 6, 23, 13 },
                    { 146, 4, 23, 14 },
                    { 147, 10, 24, 1 },
                    { 148, 2, 24, 2 },
                    { 149, 40, 26, 1 },
                    { 150, 12, 26, 2 },
                    { 151, 4, 26, 3 },
                    { 152, 5, 26, 5 },
                    { 153, 5, 26, 6 },
                    { 154, 5, 26, 7 },
                    { 155, 10, 27, 12 },
                    { 156, 2, 27, 13 },
                    { 157, 1, 27, 14 }
                });

            migrationBuilder.InsertData(
                table: "races",
                columns: new[] { "id", "active", "active_span_string", "meta_race_id", "race_class_id" },
                values: new object[,]
                {
                    { 224, true, "(>1994)", 231, 16 },
                    { 225, true, "(>1994)", 225, 17 },
                    { 226, false, null, 226, 17 },
                    { 227, true, null, 227, 18 },
                    { 228, true, null, 228, 19 },
                    { 229, true, null, 229, 20 },
                    { 230, true, null, 230, 21 },
                    { 231, false, "(<1994)", 231, 22 },
                    { 232, false, "(<1994)", 225, 23 },
                    { 1832, false, null, 289, 27 }
                });

            migrationBuilder.InsertData(
                table: "teams",
                columns: new[] { "id", "name", "nation_id" },
                values: new object[,]
                {
                    { 1, "UAE Team Emirates - XRG", 51 },
                    { 2, "Red Bull - BORA - hansgrohe", 7 },
                    { 3, "Team Picnic PostNL", 5 },
                    { 4, "Lotto", 2 },
                    { 5, "XDS Astana Team", 21 },
                    { 8, "Unibet Tietema Rockets", 5 },
                    { 11, "Team Polti VisitMalta", 1 },
                    { 2125, "UAE Team Emirates", 51 },
                    { 2126, "Israel - Premier Tech", 55 },
                    { 2127, "BORA - hansgrohe", 7 },
                    { 2128, "Astana Qazaqstan Team", 21 },
                    { 2129, "Soudal - Quick Step", 2 },
                    { 2130, "Movistar Team", 4 },
                    { 2131, "Alpecin-Deceuninck", 2 },
                    { 2132, "Team Visma | Lease a Bike", 5 },
                    { 2133, "INEOS Grenadiers", 8 },
                    { 2134, "EF Education-EasyPost", 9 },
                    { 2135, "Uno-X Mobility", 17 },
                    { 2136, "Team Jayco AlUla", 10 },
                    { 2137, "Team dsm-firmenich Post NL", 5 },
                    { 2138, "Team dsm - firmenich", 5 },
                    { 2139, "Arkéa - B&B Hotels", 3 },
                    { 2140, "Lidl - Trek", 9 },
                    { 2141, "Decathlon AG2R La Mondiale Team", 3 },
                    { 2142, "Cofidis", 3 },
                    { 2143, "Bahrain - Victorious", 54 },
                    { 2144, "Tudor Pro Cycling Team", 6 },
                    { 2145, "Groupama - FDJ", 3 },
                    { 2146, "Lotto Dstny", 2 },
                    { 2147, "Team Medellin - EPM", 12 },
                    { 2148, "Q36.5 Pro Cycling Team", 6 },
                    { 2149, "VF Group - Bardiani CSF - Faizanè", 1 },
                    { 2150, "Intermarché - Wanty", 2 },
                    { 2151, "Nu Colombia", 12 },
                    { 2152, "TotalEnergies", 3 },
                    { 2153, "Corratec", 1 },
                    { 2154, "Equipo Kern Pharma", 4 },
                    { 2155, "Forte Petrolike - Androni Giocattoli", 1 },
                    { 2156, "VolkerWessels Cycling Team", 5 },
                    { 2157, "Team Polti Kometa", 1 },
                    { 2158, "Caja Rural - Seguros RGA", 4 },
                    { 2159, "Euskaltel - Euskadi", 4 },
                    { 2160, "Rad-Net Osswald", 7 },
                    { 2161, "Team Felt - Felbermayr", 24 },
                    { 2162, "TDT-Unibet Cycling Team", 3 },
                    { 2163, "GW Erco Shimano", 12 },
                    { 2164, "Sabgal / Anicolor", 19 },
                    { 2165, "Victoria Sports Pro Cycling Team", 56 },
                    { 2166, "BHS - PL Beton Bornholm", 14 },
                    { 2167, "Elkov - Kasper", 25 },
                    { 2168, "Santic - Wibatech", 7 },
                    { 2169, "Mazowsze Serce Polski", 20 },
                    { 2170, "Decathlon AG2R La Mondiale Development Team", 3 },
                    { 2171, "Movistar - Best PC", 27 },
                    { 2172, "Team Banco Guayaquil - Ecuador", 27 },
                    { 2173, "Team Skyline", 9 },
                    { 2174, "ATT Investments", 25 }
                });

            migrationBuilder.InsertData(
                table: "race_dates",
                columns: new[] { "id", "date", "race_id", "stage" },
                values: new object[,]
                {
                    { 184, new DateOnly(2025, 9, 21), 228, null },
                    { 185, new DateOnly(2025, 9, 28), 227, null },
                    { 193, new DateOnly(2025, 10, 5), 229, null },
                    { 194, new DateOnly(2025, 10, 1), 230, null }
                });

            migrationBuilder.InsertData(
                table: "races",
                columns: new[] { "id", "active", "active_span_string", "meta_race_id", "race_class_id" },
                values: new object[,]
                {
                    { 1, true, "(>2022)", 302, 14 },
                    { 2, true, "(>2022)", 303, 15 },
                    { 168, true, null, 168, 12 },
                    { 169, true, null, 169, 12 },
                    { 170, true, null, 170, 12 },
                    { 171, true, null, 171, 12 },
                    { 172, true, null, 172, 12 },
                    { 173, true, null, 173, 13 },
                    { 174, true, null, 174, 13 },
                    { 175, true, null, 175, 13 },
                    { 176, true, null, 176, 13 },
                    { 177, true, null, 177, 13 },
                    { 178, true, null, 178, 14 },
                    { 179, true, "(2021-2024)", 179, 14 },
                    { 180, true, "(1984-1994 + 1996 + >1997)", 180, 14 },
                    { 181, true, "(<1942 + 1947-1956 + 1959-1975 + >1978)", 181, 14 },
                    { 182, true, "(1990 + >2007)", 182, 14 },
                    { 183, true, "(>1998)", 183, 14 },
                    { 184, true, "(1975-1979 + 1984 + 2010-2016 + >2019)", 184, 14 },
                    { 185, true, "(1904 + 1912-1970 + >1975)", 185, 14 },
                    { 186, true, "(>2003)", 186, 14 },
                    { 187, true, "(2001-2005 + >2012)", 187, 14 },
                    { 188, true, "(1968 + 1970-1973 + >1980)", 188, 14 },
                    { 189, true, "(1988-1989 + 2006 + 2008 + >2017)", 189, 14 },
                    { 190, true, "(1965-1967 + 1970-1977 + 1987-1998 + 2000 + 2002 + >2003)", 190, 14 },
                    { 191, true, "(2010-2013 + 2017-2021 + >2023)", 191, 14 },
                    { 192, false, "(2012-2013)", 192, 14 },
                    { 193, false, "(2009-2016)", 193, 14 },
                    { 194, false, "(1998-2012)", 194, 14 },
                    { 195, false, "(2012-2016)", 195, 14 },
                    { 196, false, "(<2022)", 196, 14 },
                    { 197, false, "(1980-1985 + 1999-2003 + 2007-2009 + 2012-2013)", 197, 14 },
                    { 198, false, "(1989-1997 + 1999-2004 + 2012-2022)", 198, 14 },
                    { 199, false, "(1996-2009)", 199, 14 },
                    { 200, false, "(1936-1940 + 1948 + 1950-1961 + 2005-2010 + 2016)", 200, 14 },
                    { 201, true, null, 201, 15 },
                    { 202, true, "(2021-2024)", 202, 15 },
                    { 203, true, "(1990 + >2007)", 203, 15 },
                    { 204, true, null, 204, 15 },
                    { 205, true, null, 205, 15 },
                    { 206, true, "(2001-2005 + >2012)", 206, 15 },
                    { 207, true, null, 207, 15 },
                    { 208, true, "(<1974 + >1980)", 208, 15 },
                    { 209, true, "(>2003)", 209, 15 },
                    { 210, true, "(1975 + 2010-2016 + >2019)", 210, 15 },
                    { 211, true, "(2006 + 2008 + >2017)", 211, 15 },
                    { 212, true, "(1984-1996 + >1998)", 212, 15 },
                    { 213, true, "(<1999 + 2000 + 2002 + >2003)", 213, 15 },
                    { 214, false, "(2012-2016)", 214, 15 },
                    { 215, false, "(1989-1997 + 1999-2004 + 2012-2022)", 215, 15 },
                    { 216, false, "(<2022)", 216, 15 },
                    { 217, false, "(<2010)", 217, 15 },
                    { 218, false, "(2009-2016)", 218, 15 },
                    { 219, false, "(1951 + 2005-2010 + 2016)", 219, 15 },
                    { 220, false, "(2012-2013)", 220, 15 },
                    { 221, false, "(<2013)", 221, 15 },
                    { 222, false, "(1980-1985 + 1999-2003 + 2007-2009 + 2012-2013)", 222, 15 },
                    { 223, true, "(2010-2013 + 2017-2021 + >2023)", 223, 15 },
                    { 233, true, null, 233, 24 },
                    { 1067, false, "(<2008)", 120, 10 },
                    { 1069, true, "(>2007)", 120, 6 },
                    { 1072, true, null, 90, 9 },
                    { 1073, true, "(>2019)", 115, 10 },
                    { 1074, false, "(2017-2018)", 72, 8 },
                    { 1076, true, "(>2018)", 72, 6 },
                    { 1079, false, "(1948-1983 + 1988-2008)", 147, 11 },
                    { 1080, false, "(2009-2016)", 147, 9 },
                    { 1081, true, "(1983-1987 + >2016)", 147, 7 },
                    { 1084, true, "(>2015)", 135, 11 },
                    { 1085, false, "(2015-2016)", 26, 9 },
                    { 1086, true, "(>2016)", 26, 5 },
                    { 1089, false, "(<1962)", 18, 8 },
                    { 1091, true, "(>1961)", 18, 4 },
                    { 1094, false, "(<1974)", 16, 10 },
                    { 1096, false, "(1974-1984)", 16, 6 },
                    { 1100, true, "(>1984)", 16, 4 },
                    { 1103, false, "(<1926)", 91, 7 },
                    { 1106, false, "(1979 + 1988+1990)", 91, 9 },
                    { 1107, true, "(1934-1942 + 1946-1978 + 1980-1987 + >1990)", 91, 11 },
                    { 1108, true, null, 7, 3 },
                    { 1113, false, "(<2018)", 145, 10 },
                    { 1114, false, "2018", 145, 11 },
                    { 1115, true, "(>2018)", 145, 9 },
                    { 1116, false, "(2005-2011)", 55, 11 },
                    { 1117, true, "(>2011)", 55, 7 },
                    { 1120, false, "(1945-1951)", 24, 7 },
                    { 1123, true, "(>1951)", 24, 5 },
                    { 1126, false, "(1926-1936 + 1940-1954)", 22, 10 },
                    { 1127, false, "(1955-1981)", 22, 8 },
                    { 1129, false, "(1982-1996)", 22, 6 },
                    { 1133, true, "(>1996)", 22, 4 },
                    { 1136, false, "(2013-2016)", 53, 11 },
                    { 1137, true, "(>2016)", 53, 7 },
                    { 1140, true, null, 4, 3 },
                    { 1145, true, "(>1940)", 137, 11 },
                    { 1146, false, "(1936-1983)", 21, 8 },
                    { 1148, true, "(<1936 + >1983)", 21, 4 },
                    { 1151, true, null, 5, 3 },
                    { 1156, true, "(>1967)", 138, 11 },
                    { 1157, false, "(<1968)", 28, 11 },
                    { 1158, true, "(>1967)", 28, 5 },
                    { 1161, true, null, 25, 5 },
                    { 1164, true, "(1980-1985 + >2010)", 66, 10 },
                    { 1165, false, "(1908-1910)", 29, 11 },
                    { 1166, false, "(<1895 + 1911-1919 + 1925-1929)", 29, 9 },
                    { 1167, false, "(1920-1924 + 1930-1950)", 29, 5 },
                    { 1170, true, "(>1950)", 29, 3 },
                    { 1175, false, "(<1924 + 1928-1962 + 1989-1994 + 1996-2016)", 88, 11 },
                    { 1176, true, "(1924-1927 + 1963-1988 + 1995 + >2016)", 88, 9 },
                    { 1177, false, "(<1953)", 17, 8 },
                    { 1179, true, "(>1952)", 17, 4 },
                    { 1186, true, null, 3, 2 },
                    { 1198, false, "(1907-1972)", 140, 5 },
                    { 1201, false, "(1973-1988)", 140, 7 },
                    { 1204, true, "(>1988)", 140, 11 },
                    { 1206, true, null, 20, 4 },
                    { 1210, false, "(1910-1921)", 116, 6 },
                    { 1213, true, "(<1910 + 1922-2001 + >2008)", 116, 10 },
                    { 1214, false, "(<1935 + 1941-1942)", 19, 8 },
                    { 1216, true, "(1935-1939 + >1942)", 19, 4 },
                    { 1219, true, null, 245, 9 },
                    { 1225, true, null, 1, 1 },
                    { 1237, false, "(<1985)", 94, 11 },
                    { 1238, false, "(1985-1987)", 94, 9 },
                    { 1239, true, "(>1987)", 94, 5 },
                    { 1242, false, "(1994-2004)", 42, 10 },
                    { 1244, true, "(>2004)", 42, 6 },
                    { 1247, false, "(<1985)", 73, 10 },
                    { 1248, false, "(1985-2004)", 73, 8 },
                    { 1250, true, "(>2004)", 73, 6 },
                    { 1253, true, "(>1997)", 54, 7 },
                    { 1256, false, "(1975-1986 + 1989 + 1991-1996)", 86, 11 },
                    { 1257, true, "(>1996)", 86, 9 },
                    { 1258, false, "(<1927 + 1928-1946 + 2004-2017)", 79, 8 },
                    { 1259, true, "(1927 + 1949-1982 + 2001-2003 + >2017)", 79, 10 },
                    { 1260, true, null, 87, 7 },
                    { 1263, true, null, 89, 7 },
                    { 1267, false, "(<1958)", 2, 6 },
                    { 1271, false, "(1958-1978)", 2, 4 },
                    { 1275, false, "(1979-1994)", 2, 26 },
                    { 1286, true, "(>1994)", 2, 2 },
                    { 1306, true, "(<1928 + 1935-1937 + 1940-1942 + >1945)", 141, 11 },
                    { 1307, true, "(1931-1934 + >1935)", 142, 11 },
                    { 1308, false, "(1934 + 1937-1940 + 1947 + 1949-1951 + 1953 + 1978-1981 + 1983-1994 + 1997)", 113, 9 },
                    { 1309, false, "(1933 + 1945)", 113, 10 },
                    { 1310, true, "(<1908 + 1913 + 1919-1927 + 1929-1930 + 1935-1936 + 1941-1944 + 1946 + 1952 + 1954-1977 + 1982 + 1995-1996 + >1997)", 113, 11 },
                    { 1311, true, null, 8, 3 },
                    { 1316, false, "(<1955)", 9, 3 },
                    { 1321, false, "(1955-2007)", 9, 5 },
                    { 1324, true, "(>2007)", 9, 11 },
                    { 1325, true, null, 67, 8 },
                    { 1400, false, "(<1884)", 292, 9 },
                    { 1401, false, null, 293, 11 },
                    { 1402, false, null, 294, 11 },
                    { 1403, false, null, 295, 9 },
                    { 1404, false, null, 296, 11 },
                    { 1405, false, "(1961 + 1967-1987)", 119, 8 },
                    { 1406, false, "(1957-1960 + 1962-1966 + 1988-2012)", 119, 10 },
                    { 1407, false, null, 234, 11 },
                    { 1408, false, null, 235, 9 },
                    { 1409, false, "(1894)", 236, 11 },
                    { 1410, false, null, 237, 11 },
                    { 1411, false, null, 238, 11 },
                    { 1412, false, "(<1947)", 32, 7 },
                    { 1415, false, "(>1946)", 32, 11 },
                    { 1416, false, "(1889)", 239, 11 },
                    { 1417, false, "(>1924)", 14, 7 },
                    { 1420, false, "(<1946)", 105, 3 },
                    { 1425, false, "(1946-1970)", 105, 5 },
                    { 1428, false, "(1973-1987)", 105, 7 },
                    { 1431, false, "(1988)", 105, 11 },
                    { 1432, false, null, 36, 5 },
                    { 1435, false, null, 241, 11 },
                    { 1436, false, null, 240, 11 },
                    { 1437, false, "(1940)", 158, 9 },
                    { 1438, false, "(1941-1944)", 158, 10 },
                    { 1439, false, "(<1940 + 1945)", 158, 11 },
                    { 1441, false, null, 47, 6 },
                    { 1445, false, null, 48, 6 },
                    { 1448, false, null, 35, 9 },
                    { 1449, false, "(1887)", 242, 11 },
                    { 1450, false, null, 243, 11 },
                    { 1451, false, "(1985 + >1987)", 244, 10 },
                    { 1452, false, "(1986-1987)", 244, 8 },
                    { 1453, false, null, 246, 10 },
                    { 1454, false, "(<1963 + 1967-1977)", 124, 11 },
                    { 1455, false, "(1963-1966 + >1977)", 124, 10 },
                    { 1456, false, null, 12, 3 },
                    { 1461, false, null, 247, 10 },
                    { 1462, false, null, 297, 8 },
                    { 1463, false, null, 298, 10 },
                    { 1464, false, null, 248, 11 },
                    { 1465, false, "(<1886 + >1890)", 299, 11 },
                    { 1466, false, "(1886-1890)", 299, 9 },
                    { 1467, false, "(1910 + 1957-1964)", 114, 9 },
                    { 1468, false, "(1911-1938 + 1954-1956 + 1965-1971 + >1972)", 114, 11 },
                    { 1469, false, "(1934-1936 + 1958)", 125, 10 },
                    { 1470, false, "(1937-1943 + 1947-1954 + 1956-1957 + 1959-1967 + 1969-2008)", 125, 11 },
                    { 1471, false, "(1962)", 250, 9 },
                    { 1472, false, "(<1921 + 1922-1923)", 106, 9 },
                    { 1473, false, "(1921 + 1925-1997)", 106, 11 },
                    { 1475, false, "(<1926)", 45, 6 },
                    { 1478, false, "(1926-1931 + 1939-1976)", 45, 10 },
                    { 1479, false, "(1979)", 249, 9 },
                    { 1480, false, "(1950-1953 + 1955-1957)", 134, 11 },
                    { 1481, false, "(1961 + 1966-1988)", 134, 8 },
                    { 1482, false, "(1954 + 1958-1960 + 1962-1965 + 1989-1995)", 134, 10 },
                    { 1483, false, "(1921)", 74, 8 },
                    { 1484, false, "(<1921 + >1921)", 74, 9 },
                    { 1485, false, null, 97, 9 },
                    { 1486, false, null, 251, 11 },
                    { 1487, false, "(1894)", 33, 9 },
                    { 1488, false, "(1895-1940)", 33, 5 },
                    { 1491, false, "(>1940)", 33, 11 },
                    { 1492, false, null, 252, 11 },
                    { 1493, false, null, 98, 9 },
                    { 1494, false, "(>1988)", 99, 9 },
                    { 1495, false, "(<1994)", 58, 7 },
                    { 1498, false, "(>1993)", 58, 11 },
                    { 1499, false, null, 11, 3 },
                    { 1504, false, "(1912-1914 + 1921-1926)", 155, 9 },
                    { 1505, false, "(1911 + 1920 + >1926)", 155, 11 },
                    { 1506, false, "1996", 156, 9 },
                    { 1507, false, "(<1996 + 1997-2001)", 156, 11 },
                    { 1508, false, null, 253, 11 },
                    { 1509, false, null, 254, 11 },
                    { 1511, false, null, 23, 6 },
                    { 1514, false, null, 255, 11 },
                    { 1515, false, null, 256, 11 },
                    { 1516, false, null, 257, 11 },
                    { 1517, false, null, 258, 11 },
                    { 1518, false, null, 34, 5 },
                    { 1521, false, null, 259, 11 },
                    { 1522, false, "(1930-1937)", 101, 9 },
                    { 1523, false, "(<1930 + >1937)", 101, 11 },
                    { 1524, false, null, 61, 7 },
                    { 1527, false, null, 260, 11 },
                    { 1528, false, null, 261, 11 },
                    { 1529, false, "(<1922 + 1925-1928)", 102, 9 },
                    { 1530, false, "(1922-1924 + 1953-1954)", 102, 11 },
                    { 1531, false, null, 300, 11 },
                    { 1532, false, null, 262, 10 },
                    { 1533, false, "(<1888)", 263, 9 },
                    { 1534, false, "(>1887)", 263, 11 },
                    { 1535, false, null, 264, 11 },
                    { 1536, false, "(<1923)", 103, 11 },
                    { 1537, false, "(>1922)", 103, 9 },
                    { 1538, false, null, 59, 7 },
                    { 1541, false, "(<1897)", 164, 3 },
                    { 1546, false, "(>1896)", 164, 9 },
                    { 1549, false, null, 265, 11 },
                    { 1550, false, null, 15, 3 },
                    { 1555, false, "(1892)", 159, 9 },
                    { 1556, false, "(>1892)", 159, 11 },
                    { 1557, false, "(1891)", 267, 11 },
                    { 1558, false, "(1894)", 268, 11 },
                    { 1559, false, null, 83, 8 },
                    { 1560, false, "(<1924)", 104, 7 },
                    { 1563, false, "(>1924)", 104, 11 },
                    { 1564, false, null, 65, 7 },
                    { 1567, false, "(<1926)", 63, 7 },
                    { 1570, false, "(>1925)", 63, 11 },
                    { 1572, false, null, 46, 6 },
                    { 1575, false, null, 266, 11 },
                    { 1576, false, null, 60, 7 },
                    { 1579, false, null, 269, 11 },
                    { 1580, false, "(2017-2019)", 84, 8 },
                    { 1581, false, "(>2016)", 162, 9 },
                    { 1582, false, null, 270, 11 },
                    { 1583, false, "(<1908 + 1912 + 1914 + 1920-1926)", 38, 7 },
                    { 1586, false, "(1927-1929 + 1934)", 38, 11 },
                    { 1588, false, "(1908-1911 + 1913 + 1919 + 1930 + >1935)", 38, 6 },
                    { 1591, false, null, 271, 10 },
                    { 1593, false, null, 50, 6 },
                    { 1596, false, "(1896)", 62, 11 },
                    { 1597, false, "(>1896)", 62, 7 },
                    { 1600, false, "(<1896)", 272, 11 },
                    { 1601, false, null, 111, 9 },
                    { 1602, false, null, 273, 9 },
                    { 1603, false, "(1972-1974 + 1976 + 1978)", 133, 8 },
                    { 1604, false, "(1967-1971 + 1975 + 1977 + >1978)", 133, 10 },
                    { 1605, false, "(1881)", 274, 9 },
                    { 1606, false, "(1901)", 275, 7 },
                    { 1609, false, "(<1893)", 276, 7 },
                    { 1612, false, "(1896)", 276, 9 },
                    { 1613, false, null, 277, 11 },
                    { 1614, false, null, 301, 11 },
                    { 1615, false, "(<1899)", 278, 7 },
                    { 1618, false, "(>1898)", 278, 11 },
                    { 1619, false, null, 279, 11 },
                    { 1620, false, null, 280, 11 },
                    { 1621, false, null, 281, 11 },
                    { 1622, false, null, 282, 11 },
                    { 1623, false, "(1930)", 283, 10 },
                    { 1624, false, null, 285, 11 },
                    { 1625, false, null, 284, 11 },
                    { 1626, false, null, 286, 8 },
                    { 1627, false, "(1981-1990)", 128, 10 },
                    { 1628, false, "(<1946 + >1958)", 130, 8 },
                    { 1629, false, "(1946-1958)", 130, 10 },
                    { 1630, false, "(1972)", 287, 8 },
                    { 1631, false, "(<1964)", 77, 10 },
                    { 1632, false, "(1964-1965)", 77, 8 },
                    { 1633, false, null, 78, 8 },
                    { 1634, false, "(2007-2016)", 129, 10 },
                    { 1635, false, "(>2016)", 129, 8 },
                    { 1636, false, "(<1987 + >1987)", 288, 10 },
                    { 1637, false, "(1987)", 288, 8 },
                    { 1638, false, null, 233, 24 },
                    { 1645, false, null, 49, 6 },
                    { 1648, false, null, 107, 9 },
                    { 1649, false, null, 64, 7 },
                    { 1652, false, null, 290, 11 },
                    { 1653, false, null, 108, 9 },
                    { 1654, false, "(<1945)", 163, 11 },
                    { 1655, false, "(1945-1971)", 163, 7 },
                    { 1658, false, "(>1971)", 163, 5 },
                    { 1661, false, null, 291, 10 },
                    { 1662, false, "(<1925)", 109, 9 },
                    { 1663, true, "(<1998 + >2013)", 118, 10 }
                });

            migrationBuilder.InsertData(
                table: "race_dates",
                columns: new[] { "id", "date", "race_id", "stage" },
                values: new object[,]
                {
                    { 4, new DateOnly(2025, 1, 21), 1069, 1 },
                    { 5, new DateOnly(2025, 1, 22), 1069, 2 },
                    { 6, new DateOnly(2025, 1, 23), 1069, 3 },
                    { 7, new DateOnly(2025, 1, 24), 1069, 4 },
                    { 8, new DateOnly(2025, 1, 25), 1069, 5 },
                    { 9, new DateOnly(2025, 1, 26), 1069, 6 },
                    { 10, new DateOnly(2025, 1, 26), 1069, null },
                    { 11, new DateOnly(2025, 2, 2), 1072, null },
                    { 12, new DateOnly(2025, 2, 9), 1073, null },
                    { 13, new DateOnly(2025, 2, 17), 1076, 1 },
                    { 14, new DateOnly(2025, 2, 18), 1076, 2 },
                    { 15, new DateOnly(2025, 2, 19), 1076, 3 },
                    { 16, new DateOnly(2025, 2, 20), 1076, 4 },
                    { 17, new DateOnly(2025, 2, 21), 1076, 5 },
                    { 18, new DateOnly(2025, 2, 22), 1076, 6 },
                    { 19, new DateOnly(2025, 2, 23), 1076, 7 },
                    { 20, new DateOnly(2025, 2, 23), 1076, null },
                    { 21, new DateOnly(2025, 3, 1), 1081, null },
                    { 22, new DateOnly(2025, 3, 2), 1084, null },
                    { 23, new DateOnly(2025, 3, 8), 1086, null },
                    { 24, new DateOnly(2025, 3, 9), 1091, 1 },
                    { 25, new DateOnly(2025, 3, 10), 1091, 2 },
                    { 26, new DateOnly(2025, 3, 11), 1091, 3 },
                    { 27, new DateOnly(2025, 3, 12), 1091, 4 },
                    { 28, new DateOnly(2025, 3, 13), 1091, 5 },
                    { 29, new DateOnly(2025, 3, 14), 1091, 6 },
                    { 30, new DateOnly(2025, 3, 15), 1091, 7 },
                    { 31, new DateOnly(2025, 3, 16), 1091, 8 },
                    { 32, new DateOnly(2025, 3, 16), 1091, null },
                    { 33, new DateOnly(2025, 3, 10), 1100, 1 },
                    { 34, new DateOnly(2025, 3, 11), 1100, 2 },
                    { 35, new DateOnly(2025, 3, 12), 1100, 3 },
                    { 36, new DateOnly(2025, 3, 13), 1100, 4 },
                    { 37, new DateOnly(2025, 3, 14), 1100, 5 },
                    { 38, new DateOnly(2025, 3, 15), 1100, 6 },
                    { 39, new DateOnly(2025, 3, 16), 1100, 7 },
                    { 40, new DateOnly(2025, 3, 16), 1100, null },
                    { 41, new DateOnly(2025, 3, 19), 1107, null },
                    { 42, new DateOnly(2025, 3, 22), 1108, null },
                    { 43, new DateOnly(2025, 3, 26), 1115, null },
                    { 44, new DateOnly(2025, 3, 28), 1117, null },
                    { 45, new DateOnly(2025, 3, 30), 1123, null },
                    { 46, new DateOnly(2025, 3, 24), 1133, 1 },
                    { 47, new DateOnly(2025, 3, 25), 1133, 2 },
                    { 48, new DateOnly(2025, 3, 26), 1133, 3 },
                    { 49, new DateOnly(2025, 3, 27), 1133, 4 },
                    { 50, new DateOnly(2025, 3, 28), 1133, 5 },
                    { 51, new DateOnly(2025, 3, 29), 1133, 6 },
                    { 52, new DateOnly(2025, 3, 30), 1133, 7 },
                    { 53, new DateOnly(2025, 3, 30), 1133, null },
                    { 54, new DateOnly(2025, 4, 2), 1137, null },
                    { 55, new DateOnly(2025, 4, 6), 1140, null },
                    { 56, new DateOnly(2025, 4, 9), 1145, null },
                    { 57, new DateOnly(2025, 4, 7), 1148, 1 },
                    { 58, new DateOnly(2025, 4, 8), 1148, 2 },
                    { 59, new DateOnly(2025, 4, 9), 1148, 3 },
                    { 60, new DateOnly(2025, 4, 10), 1148, 4 },
                    { 61, new DateOnly(2025, 4, 11), 1148, 5 },
                    { 62, new DateOnly(2025, 4, 12), 1148, 6 },
                    { 63, new DateOnly(2025, 4, 12), 1148, null },
                    { 64, new DateOnly(2025, 4, 13), 1151, null },
                    { 65, new DateOnly(2025, 4, 18), 1156, null },
                    { 66, new DateOnly(2025, 4, 20), 1158, null },
                    { 67, new DateOnly(2025, 4, 23), 1161, null },
                    { 68, new DateOnly(2025, 4, 25), 1164, null },
                    { 69, new DateOnly(2025, 4, 27), 1170, null },
                    { 70, new DateOnly(2025, 5, 1), 1176, null },
                    { 71, new DateOnly(2025, 4, 29), 1179, 1 },
                    { 72, new DateOnly(2025, 4, 30), 1179, 2 },
                    { 73, new DateOnly(2025, 5, 1), 1179, 3 },
                    { 74, new DateOnly(2025, 5, 2), 1179, 4 },
                    { 75, new DateOnly(2025, 5, 3), 1179, 5 },
                    { 76, new DateOnly(2025, 5, 4), 1179, 6 },
                    { 77, new DateOnly(2025, 5, 4), 1179, null },
                    { 78, new DateOnly(2025, 5, 9), 1186, 1 },
                    { 79, new DateOnly(2025, 5, 10), 1186, 2 },
                    { 80, new DateOnly(2025, 5, 11), 1186, 3 },
                    { 81, new DateOnly(2025, 5, 13), 1186, 4 },
                    { 82, new DateOnly(2025, 5, 14), 1186, 5 },
                    { 83, new DateOnly(2025, 5, 15), 1186, 6 },
                    { 84, new DateOnly(2025, 5, 16), 1186, 7 },
                    { 85, new DateOnly(2025, 5, 17), 1186, 8 },
                    { 86, new DateOnly(2025, 5, 18), 1186, 9 },
                    { 87, new DateOnly(2025, 5, 20), 1186, 10 },
                    { 88, new DateOnly(2025, 5, 21), 1186, 11 },
                    { 89, new DateOnly(2025, 5, 22), 1186, 12 },
                    { 90, new DateOnly(2025, 5, 23), 1186, 13 },
                    { 91, new DateOnly(2025, 5, 24), 1186, 14 },
                    { 92, new DateOnly(2025, 5, 25), 1186, 15 },
                    { 93, new DateOnly(2025, 5, 27), 1186, 16 },
                    { 94, new DateOnly(2025, 5, 28), 1186, 17 },
                    { 95, new DateOnly(2025, 5, 29), 1186, 18 },
                    { 96, new DateOnly(2025, 5, 30), 1186, 19 },
                    { 97, new DateOnly(2025, 5, 31), 1186, 20 },
                    { 98, new DateOnly(2025, 6, 1), 1186, 21 },
                    { 99, new DateOnly(2025, 6, 1), 1186, null },
                    { 100, new DateOnly(2025, 6, 8), 1206, 1 },
                    { 101, new DateOnly(2025, 6, 9), 1206, 2 },
                    { 102, new DateOnly(2025, 6, 10), 1206, 3 },
                    { 103, new DateOnly(2025, 6, 11), 1206, 4 },
                    { 104, new DateOnly(2025, 6, 12), 1206, 5 },
                    { 105, new DateOnly(2025, 6, 13), 1206, 6 },
                    { 106, new DateOnly(2025, 6, 14), 1206, 7 },
                    { 107, new DateOnly(2025, 6, 15), 1206, 8 },
                    { 108, new DateOnly(2025, 6, 15), 1206, null },
                    { 109, new DateOnly(2025, 6, 22), 1213, null },
                    { 110, new DateOnly(2025, 6, 15), 1216, 1 },
                    { 111, new DateOnly(2025, 6, 16), 1216, 2 },
                    { 112, new DateOnly(2025, 6, 17), 1216, 3 },
                    { 113, new DateOnly(2025, 6, 18), 1216, 4 },
                    { 114, new DateOnly(2025, 6, 19), 1216, 5 },
                    { 115, new DateOnly(2025, 6, 20), 1216, 6 },
                    { 116, new DateOnly(2025, 6, 21), 1216, 7 },
                    { 117, new DateOnly(2025, 6, 22), 1216, 8 },
                    { 118, new DateOnly(2025, 6, 22), 1216, null },
                    { 119, new DateOnly(2025, 7, 5), 1225, 1 },
                    { 120, new DateOnly(2025, 7, 6), 1225, 2 },
                    { 121, new DateOnly(2025, 7, 7), 1225, 3 },
                    { 122, new DateOnly(2025, 7, 8), 1225, 4 },
                    { 123, new DateOnly(2025, 7, 9), 1225, 5 },
                    { 124, new DateOnly(2025, 7, 10), 1225, 6 },
                    { 125, new DateOnly(2025, 7, 11), 1225, 7 },
                    { 126, new DateOnly(2025, 7, 12), 1225, 8 },
                    { 127, new DateOnly(2025, 7, 13), 1225, 9 },
                    { 128, new DateOnly(2025, 7, 15), 1225, 10 },
                    { 129, new DateOnly(2025, 7, 16), 1225, 11 },
                    { 130, new DateOnly(2025, 7, 17), 1225, 12 },
                    { 131, new DateOnly(2025, 7, 18), 1225, 13 },
                    { 132, new DateOnly(2025, 7, 19), 1225, 14 },
                    { 133, new DateOnly(2025, 7, 20), 1225, 15 },
                    { 134, new DateOnly(2025, 7, 22), 1225, 16 },
                    { 135, new DateOnly(2025, 7, 23), 1225, 17 },
                    { 136, new DateOnly(2025, 7, 24), 1225, 18 },
                    { 137, new DateOnly(2025, 7, 25), 1225, 19 },
                    { 138, new DateOnly(2025, 7, 26), 1225, 20 },
                    { 139, new DateOnly(2025, 7, 27), 1225, 21 },
                    { 140, new DateOnly(2025, 7, 27), 1225, null },
                    { 141, new DateOnly(2025, 8, 2), 1239, null },
                    { 142, new DateOnly(2025, 8, 4), 1244, 1 },
                    { 143, new DateOnly(2025, 8, 5), 1244, 2 },
                    { 144, new DateOnly(2025, 8, 6), 1244, 3 },
                    { 145, new DateOnly(2025, 8, 7), 1244, 4 },
                    { 146, new DateOnly(2025, 8, 8), 1244, 5 },
                    { 147, new DateOnly(2025, 8, 9), 1244, 6 },
                    { 148, new DateOnly(2025, 8, 10), 1244, 7 },
                    { 149, new DateOnly(2025, 8, 10), 1244, null },
                    { 150, new DateOnly(2025, 8, 20), 1250, 1 },
                    { 151, new DateOnly(2025, 8, 21), 1250, 2 },
                    { 152, new DateOnly(2025, 8, 22), 1250, 3 },
                    { 153, new DateOnly(2025, 8, 23), 1250, 4 },
                    { 154, new DateOnly(2025, 8, 24), 1250, 5 },
                    { 155, new DateOnly(2025, 8, 24), 1250, null },
                    { 156, new DateOnly(2025, 9, 17), 1253, null },
                    { 157, new DateOnly(2025, 8, 31), 1257, null },
                    { 158, new DateOnly(2025, 8, 24), 1259, null },
                    { 159, new DateOnly(2025, 6, 8), 1204, null },
                    { 160, new DateOnly(2025, 9, 12), 1260, null },
                    { 161, new DateOnly(2025, 9, 14), 1263, null },
                    { 162, new DateOnly(2025, 8, 23), 1286, 1 },
                    { 163, new DateOnly(2025, 8, 24), 1286, 2 },
                    { 164, new DateOnly(2025, 8, 25), 1286, 3 },
                    { 165, new DateOnly(2025, 8, 26), 1286, 4 },
                    { 166, new DateOnly(2025, 8, 27), 1286, 5 },
                    { 167, new DateOnly(2025, 8, 28), 1286, 6 },
                    { 168, new DateOnly(2025, 8, 29), 1286, 7 },
                    { 169, new DateOnly(2025, 8, 30), 1286, 8 },
                    { 170, new DateOnly(2025, 8, 31), 1286, 9 },
                    { 171, new DateOnly(2025, 9, 2), 1286, 10 },
                    { 172, new DateOnly(2025, 9, 3), 1286, 11 },
                    { 173, new DateOnly(2025, 9, 4), 1286, 12 },
                    { 174, new DateOnly(2025, 9, 5), 1286, 13 },
                    { 175, new DateOnly(2025, 9, 6), 1286, 14 },
                    { 176, new DateOnly(2025, 9, 7), 1286, 15 },
                    { 177, new DateOnly(2025, 9, 9), 1286, 16 },
                    { 178, new DateOnly(2025, 9, 10), 1286, 17 },
                    { 179, new DateOnly(2025, 9, 11), 1286, 18 },
                    { 180, new DateOnly(2025, 9, 12), 1286, 19 },
                    { 181, new DateOnly(2025, 9, 13), 1286, 20 },
                    { 182, new DateOnly(2025, 9, 14), 1286, 21 },
                    { 183, new DateOnly(2025, 9, 14), 1286, null },
                    { 186, new DateOnly(2025, 10, 4), 1306, null },
                    { 187, new DateOnly(2025, 10, 7), 1307, null },
                    { 188, new DateOnly(2025, 10, 9), 1310, null },
                    { 189, new DateOnly(2025, 10, 11), 1311, null },
                    { 190, new DateOnly(2025, 10, 12), 1324, null },
                    { 191, new DateOnly(2025, 10, 19), 1325, null },
                    { 192, new DateOnly(2025, 9, 7), 1663, null },
                    { 195, new DateOnly(2025, 1, 12), 180, null },
                    { 196, new DateOnly(2025, 1, 9), 204, null },
                    { 197, new DateOnly(2025, 2, 8), 1, null },
                    { 198, new DateOnly(2025, 2, 6), 2, null },
                    { 199, new DateOnly(2025, 2, 9), 178, null },
                    { 200, new DateOnly(2025, 2, 2), 179, null }
                });

            migrationBuilder.CreateIndex(
                name: "ix_results_race_date_id",
                table: "results",
                column: "race_date_id");

            migrationBuilder.CreateIndex(
                name: "ix_nation_seasons_nation_id",
                table: "nation_seasons",
                column: "nation_id");

            migrationBuilder.AddForeignKey(
                name: "fk_nation_seasons_nations_nation_id",
                table: "nation_seasons",
                column: "nation_id",
                principalTable: "nations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

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
                name: "fk_nation_seasons_nations_nation_id",
                table: "nation_seasons");

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

            migrationBuilder.DropIndex(
                name: "ix_nation_seasons_nation_id",
                table: "nation_seasons");

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 81);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 82);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 85);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 121);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 122);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 123);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 124);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 125);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 126);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 127);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 128);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 129);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 130);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 131);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 132);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 133);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 134);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 135);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 136);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 137);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 138);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 139);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 140);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 141);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 142);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 143);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 144);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 145);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 146);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 147);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 148);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 149);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 150);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 151);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 152);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 153);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 154);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 155);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 156);

            migrationBuilder.DeleteData(
                table: "point_system",
                keyColumn: "id",
                keyValue: 157);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 81);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 82);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 85);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 121);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 122);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 123);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 124);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 125);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 126);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 127);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 128);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 129);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 130);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 131);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 132);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 133);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 134);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 135);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 136);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 137);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 138);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 139);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 140);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 141);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 142);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 143);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 144);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 145);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 146);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 147);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 148);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 149);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 150);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 151);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 152);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 153);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 154);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 155);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 156);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 157);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 158);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 159);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 160);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 161);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 162);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 163);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 164);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 165);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 166);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 167);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 168);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 169);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 170);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 171);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 172);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 173);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 174);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 175);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 176);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 177);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 178);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 179);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 180);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 181);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 182);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 183);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 184);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 185);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 186);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 187);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 188);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 189);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 190);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 191);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 192);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 193);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 194);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 195);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 196);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 197);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 198);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 199);

            migrationBuilder.DeleteData(
                table: "race_dates",
                keyColumn: "id",
                keyValue: 200);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 168);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 169);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 170);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 171);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 172);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 173);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 174);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 175);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 176);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 177);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 181);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 182);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 183);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 184);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 185);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 186);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 187);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 188);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 189);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 190);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 191);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 192);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 193);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 194);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 195);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 196);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 197);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 198);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 199);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 200);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 201);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 202);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 203);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 205);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 206);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 207);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 208);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 209);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 210);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 211);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 212);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 213);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 214);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 215);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 216);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 217);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 218);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 219);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 220);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 221);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 222);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 223);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 224);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 225);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 226);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 231);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 232);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 233);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1067);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1074);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1079);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1080);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1085);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1089);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1094);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1096);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1103);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1106);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1113);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1114);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1116);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1120);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1126);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1127);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1129);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1136);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1146);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1157);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1165);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1166);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1167);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1175);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1177);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1198);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1201);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1210);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1214);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1219);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1237);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1238);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1242);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1247);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1248);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1256);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1258);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1267);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1271);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1275);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1308);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1309);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1316);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1321);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1400);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1401);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1402);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1403);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1404);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1405);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1406);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1407);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1408);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1409);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1410);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1411);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1412);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1415);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1416);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1417);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1420);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1425);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1428);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1431);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1432);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1435);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1436);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1437);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1438);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1439);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1441);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1445);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1448);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1449);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1450);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1451);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1452);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1453);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1454);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1455);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1456);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1461);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1462);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1463);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1464);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1465);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1466);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1467);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1468);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1469);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1470);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1471);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1472);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1473);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1475);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1478);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1479);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1480);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1481);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1482);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1483);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1484);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1485);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1486);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1487);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1488);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1491);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1492);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1493);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1494);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1495);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1498);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1499);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1504);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1505);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1506);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1507);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1508);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1509);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1511);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1514);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1515);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1516);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1517);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1518);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1521);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1522);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1523);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1524);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1527);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1528);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1529);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1530);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1531);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1532);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1533);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1534);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1535);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1536);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1537);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1538);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1541);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1546);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1549);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1550);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1555);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1556);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1557);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1558);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1559);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1560);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1563);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1564);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1567);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1570);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1572);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1575);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1576);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1579);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1580);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1581);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1582);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1583);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1586);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1588);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1591);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1593);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1596);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1597);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1600);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1601);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1602);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1603);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1604);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1605);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1606);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1609);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1612);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1613);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1614);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1615);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1618);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1619);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1620);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1621);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1622);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1623);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1624);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1625);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1626);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1627);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1628);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1629);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1630);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1631);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1632);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1633);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1634);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1635);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1636);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1637);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1638);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1645);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1648);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1649);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1652);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1653);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1654);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1655);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1658);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1661);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1662);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1832);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2125);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2126);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2127);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2128);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2129);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2130);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2131);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2132);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2133);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2134);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2135);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2136);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2137);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2138);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2139);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2140);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2141);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2142);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2143);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2144);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2145);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2146);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2147);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2148);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2149);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2150);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2151);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2152);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2153);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2154);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2155);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2156);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2157);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2158);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2159);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2160);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2161);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2162);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2163);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2164);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2165);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2166);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2167);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2168);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2169);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2170);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2171);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2172);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2173);

            migrationBuilder.DeleteData(
                table: "teams",
                keyColumn: "id",
                keyValue: 2174);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 124);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 125);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 128);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 129);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 130);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 133);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 134);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 155);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 156);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 158);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 159);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 162);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 163);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 164);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 168);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 169);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 170);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 171);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 172);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 173);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 174);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 175);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 176);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 177);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 181);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 182);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 183);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 184);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 185);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 186);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 187);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 188);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 189);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 190);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 191);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 192);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 193);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 194);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 195);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 196);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 197);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 198);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 199);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 200);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 201);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 202);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 203);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 205);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 206);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 207);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 208);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 209);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 210);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 211);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 212);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 213);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 214);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 215);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 216);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 217);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 218);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 219);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 220);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 221);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 222);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 223);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 225);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 226);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 231);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 233);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 234);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 235);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 236);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 237);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 238);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 239);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 240);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 241);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 242);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 243);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 244);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 245);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 246);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 247);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 248);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 249);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 250);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 251);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 252);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 253);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 254);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 255);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 256);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 257);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 258);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 259);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 260);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 261);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 262);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 263);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 264);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 265);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 266);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 267);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 268);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 269);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 270);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 271);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 272);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 273);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 274);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 275);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 276);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 277);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 278);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 279);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 280);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 281);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 282);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 283);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 284);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 285);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 286);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 287);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 288);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 289);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 290);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 291);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 292);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 293);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 294);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 295);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 296);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 297);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 298);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 299);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 300);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 301);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 178);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 179);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 180);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 204);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 227);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 228);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 229);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 230);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1069);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1072);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1073);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1076);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1081);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1084);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1086);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1091);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1100);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1107);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1108);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1115);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1117);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1123);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1133);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1137);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1140);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1145);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1148);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1151);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1156);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1158);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1161);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1164);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1170);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1176);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1179);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1186);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1204);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1206);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1213);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1216);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1225);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1239);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1244);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1250);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1253);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1257);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1259);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1260);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1263);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1286);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1306);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1307);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1310);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1311);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1324);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1325);

            migrationBuilder.DeleteData(
                table: "races",
                keyColumn: "id",
                keyValue: 1663);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 135);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 137);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 138);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 140);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 141);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 142);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 145);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 147);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 178);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 179);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 180);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 204);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 227);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 228);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 229);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 230);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 302);

            migrationBuilder.DeleteData(
                table: "meta_races",
                keyColumn: "id",
                keyValue: 303);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "race_classes",
                keyColumn: "id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "nations",
                keyColumn: "id",
                keyValue: 52);

            migrationBuilder.DropColumn(
                name: "race_date_id",
                table: "results");

            migrationBuilder.DropColumn(
                name: "nation_id",
                table: "nation_seasons");

            migrationBuilder.AlterColumn<long>(
                name: "id",
                table: "rider_seasons",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<long>(
                name: "rider_season_id",
                table: "results",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "nation_season_id",
                table: "results",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "id",
                table: "nation_seasons",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

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
