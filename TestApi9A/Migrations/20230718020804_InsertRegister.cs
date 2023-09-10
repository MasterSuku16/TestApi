using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TestApi9A.Migrations
{
    /// <inheritdoc />
    public partial class InsertRegister : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "Author", "CreatedAt", "Description", "Title" },
                values: new object[,]
                {
                    { 1, "Isaac suku", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "this person is amazing", "Test" },
                    { 2, "Narvaez", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Thank u for asking", "Test2" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
