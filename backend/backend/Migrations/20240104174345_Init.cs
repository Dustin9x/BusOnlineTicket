using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdultPrice",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Trips");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Trips",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "ChildPrice",
                table: "Trips",
                newName: "TicketPrice");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishTime",
                table: "Trips",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinishTime",
                table: "Trips");

            migrationBuilder.RenameColumn(
                name: "TicketPrice",
                table: "Trips",
                newName: "ChildPrice");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Trips",
                newName: "Date");

            migrationBuilder.AddColumn<int>(
                name: "AdultPrice",
                table: "Trips",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
