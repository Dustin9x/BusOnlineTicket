using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberOfSeat = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NationalId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DriverLicense = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YearOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlaceOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Enabled = table.Column<bool>(type: "bit", nullable: false),
                    isApprove = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FAQs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Buses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusPlate = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BusTypeId = table.Column<int>(type: "int", nullable: true),
                    StationId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isAvailable = table.Column<bool>(type: "bit", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Buses_BusTypes_BusTypeId",
                        column: x => x.BusTypeId,
                        principalTable: "BusTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BusStations",
                columns: table => new
                {
                    BusId = table.Column<int>(type: "int", nullable: false),
                    StationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusStations", x => new { x.BusId, x.StationId });
                    table.ForeignKey(
                        name: "FK_BusStations_Buses_BusId",
                        column: x => x.BusId,
                        principalTable: "Buses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusStations_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinishTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TicketPrice = table.Column<int>(type: "int", nullable: false),
                    BusId = table.Column<int>(type: "int", nullable: false),
                    DriverId = table.Column<int>(type: "int", nullable: false),
                    FromStationId = table.Column<int>(type: "int", nullable: true),
                    ToStationId = table.Column<int>(type: "int", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trips_Buses_BusId",
                        column: x => x.BusId,
                        principalTable: "Buses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trips_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trips_Stations_FromStationId",
                        column: x => x.FromStationId,
                        principalTable: "Stations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Trips_Stations_ToStationId",
                        column: x => x.ToStationId,
                        principalTable: "Stations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TripId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seats_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SeatsList = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalPrice = table.Column<double>(type: "float", nullable: true),
                    isCancel = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BusTypes",
                columns: new[] { "Id", "Name", "NumberOfSeat" },
                values: new object[,]
                {
                    { 1, "Express", 50 },
                    { 2, "Luxury", 30 },
                    { 3, "Volvo Non-AC", 16 },
                    { 4, "Volvo AC", 9 }
                });

            migrationBuilder.InsertData(
                table: "Drivers",
                columns: new[] { "Id", "Avatar", "DriverLicense", "Email", "Enabled", "FullName", "NationalId", "Note", "Password", "Phone", "PlaceOfBirth", "YearOfBirth", "isApprove" },
                values: new object[,]
                {
                    { 1, "driver1.png", "234567", "driver1@phtv.com", true, "Nguyen Van Toan", "2345678", null, "$2a$11$cSaVq25JW7MDcbz.xAtIhOaJPjJWAoVdCvxwT3z0n0DkNUXA6iGr6", "090123456", "Ho Chi Minh", new DateTime(1995, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 2, "driver2.png", "234567", "driver2@phtv.com", true, "Le Huy Phu", "2345678", null, "$2a$11$47JEuYfYKvQzOBh6hWD9K.IV.45Dm8Cfx3j8IznunbDq1KVFl9AIW", "090123456", "Lam Dong", new DateTime(1998, 7, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 3, "driver3.png", "234568", "driver3@phtv.com", true, "Bui Quoc Viet", "2345679", null, "$2a$11$/o7GgljNt6Kn2gweX2N43uyt6LSYomwBn2PtqAwtW/oD.7d3Q81KO", "090123457", "Binh Thuam", new DateTime(1993, 7, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 4, "driver4.png", "234569", "driver4@phtv.com", true, "Pham Huy Hoang", "2345670", null, "$2a$11$BL0xCCq1nVQdZMxjaS4vp.z/ahiPrC9Sh/wz9DlHmB1sHURGgE0Dq", "090123458", "Gia Lai", new DateTime(1990, 9, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 5, "driver5.png", "234560", "driver5@phtv.com", true, "Le Huy Chuong", "2345671", null, "$2a$11$R2bO.MUwk8szMOEe2OFAuOLB5uUIrs9p2Vr9ofJ/6S.ShiL544GKG", "090123459", "Vung Tau", new DateTime(1999, 12, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 6, "driver6.png", "234561", "driver6@phtv.com", true, "Le Thanh Thien", "2345672", null, "$2a$11$ctAEKWuwB1gskB83vaECTO8AiUE.m3kPkN6nrEV7KVMC6cxSp9gs6", "090123450", "Hà Nội", new DateTime(1997, 3, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 7, "driver7.png", "234562", "driver7@phtv.com", true, "Le Dai Vi", "2345673", null, "$2a$11$upYgb/gGT1j7pCDsTEh52ONJvCIqkUrNuy3T3V20O4/UVHv6zh7dm", "090123452", "Ca Mau", new DateTime(1996, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 8, "driver8.png", "234563", "driver8@phtv.com", true, "Le Huy Phu", "2345674", null, "$2a$11$8/NTtkgJNc6H6VKmR1sGae3wiaSCfk6K7LSy7xqP0L7kGmhpJHMQS", "090123451", "Lam Dong", new DateTime(1994, 1, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 9, "driver9.png", "234564", "driver9@phtv.com", true, "Le Huy Quan", "2345675", null, "$2a$11$ahCXPo3nXUn86IMpbiX2C.GctCOPWRAJK2sT37TOhgqWtONYGmCgO", "090123453", "Ben Tre", new DateTime(2000, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 10, "driver10.png", "234565", "driver10@phtv.com", true, "Le Huy Linh", "2345676", null, "$2a$11$r2fu058V4y4gVzaTpGwsYOUh7EypgKhFTHB3AJB919oR6H2.1trJ.", "090123455", "Dong Thap", new DateTime(1978, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false }
                });

            migrationBuilder.InsertData(
                table: "FAQs",
                columns: new[] { "Id", "Answer", "Question" },
                values: new object[,]
                {
                    { 1, "Ans: Booking a bus ticket online in India is easy with PHTV Bus. Simply enter the Leaving from (Origin City) -- Going to (destination city) details along with the date you wish to travel in the bus search option on the site. Within seconds you will be given a list of available running buses for your route. Select the bus that best suits you, then just follow the bus ticket booking process by selecting your seat, providing passenger details and completing the payment process. Upon successful booking confirmation, you will receive an e-ticket over email.", "Q. How do you do online bus reservation on PHTV Bus?" },
                    { 2, "Ans: You do not need to create an account to view bus availability and seat availability. However, you need to register an account to be able to book tickets, this is to assist you in future transactions and support.", "Q. Do I need to create an account to book bus tickets on PHTV Bus?" },
                    { 3, "Ans: We'll send you a e-ticket by email after your booking is confirmed. Simply board by presenting your e-ticket.", "Q. How do I get the bus ticket after booking?" },
                    { 4, "Ans: If you cancel before 2 days of Journey date then the whole money will be returned, if done one day before then 15% is debited from the total amount is returned, and if done on that day 30% is debited from the total amount is to be returned back.", "Q. Can I cancel my ticket and get a refund?" }
                });

            migrationBuilder.InsertData(
                table: "Stations",
                columns: new[] { "Id", "Address", "Name" },
                values: new object[,]
                {
                    { 1, "395/1Nam Kỳ Khởi Nghĩa P2 Q3", "Hồ Chí Minh" },
                    { 2, "126 Hai Bà Trưng P1 Q6", "Hà Nội" },
                    { 3, "35 Hồ Xuân Hương P9 Q1", "Đà Lạt" },
                    { 4, "3A Đất Mũi Huyện Châu Thành , Tỉnh Cà Mau", "Cà Mau" },
                    { 5, "39 Xã Nghĩa Lộ ,Huyện Cát Hải", "Hải Phòng" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "Email", "Password", "Role" },
                values: new object[,]
                {
                    { 1, null, "admin@phtv.com", "$2a$11$2pqinnWvAAtnclLOEhHoXunaQS8KsUCpVUOKjqhoUG7fGfnUeYx5a", "Admin" },
                    { 2, null, "emp@phtv.com", "$2a$11$.FSRN2tUaohSGcaRvQ2lPObBvnCELqVqHy6zAyMhY2Ir4uL5E5Vh2", "Mod" },
                    { 3, null, "user@phtv.com", "$2a$11$yVDoeY6g.utx8wu5X5DLA.MtklJJH53cpN2LDBTg0s0aR7OTGyn9K", "User" }
                });

            migrationBuilder.InsertData(
                table: "Buses",
                columns: new[] { "Id", "BusPlate", "BusTypeId", "Note", "StationId", "isAvailable" },
                values: new object[,]
                {
                    { 1, "59A1-55999", 1, "", "1", true },
                    { 2, "59A1-55998", 2, "", "2", true },
                    { 3, "59A1-55997", 3, "", "3", true },
                    { 4, "59A1-55996", 4, "", "4", true },
                    { 5, "59A1-55995", 1, "", "5", true },
                    { 6, "59A1-55994", 2, "", "1", true },
                    { 7, "59A1-55993", 3, "", "2", true },
                    { 8, "59A1-55992", 4, "", "3", true },
                    { 9, "59A1-55991", 1, "", "4", true },
                    { 10, "59A1-55900", 2, "", "5", true },
                    { 11, "59A1-55901", 3, "", "1", true },
                    { 12, "59A1-55902", 4, "", "2", true },
                    { 13, "59A1-55903", 1, "", "3", true },
                    { 14, "59A1-55904", 2, "", "4", true },
                    { 15, "59A1-55905", 3, "", "5", true },
                    { 16, "59A1-55906", 4, "", "1", true },
                    { 17, "59A1-55907", 1, "", "2", true },
                    { 18, "59A1-55908", 2, "", "3", true }
                });

            migrationBuilder.InsertData(
                table: "Trips",
                columns: new[] { "Id", "BusId", "DriverId", "FinishTime", "FromStationId", "Image", "StartTime", "TicketPrice", "ToStationId" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2024, 1, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 100, 5 },
                    { 2, 2, 2, new DateTime(2024, 1, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 200, 3 },
                    { 3, 3, 3, new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 300, 2 },
                    { 4, 4, 4, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 350, 3 },
                    { 5, 5, 5, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 400, 1 },
                    { 6, 6, 6, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image6.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 3 },
                    { 7, 7, 7, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image7.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 150, 2 },
                    { 8, 8, 8, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image8.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 160, 4 },
                    { 9, 9, 9, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image9.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 180, 1 },
                    { 10, 10, 10, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image10.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 190, 4 },
                    { 11, 1, 1, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image11.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 290, 4 },
                    { 12, 2, 2, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image12.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 4 },
                    { 13, 3, 3, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image13.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 360, 5 },
                    { 14, 4, 4, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image14.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 1 },
                    { 15, 5, 5, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image15.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 420, 5 },
                    { 16, 6, 6, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image16.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 3 },
                    { 17, 7, 7, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image17.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 4 },
                    { 18, 8, 8, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image18.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 210, 5 },
                    { 19, 9, 9, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image19.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 1 },
                    { 20, 10, 10, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image20.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Buses_BusPlate",
                table: "Buses",
                column: "BusPlate",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Buses_BusTypeId",
                table: "Buses",
                column: "BusTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BusStations_StationId",
                table: "BusStations",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_TripId",
                table: "Seats",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TripId",
                table: "Tickets",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_BusId",
                table: "Trips",
                column: "BusId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_DriverId",
                table: "Trips",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_FromStationId",
                table: "Trips",
                column: "FromStationId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_ToStationId",
                table: "Trips",
                column: "ToStationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusStations");

            migrationBuilder.DropTable(
                name: "FAQs");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Trips");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Buses");

            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropTable(
                name: "BusTypes");
        }
    }
}
