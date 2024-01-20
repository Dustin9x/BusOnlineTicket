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
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    { 1, "Express", 42 },
                    { 2, "Luxury", 30 },
                    { 3, "Volvo Non-AC", 12 },
                    { 4, "Volvo AC", 9 }
                });

            migrationBuilder.InsertData(
                table: "Drivers",
                columns: new[] { "Id", "Avatar", "DriverLicense", "Email", "Enabled", "FullName", "NationalId", "Note", "Password", "Phone", "PlaceOfBirth", "YearOfBirth", "isApprove" },
                values: new object[,]
                {
                    { 1, "driver1.png", "234567", "driver1@phtv.com", true, "Nguyen Van Toan", "2345678", null, "$2a$11$wLzjQFuRK6UpsHsi8fUjFOZiU0AEaE7pey5T4fLx/gc1tLhLyZ8Ia", "090123456", "Ho Chi Minh", new DateTime(1995, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 2, "driver2.png", "234567", "driver2@phtv.com", true, "Le Huy Phu", "2345678", null, "$2a$11$cEHEBqy3e7Jmzx4Eci2WBOde/fB4LyoUUbbdFICxjkj2bBOqnAXkO", "090123456", "Lam Dong", new DateTime(1998, 7, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 3, "driver3.png", "234568", "driver3@phtv.com", true, "Bui Quoc Viet", "2345679", null, "$2a$11$NfYP2sGmYs.WxzE8QtyaA.U4M15Z9jDQI3D7M8pk73hXP7R.CLYeW", "090123457", "Binh Thuam", new DateTime(1993, 7, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 4, "driver4.png", "234569", "driver4@phtv.com", true, "Pham Huy Hoang", "2345670", null, "$2a$11$ivF2AY33jSDnZW/FF7gxv.HTpcfly58LbOFSbLphLq7She2Pn1WSy", "090123458", "Gia Lai", new DateTime(1990, 9, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 5, "driver5.png", "234560", "driver5@phtv.com", true, "Le Huy Chuong", "2345671", null, "$2a$11$0I3e7YpBRd1K.EuwQYZEt.nuztBxEYLlJZWbaRy7dJdt16DDckeyq", "090123459", "Vung Tau", new DateTime(1999, 12, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 6, "driver6.png", "234561", "driver6@phtv.com", true, "Le Thanh Thien", "2345672", null, "$2a$11$lQLhOdN.5lnpE.ZD2fX1bOBQDQ.rNe3mxg6CjOPtV8H9KJ201s98S", "090123450", "Hà Nội", new DateTime(1997, 3, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 7, "driver7.png", "234562", "driver7@phtv.com", true, "Le Dai Vi", "2345673", null, "$2a$11$xmz/A6gpiaxAhnjJ3o312Oo9ZN.um80jZUb/qlQJLWBayKFD3vK0a", "090123452", "Ca Mau", new DateTime(1996, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 8, "driver8.png", "234563", "driver8@phtv.com", true, "Le Huy Phu", "2345674", null, "$2a$11$g3eQQv1jlwElVd6XBPVU1.nxc3g5osOyF8tWvBaJhHihQ5uTqtY7y", "090123451", "Lam Dong", new DateTime(1994, 1, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 9, "driver9.png", "234564", "driver9@phtv.com", true, "Le Huy Quan", "2345675", null, "$2a$11$E4Ap5exxH7rd8klfk1ordOOkCGYVuO50pyCKijlrHp7K8SPbYRcta", "090123453", "Ben Tre", new DateTime(2000, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 10, "driver10.png", "234565", "driver10@phtv.com", true, "Le Huy Linh", "2345676", null, "$2a$11$UCwRKJ9YmpfiSKZ7uztzduIEQRFg4d.ux9nx0wzLFj4gFxsUwiofW", "090123455", "Dong Thap", new DateTime(1978, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false }
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
                    { 1, "395/1 Nam Kỳ Khởi Nghĩa P2 Q3", "Hồ Chí Minh" },
                    { 2, "126 Hai Bà Trưng P1 Q6", "Hà Nội" },
                    { 3, "35 Hồ Xuân Hương P9 Q1", "Đà Lạt" },
                    { 4, "3A Đất Mũi, Huyện Châu Thành, Tỉnh Cà Mau", "Cà Mau" },
                    { 5, "39 Xã Nghĩa Lộ, Huyện Cát Hải, Thành phố Hải Phòng", "Hải Phòng" },
                    { 6, "46 Trần Phú, Phường Lộc Thọ, Thành phố Nha Trang, Tỉnh Khánh Hòa", "Nha Trang" },
                    { 7, "179 Lê Lợi, Phường Cái Khế, Quận Ninh Kiều, Thành phố Cần Thơ", "Cần Thơ" },
                    { 8, "219 Nguyễn Thái Học, Phường Lê Lợi, Thành phố Quy Nhơn, Tỉnh Bình Định", "Bình Định" },
                    { 9, "208 Lương Ngọc Quyến, Phường Quang Trung, Thành phố Thái Nguyên, Tỉnh Thái Nguyên", "Thái Nguyên" },
                    { 10, "33 Nguyễn Thị Minh Khai, Phường Thắng Nhì, Thành phố Buôn Ma Thuột, Tỉnh Đắk Lắk", "Tây Nguyên" },
                    { 11, "215 Bà Triệu, Phường Chi Lăng, Thành phố Lạng Sơn, Tỉnh Lạng Sơn", "Lạng Sơn" },
                    { 12, "284B Nguyễn Thị Minh Khai, Phường 8, Thành phố Bến Tre, Tỉnh Bến Tre", "Bến Tre" },
                    { 13, "268A Hùng Vương, Phường 6, Thành phố Tân An, Tỉnh Long An", "Long An" },
                    { 14, "275 Nguyễn Thị Minh Khai, Phường 3, Thành phố Trà Vinh, Tỉnh Trà Vinh", "Trà Vinh" },
                    { 15, "119 Bến Tre, Phường 4, Thành phố Mỹ Tho, Tỉnh Tiền Giang", "Mỹ Tho" },
                    { 16, "102 Nguyễn Huệ, Phường 1, Thành phố Mỹ Tho, Tỉnh Tiền Giang", "Tiền Giang" },
                    { 17, "217 Cách Mạng Tháng Tám, Phường 8, Thành phố Vĩnh Long, Tỉnh Vĩnh Long", "Vĩnh Long" },
                    { 18, "60 Trần Hưng Đạo, Phường Phú Tài, Thành phố Phan Thiết, Tỉnh Bình Thuận", "Bình Thuận" },
                    { 19, "141 Nam Kỳ Khởi Nghĩa, Phường 3, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu", "Vũng Tàu" },
                    { 20, "188 Hoàng Văn Thụ, Phường Hoàng Văn Thụ, Thành phố Bắc Giang, Tỉnh Bắc Giang", "Bắc Giang" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "Email", "FullName", "Password", "Role" },
                values: new object[,]
                {
                    { 1, null, "admin@phtv.com", null, "$2a$11$6zvT0Sa5dv4YIiPOlKDSL.t1yFuIQ7G14MgeqvUciowTDqgJd98A6", "Admin" },
                    { 2, null, "emp@phtv.com", null, "$2a$11$ypUAFnZ/eLHybJdXmOLd3OjHOWQ08/TEYrwe0E89HSMXI66/zxvxi", "Mod" },
                    { 3, null, "user@phtv.com", null, "$2a$11$tGRr/KXWOtYu/t8nVXKGIuMYx/PKBquDctHbL.BktrD4xq5iUO1Xe", "User" }
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
                    { 18, "59A1-55908", 2, "", "3", true },
                    { 19, "59A1-55909", 3, "", "4", true },
                    { 20, "59A1-55911", 4, "", "5", true }
                });

            migrationBuilder.InsertData(
                table: "Trips",
                columns: new[] { "Id", "BusId", "DriverId", "FinishTime", "FromStationId", "Image", "StartTime", "TicketPrice", "ToStationId" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 100, 2 },
                    { 2, 2, 2, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 200, 2 },
                    { 3, 3, 3, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 300, 2 },
                    { 4, 4, 4, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 350, 2 },
                    { 5, 5, 5, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 400, 3 },
                    { 6, 6, 6, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 3 },
                    { 7, 7, 7, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 150, 3 },
                    { 8, 8, 8, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 160, 4 },
                    { 9, 9, 9, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 180, 4 },
                    { 10, 10, 10, new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 190, 4 },
                    { 11, 1, 1, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 290, 5 },
                    { 12, 2, 2, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 5 },
                    { 13, 3, 3, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 360, 5 },
                    { 14, 4, 4, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 5 },
                    { 15, 5, 5, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 420, 6 },
                    { 16, 6, 6, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 6 },
                    { 17, 7, 7, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 6 },
                    { 18, 8, 8, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 210, 7 },
                    { 19, 9, 9, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 7 },
                    { 20, 10, 10, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 7 },
                    { 21, 1, 1, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 8 },
                    { 22, 2, 2, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 8 },
                    { 23, 3, 3, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 410, 8 },
                    { 24, 4, 4, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image8.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 8 },
                    { 25, 5, 5, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 590, 9 },
                    { 26, 6, 6, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 490, 9 },
                    { 27, 7, 7, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 9 },
                    { 28, 8, 8, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 220, 10 },
                    { 29, 9, 9, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 390, 10 },
                    { 30, 10, 10, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 10 },
                    { 31, 1, 1, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 100, 2 },
                    { 32, 2, 2, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 200, 2 },
                    { 33, 3, 3, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 300, 2 },
                    { 34, 4, 4, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 350, 2 },
                    { 35, 5, 5, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 400, 3 },
                    { 36, 6, 6, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 3 },
                    { 37, 7, 7, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 150, 3 },
                    { 38, 8, 8, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 160, 4 },
                    { 39, 9, 9, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 180, 4 },
                    { 40, 10, 10, new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 190, 4 },
                    { 41, 1, 1, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 290, 5 },
                    { 42, 2, 2, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 5 },
                    { 43, 3, 3, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 360, 5 },
                    { 44, 4, 4, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 5 },
                    { 45, 5, 5, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 420, 6 },
                    { 46, 6, 6, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 6 },
                    { 47, 7, 7, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 6 },
                    { 48, 8, 8, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 210, 7 },
                    { 49, 9, 9, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 7 },
                    { 50, 10, 10, new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 7 },
                    { 51, 1, 1, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 8 },
                    { 52, 2, 2, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 8 },
                    { 53, 3, 3, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 410, 8 },
                    { 54, 4, 4, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image8.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 8 },
                    { 55, 5, 5, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 590, 9 },
                    { 56, 6, 6, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 490, 9 },
                    { 57, 7, 7, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 9 },
                    { 58, 8, 8, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 220, 10 },
                    { 59, 9, 9, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 390, 10 },
                    { 60, 10, 10, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 10 },
                    { 61, 1, 1, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 100, 2 },
                    { 62, 2, 2, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 200, 2 },
                    { 63, 3, 3, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 300, 2 },
                    { 64, 4, 4, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 350, 2 },
                    { 65, 5, 5, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 400, 3 },
                    { 66, 6, 6, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 3 },
                    { 67, 7, 7, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 150, 3 },
                    { 68, 8, 8, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 160, 4 },
                    { 69, 9, 9, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 180, 4 },
                    { 70, 10, 10, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 190, 4 },
                    { 71, 1, 1, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 290, 5 },
                    { 72, 2, 2, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 5 },
                    { 73, 3, 3, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 360, 5 },
                    { 74, 4, 4, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 5 },
                    { 75, 5, 5, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 420, 6 },
                    { 76, 6, 6, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 6 },
                    { 77, 7, 7, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 6 },
                    { 78, 8, 8, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 210, 7 },
                    { 79, 9, 9, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 7 },
                    { 80, 10, 10, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 7 },
                    { 81, 1, 1, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 8 },
                    { 82, 2, 2, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 8 },
                    { 83, 3, 3, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 410, 8 },
                    { 84, 4, 4, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image8.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 8 },
                    { 85, 5, 5, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 590, 9 },
                    { 86, 6, 6, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 490, 9 },
                    { 87, 7, 7, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 9 },
                    { 88, 8, 8, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 220, 10 },
                    { 89, 9, 9, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 390, 10 },
                    { 90, 10, 10, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 10 },
                    { 91, 1, 1, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 100, 2 },
                    { 92, 2, 2, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 200, 2 },
                    { 93, 3, 3, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 300, 2 },
                    { 94, 4, 4, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 350, 2 },
                    { 95, 5, 5, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 400, 3 },
                    { 96, 6, 6, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 3 },
                    { 97, 7, 7, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 150, 3 },
                    { 98, 8, 8, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 160, 4 },
                    { 99, 9, 9, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 180, 4 },
                    { 100, 10, 10, new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 190, 4 },
                    { 101, 1, 1, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 290, 5 },
                    { 102, 2, 2, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 5 },
                    { 103, 3, 3, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 360, 5 },
                    { 104, 4, 4, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image4.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 5 },
                    { 105, 5, 5, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 420, 6 },
                    { 106, 6, 6, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 340, 6 },
                    { 107, 7, 7, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image5.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 6 },
                    { 108, 8, 8, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 210, 7 },
                    { 109, 9, 9, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 7 },
                    { 110, 10, 10, new DateTime(2024, 1, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image6.jpg", new DateTime(2024, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 7 },
                    { 111, 1, 1, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 280, 8 },
                    { 112, 2, 2, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 320, 8 },
                    { 113, 3, 3, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image7.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 410, 8 },
                    { 114, 4, 4, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image8.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 8 },
                    { 115, 5, 5, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 590, 9 },
                    { 116, 6, 6, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 490, 9 },
                    { 117, 7, 7, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image8.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 230, 9 },
                    { 118, 8, 8, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 220, 10 },
                    { 119, 9, 9, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 390, 10 },
                    { 120, 10, 10, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image9.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 270, 10 },
                    { 121, 1, 1, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 100, 2 },
                    { 122, 2, 2, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 200, 2 },
                    { 123, 3, 3, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 300, 2 },
                    { 124, 4, 4, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 350, 2 },
                    { 125, 5, 5, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 400, 3 },
                    { 126, 6, 6, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 250, 3 },
                    { 127, 7, 7, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image2.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 150, 3 },
                    { 128, 8, 8, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 160, 4 },
                    { 129, 9, 9, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 180, 4 },
                    { 130, 10, 10, new DateTime(2024, 1, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image3.jpg", new DateTime(2024, 1, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 190, 4 }
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
