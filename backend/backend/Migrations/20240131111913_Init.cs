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
                name: "News",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DayCreateNew = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Offers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OfferCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discount = table.Column<double>(type: "float", nullable: false),
                    FromStation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ToStation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BeginDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Enabled = table.Column<bool>(type: "bit", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PromoteTrips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromStation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ToStation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MinPrice = table.Column<double>(type: "float", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromoteTrips", x => x.Id);
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
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    Enabled = table.Column<bool>(type: "bit", nullable: false),
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
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    NewsId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_News_NewsId",
                        column: x => x.NewsId,
                        principalTable: "News",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    TicketPrice = table.Column<double>(type: "float", nullable: false),
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
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TripId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SeatsList = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalPrice = table.Column<double>(type: "float", nullable: true),
                    isCancel = table.Column<bool>(type: "bit", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BookDate = table.Column<DateTime>(type: "datetime2", nullable: true)
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
                    { 1, "driver1.png", "234567", "driver1@phtv.com", true, "Nguyen Van Toan", "2345678", null, "$2a$11$qSnoUE5HZZjNplrsk0hF2uX7wJaujirQ6qSBGgJrd.Ks0ny.fh/x.", "090123456", "Ho Chi Minh", new DateTime(1995, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 2, "driver2.png", "234567", "driver2@phtv.com", true, "Le Huy Phu", "2345678", null, "$2a$11$ymtrl1wDmXqNC4Ve6bwMo./m2bq6FNr.8CLgNv0V1xvNL0sG7nQya", "090123456", "Lam Dong", new DateTime(1998, 7, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 3, "driver3.png", "234568", "driver3@phtv.com", true, "Bui Quoc Viet", "2345679", null, "$2a$11$PIshZAQsmbvgS/xvz44nq.hp3SPzhiDIb4FTWf42UXpcngqyFqp66", "090123457", "Binh Thuam", new DateTime(1993, 7, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 4, "driver4.png", "234569", "driver4@phtv.com", true, "Pham Huy Hoang", "2345670", null, "$2a$11$OcY5cHRnTVHJZa8z3JRWLe1nR/8aATqVW/vltbbaG75w1XzIxvHlq", "090123458", "Gia Lai", new DateTime(1990, 9, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 5, "driver5.png", "234560", "driver5@phtv.com", true, "Le Huy Chuong", "2345671", null, "$2a$11$COILthSirsKxb3vxqavwoOfK3tRiDubxlAKXMcxdldNKJzxco/53e", "090123459", "Vung Tau", new DateTime(1999, 12, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 6, "driver6.png", "234561", "driver6@phtv.com", true, "Le Thanh Thien", "2345672", null, "$2a$11$kPMp2igpcVBeDcwb0jTuwO1hDbD6DlXlt.rKgPeOUrNM0tql8qdkG", "090123450", "Hà Nội", new DateTime(1997, 3, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 7, "driver7.png", "234562", "driver7@phtv.com", true, "Le Dai Vi", "2345673", null, "$2a$11$r2c1FRZ/wz.Gi7HvRV4dM.4DPGR0/eI72udcpifyGMKAbB8M6f1uG", "090123452", "Ca Mau", new DateTime(1996, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 8, "driver8.png", "234563", "driver8@phtv.com", true, "Le Huy Phu", "2345674", null, "$2a$11$FTbt3/cPDIJGvpxGSFLOCegpRzVB01wue5VIEybTrB5x7d2/vHDQi", "090123451", "Lam Dong", new DateTime(1994, 1, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 9, "driver9.png", "234564", "driver9@phtv.com", true, "Le Huy Quan", "2345675", null, "$2a$11$vR6ym1OEdTaAG/oiApjbEOKApg6ptUIA6BSBsZIdso6utZvzfLPJm", "090123453", "Ben Tre", new DateTime(2000, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 10, "driver10.png", "234565", "driver10@phtv.com", true, "Le Huy Linh", "2345676", null, "$2a$11$RqZkyeoIevG92HqD/j2e4Ot7NbHLhbVcnAG72KurVlVJM3WAmaVwa", "090123455", "Dong Thap", new DateTime(1978, 4, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), false }
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
                table: "News",
                columns: new[] { "Id", "Content", "DayCreateNew", "Image", "Title" },
                values: new object[,]
                {
                    { 1, "<p>Leading global travel service provider Trip.com Group is embracing new trends and opportunities in the post-pandemic travel landscape, with its CEO Jane Sun sharing insights at the prominent World Economic Forum (WEF) Annual Meeting held in Davos, Switzerland, this week. Ms Sun also expressed optimism about Asia’s continued growth and shared her perspective on its investment potential at the panel discussion titled “Asia – the world’s next growth anchor?”</p><p>As major leaders from government, business, and civil society gathered to discuss the fundamental principles of driving trust in a world of fractures and uncertainties, the panel convened influential stakeholders to delve into the exciting opportunities and new challenges emerging in Asia. Speaking alongside Ms Sun were Mr Roy Gori, President and CEO of Canada’s largest insurance company Manulife, and Mr Geoff Lee, Executive Director, Head of Private Markets and Head of Technology at Malaysia’s sovereign wealth fund Khazanah Nasional. Mr Ben Hung, CEO, Asia, at Standard Chartered Bank, moderated the panel.</p><p>With global tourism approaching a full recovery, Trip.com Group has witnessed strong booking interest in Asia, with Thailand, Japan, and South Korea among the top travel destinations. The rise in consumer income has also led to growing trends in the region such as high-quality wellness experiences and event tourism, particularly for sought-after events like concerts and music festivals.</p><p>Sustainable tourism is another shift that is picking up steam, with environmental awareness motivating more than 16 million Trip.com Group customers to choose low-carbon travel options, such as hotels that adhere to sustainable standards. The Group has also prioritised options such as the rental of electronic vehicles and offering flights with lower carbon emissions.</p><p>Zooming in on the post-pandemic economic trajectory in one of Asia’s largest regions, Ms Sun asserted that China offers more investment opportunities than what some may have perceived.</p><p>“Investors should not overlook the thriving travel, wellness or entertainment sector in China. With its vast size, diverse industries, and varying levels of consumer buying power, the investment opportunities are abundant,” said Ms Sun. In particular, the travel sector presents numerous untapped growth opportunities, such as the rapid increase in inbound and outbound travel, as well as favourable policy developments.</p><p>Ms Sun expressed optimism about the growth of the tourism industry, especially with recent positive developments, such as increased flight capacities and expanded visa-free arrangements, that have facilitated international travel to and from China. These include the recent unilateral visa-free policies for several countries, including France, Germany, Spain, Italy, and the Netherlands, mutual visa-free agreements with Malaysia, and plans for similar arrangements with Singapore and Thailand. China also announced earlier in the week that it will unilaterally grant visa-free entry to Swiss and Irish nationals. Since July 2023, China has removed visa requirements for citizens of 11 nations.</p><p>According to Trip.com Group data, significant increases have been recorded in inbound search and booking volumes from countries such as Germany, Spain, and the Netherlands. Those with visa-free arrangements or plans for relaxed visa policies, such as Singapore, Thailand, and Malaysia, are among the top destinations favoured by Chinese tourists for the upcoming Chinese New Year.</p><p>Moreover, since its launch in September 2023, Trip.com’s “China Travel Guide”, which provides information about hotel, transport, payment, and other travel-related issues, has served nearly 100,000 international travellers planning to visit China. Meanwhile, as of mid-January, outbound travel orders for the upcoming Chinese New Year holidays have surged more than 10 times compared to the previous year.</p><p>For the wider Asian economy, Ms Sun maintained that its prospects remain robust, citing projections that it will contribute to around 50% of global GDP growth. The rapid development of the tourism industry in Asia, coupled with the strong purchasing power of Asian customers, has indicated the potential for sustained growth in the region.</p><p>“We are committed to forging an influential network for our global partners, empowering them to welcome customers from every corner of the world,” said Ms Sun. “Equally, we stand poised to usher Asian customers into the global arena, opening doors to boundless opportunities and creating pathways for unprecedented international success.”</p>", new DateTime(2024, 1, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "news1.png", "PHTV-BusOnlineTicket.com Group at World Economic Forum 2024: Revealing Asia’s biggest untapped opportunities in tourism" },
                    { 2, "<p>Trip.com Group, a leading global travel service provider, has set its sights on tackling key challenges surrounding the tourism industry. This is evidenced by CEO Ms Jane Sun's participation in the panel discussion \"Sorry, We're Full: Tackling Overtourism\" at the prestigious World Economic Forum in Davos, Switzerland. The forum invited influential dignitaries, from political elites to business leaders, to tackle the challenges facing our world, in the hope of finding common ground and united solutions, aligning with this year's theme of \"Rebuilding Trust\".</p><p>Davos comes as the world looks forward to forging a new normal for sustainable travel in the post-pandemic era. Over 75% of respondents in Trip.com Group’s sustainability report agreed that sustainable travel is vital. However, the industry faces obstacles to sustainable travel, particularly as the rise in visitor numbers approaches pre-pandemic levels. Consequently, destinations contend with multiple challenges, such as preserving heritage sites, combating pollution, and looking after their ecosystems.</p><p>At the forum, Ms Sun shared her views on the challenges of overtourism for multiple stakeholders across the industry. Ms Sun spoke alongside a distinguished panel of guests, including Ms Sithembile Ntombela, Acting Chief Executive Officer of Brand South Africa; Mr Stephen Cotton, General Secretary of the International Transport Workers' Federation (ITF); and Mr Tony Fernandes, Chief Executive Officer of Capital A Berhad (AirAsia). The forum was moderated by CNN International’s anchor and correspondent Richard Quest.</p><p><br><i>From left to right: Mr Richard Quest, CNN International’s anchor and correspondent; Ms Jane Sun, CEO of Trip.com Group; Ms Sithembile Ntombela, Acting Chief Executive Officer of Brand South Africa; Mr Tony Fernandes, Chief Executive Officer of Capital A Berhad (AirAsia); and Mr Stephen Cotton, General Secretary of the International Transport Workers’ Federation (ITF). Source: World Economic Forum</i></p><p>Ms Sun also met with government officials from various countries to build upon the success of the region's travel growth momentum.</p><p>Tackling overtourism can only work if sustainability is embedded across the travel and tourism industry. Trip.com Group addresses this challenge through a multifaceted approach, with initiatives to promote sustainable travel practices, improve infrastructure, and combat the environmental and social implications.</p><p>\"We need to approach the issue of overtourism with a balanced view. Destinations can become overcrowded without proper management, and the overall experience suffers. It's imperative to find ways for supply and demand to grow sustainably,\" said Ms Sun.</p><p>Investing in high-quality tourism is a viable approach to attract visitors to less well-travelled destinations. Several key markets, such as Thailand and Malaysia, have endorsed the idea of attracting \"high-value\" tourists to redirect demand away from hotspots. Simultaneously, other regions aim to diversify tourist influx by offering niche forms of tourism unique to under-visited regions. This mitigates overtourism and holds the potential for economic gains, with destinations such as Dubai successfully expanding their wellness tourism industry to an estimated value exceeding USD 108 billion.</p><p>To alleviate pressure on popular destinations, another strategy involves the promotion of lesser-known destinations, known as long-tail tourism. Advancements in technology and social networking have made marketing approaches that focus on lesser-known locales more effective. For instance, Trip.com Group employs content marketing strategies, including e-commerce campaigns and leveraging its social travel platform, Trip Moments, to showcase less visited areas. Daegu – a lesser-known destination in Korea – was highlighted in a successful digital campaign which garnered over 29 million views, resulting in an 87% increase in product sales compared to the same period in the previous year.</p><p>Beyond promoting lesser-known destinations, targeting lull periods or traditionally low travel seasons can help to address overtourism during peak travel periods. To make this possible, Trip.com Group provides advanced and flexible booking options to ensure customers have the freedom to adapt their travel plans whenever necessary.</p><p>The Group is also keen to collaborate with partners and industry stakeholders to find sustainable solutions over the long run.</p><p>“The complex challenges of overtourism demand more than quick fixes – it will not be resolved overnight. However, through unwavering dedication from multiple stakeholders, we believe that every effort contributes to shaping a future where travel harmonises seamlessly with sustainable principles. This goes beyond a goal; it’s a powerful commitment to redefine the very essence of responsible travel,” stated Ms Sun.</p>	2024-01-22T16:49:06.039	moqxtq0n.pjwnew2.jpg	\r\n11	Trip.com Group and Vietjet Air Sign MOU to Improve Global Travellers’ Experience	<p>Leading global travel service provider Trip.com Group has signed a Memorandum of Understanding (MOU) with Vietjet Air to leverage the expertise and resources of both parties to make travel easier and more convenient for travellers around the world.</p><p>This will be achieved through various initiatives, such as offering Trip.com Group’s products – including hotels, airport transfers, attractions and activities – to customers on Vietjet’s website. Meanwhile, the Group will provide Vietjet with innovative technologies, such as the Virtual Interline solution to widen Vietjet’s global network footprint, and also share valuable insights to empower Vietjet to make informed decisions to optimise customer experience. Furthermore, the data integration initiative will enable customers to enjoy numerous benefits from both parties’ loyalty programmes. Members of Vietjet SkyJoy and Trip.com Rewards can accumulate reward points to exchange for gifts, flight tickets, and other incentives from a plethora of third-party products and services.</p><p>With the commitment of prioritising customer satisfaction, together, Trip.com Group and Vietjet will create a seamless travel experience, offering a comprehensive range of travel content, products, and exciting deals.</p><p><strong>Mr Yudong Tan, Chief Executive Officer, Flights, Trip.com Group</strong>, said: “We are delighted to partner with Vietjet Air, a leading low-cost airline, to offer travellers seamless experiences when planning and booking their trips with a comprehensive range of travel products and deals. We have worked with Vietjet before on successful campaigns to promote Vietnam as a destination of choice for travellers, and believe our mutual commitment to prioritising customer satisfaction is a testament to both companies’ customer centricity. We look forward to a fruitful partnership with Vietjet Air.”</p><p>To celebrate this exciting milestone, Vietjet and Trip.com Group will offer travel enthusiasts a special promotion with up to 50% off on airfares from today until 22 January 2024, applicable to Vietjet’s entire flight network. Customers can simply book Vietjet flights on Trip.com, <a href=\"http://www.vietjetair.com/\">www.vietjetair.com</a>, or the Vietjet Air mobile app to unlock a 50% discount on the ticket fares by entering the code TR24150, 20% off with the code TR24120, and 10% off with the code TR24110*. The promotion is valid for flights from 30 March to 31 October 2024#.</p><p>Vietjet, recognised as one of the world's top 10 safest low-cost airlines by AirlineRatings.com, currently operates a fleet of nearly 110 aircraft, serving over 30 international routes and catering to 32 million customers across Vietnam and internationally. These services connect passengers to destinations in Australia, India, China, Japan, South Korea, Indonesia, Thailand and Singapore, among others.</p><p>Bookings on Trip.com Group’s platforms last year for Vietnam-related products almost tripled (299.7%) year-on-year (YoY). Arrivals in Vietnam last year also increased similarly, with full-year numbers showing robust 344.2% growth. There has been a similar appetite for outbound travel from Vietnam as well, with outbound bookings in 2023 growing 213.2% YoY.</p><p>(*) Exclusive of taxes and fees. Other terms and conditions apply<br>(#) Exclusive of public holidays and peak seasons</p>", new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "news2.jpg", "PHTV-BusOnlineTicket.com Group CEO tackles overtourism for sustainable travel at World Economic Forum" },
                    { 3, "<p>A delegation led by Malaysia’s Minister of Tourism, Arts and Culture, Dato' Sri Tiong King Sing, was hosted at leading global travel service provider Trip.com Group’s headquarters in Shanghai by the Group’s Chief Executive Officer Ms Jane Sun and other senior executives. Following a productive meeting where both parties engaged in in-depth discussions about the development of Malaysia’s tourism industry, the Group and the Ministry of Tourism, Arts, and Culture (MOTAC) signed a strategic partnership to promote Malaysia as a destination of choice for the Chinese outbound market.</p><p>The partnership was signed by Mr Edison Chen, Vice President of Destination Marketing &amp; Strategic Alliances, Trip.com Group, and Dato' Yeoh Soon Hin, Deputy Chairman of Tourism Malaysia, and witnessed by Ms Sun and Dato’ Sri Tiong. It solidifies a close partnership that has been maintained for many years.</p><p>Malaysia is actively building towards “Visit Malaysia Year 2026”, with target of 26.1 million international tourist arrivals and MYR97.6 billion in tourist expenditure. To this end, both parties will collaborate extensively to promote Malaysia as a tourism destination, utilising online and offline resources to craft customised outbound marketing campaigns, provide high-quality travel services to Chinese tourists, enhance user travel experiences, and actively promote the full recovery of Malaysia's tourism industry.</p><p>Said Ms Jane Sun, Chief Executive Officer, Trip.com Group: “Malaysia enjoys an abundance of tourist attractions – I have been there many times myself, and have been deeply impressed by the unique characteristics of each destination. With the recent introduction of mutual visa-free entry for visitors from China and Malaysia, the rejuvenation of tourism offerings and the upgrading of destination experiences, more tourists will turn their attention to Malaysia. Trip.com Group will help Malaysian tourism seize this opportunity to achieve full recovery and grow further.”</p><p>Expressing confidence in the collaboration, Dato' Sri Tiong King Sing, Minister of Tourism, Arts and Culture, Malaysia, said: “I am honoured to witness the signing of this strategic partnership, and I hope that both sides will be able to quickly start deploying the plans in order to fully implement the partnership in the near future. With Trip.com Group’s strength and years of experience, I have no doubt that Malaysia will become the preferred destination for more Chinese travellers next year.”</p><p>To celebrate the partnership, Tourism Malaysia will appear on this evening’s Boss Live broadcast at 7.00pm to host the first-ever Malaysia-themed live event on the Trip.com’s Ctrip app, offering exclusive discounts and a wide range of travel products to users across the platform.</p><p>Following the introduction of the mutual visa exemption policy between China and Malaysia on 26 November 2023, Trip.com Group’s data showed that Malaysia-related searches increased by 96% compared to the previous week. With favourable policies from both countries and deepening cooperation, this collaboration is poised to seize the opportunity for extensive growth in bilateral tourism and cultural exchanges.</p><p>In 2022, Malaysia’s tourism industry contributed MYR251.5 billion to Malaysia’s gross domestic product (GDP). This constituted 14% of its GDP, making tourism the country’s third largest contributor. It also contributed 23.4% to Malaysia’s total workforce, with 3.61 million people employed in 2022.</p>", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), "news3.jpg", "PHTV-BusOnlineTicket.com Group Signs Strategic Partnership with Malaysia’s Tourism Ministry" },
                    { 4, "<p>In its first appearance at World Travel Market (WTM) 2023, Trip.com Group, a global leader in travel services, laid out its inroads into the European market and the transformative role of artificial intelligence. The event, held from 6-8 November in London, provided a platform for Trip.com Group to articulate its vision of reshaping the travel experience with advanced AI technology and to solidify its position as an emerging key player in the European travel market.</p><p><strong>Leap Forward in AI-Powered Travel Customisation</strong><br>Boon Sian Chai, Managing Director and Vice President for International Markets at Trip.com Group took centre stage at the event's Technology Summit. Chai discussed the pivotal role of AI in revolutionising the travel sector, enhancing customer service through intelligent chatbots, and improving overall service experiences while also touching on the resurgence of outbound travel from China.</p><p>The introduction of TripGenie, Trip.com Group's AI assistant, earlier this year marked a significant enhancement in the company's technology suite. TripGenie has notably improved user engagement and conversion rates by personalising travel experiences and simplifying travel planning. The Group plans to further enhance TripGenie's features, augmenting its capability to provide bespoke travel arrangements.</p><p>\"Our AI-driven tools, such as our curated travel lists, Trip.Trends and Trip.Best, transcend mere technological evolution,\" Chai stated. \"They foster a sense of community and enrich the travel experience, adding a personal touch to each journey our customers undertake.\"</p><p>Chai highlighted the impressive impact of \"Trip.Best,\" which has markedly increased traffic and bookings for partner hotels, and the success of \"Trip Moments,\" which has actively involved a substantial segment of the app's users in creating and sharing content. The Group's strides in AI for customer service, celebrated for their accuracy in understanding user queries and high rates of resolving inquiries autonomously, have further cemented their dedication to improving customer interactions.</p><p><strong>Trip.com Group's Strategic Growth in the European Market</strong><br>Andy Washington, General Manager for Europe at Trip.com Group, emphasised the company's strategic commitment to integrating with local cultures and travel ecosystems.</p><p>\"Our comprehensive, all-in-one app ensures a personalised journey for every traveller, reflecting the unique character of each destination and catering to the diverse preferences of our customers. It encompasses a wide array of transportation options, accommodations, and local experiences, all while championing responsible travel and sustainability,\" he noted.</p><p>Although still in the growth stage across Europe, Trip.com Group's bookings are witnessing a notable increase, signalling an expansion of its influence across the continent. The company's data reveals a significant uptick in travel activity from Europe, with the UK experiencing a 67% increase in flight bookings and a 62% rise in hotel reservations from 2022 to 2023. This figure dramatically eclipses pre-pandemic levels with a staggering 604% growth in flights compared to 2019. Similar upward trends are evident across other key European markets, including Germany, France, Spain, and Italy, which collectively have seen a 40% rise in flight bookings and a 60% increase in hotel bookings year over year.</p><p>As WTM London 2023 wraps up, Trip.com Group delivers a clear statement: technology and personalisation are at the forefront of travel's future. The company's active role at the event underscores its dedication to driving travel forward with innovative approaches and a deep understanding of the burgeoning European market.</p>", new DateTime(2024, 1, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "news4.jpg", "PHTV-BusOnlineTicket.com Group's Inaugural WTM Showcase Highlights Surge in European Travel Market and AI-Driven Industry Transformation" },
                    { 5, "<p>Trip.com Group, a global leader in online travel services, took centre stage at ITB Asia in Singapore, highlighting the pivotal role of Artificial Intelligence (AI) in reshaping the travel industry. James Liang, Co-founder and Chairman of Trip.com Group, delivered a keynote, emphasising the Group’s commitment to elevating customer experiences through AI-driven innovation.</p><p><strong>TripGenie leads AI-powered travel ecosystem</strong></p><p>Trip.com Group's AI travel assistant, TripGenie, stands out as a transformative innovation tailored to crafting itineraries and enhancing travel bookings within the all-in-one Trip.com Group app. Since its launch earlier this year and subsequent July upgrade, TripGenie has produced remarkable results.</p><p>Notable achievements include doubling the order conversion rate and improving user retention rates, resulting in enhanced user engagement and overall service effectiveness.</p><p>TripGenie’s recommendation capability for complex queries, combined with highly accurate compressive search, allows a user to find what they are looking for quickly and with great accuracy, providing a superior experience for Trip.com users.</p><p>Furthermore, TripGenie has redefined the user experience by excelling in travel and itinerary planning, including multi-destination planning, a soon-to-deploy feature. TripGenie provides quick inspiration for the uninspired traveller, creating personalised editable itineraries in under a minute. Advanced itinerary themes cater to various travel types, combining text and voice commands for a seamless user experience. Aside from English, users may also access these commands in traditional and simplified Chinese, Cantonese, Korean, and Japanese.</p><p>Trip.com Group envisions TripGenie at the forefront of the AI travel evolution. With plans to roll out itinerary sharing features and increased personalisation options such as upvoting and liking, TripGenie will enhance collaborative travel planning for a more personalised experience.</p><p>James Liang, Co-founder and Chairman of Trip.com Group, said, \"Our AI expertise empowers the travel industry by transforming the way travellers plan and book their trips. With AI-tailored travel solutions like TripGenie, we enhance engagement, accuracy, and personalisation in the travel experience. I think the name, “TripGenie” is quite suitable for our mission, for our goal is to help the customer plan the perfect trip like a genie. In this new era of travel, we are optimistic, forging ahead to enrich their travel experiences with AI and pursue the perfect trip for a better world.\"</p><p><strong>AI-enhanced travel insights and customer service</strong></p><p><br>Boon Sian Chai, Managing Director and Vice President of International Markets at Trip.com Group, detailed the Group’s AI ecosystem, including its algorithmic, AI-powered lists like \"Trip.Trends,\" \"Trip.Best,\" and \"Trip.Deals\". These lists offer curated information based on user preferences and real-time data, encouraging a vibrant travel ecosystem where Trip.Best boosts partner bookings and Trip Moments facilitates user-generated content.</p><p>Mr Chai said, “We build strong communities on our all-in-one app to deepen our travel experiences and appetite for travel between partners and travellers. Trip.Best, which is our AI-curated recommendation travel list, inspires our traveller community to browse and book their favourite properties, in turn boosting traffic by 20% and bookings by 10% for over 1,500 hotel partners. Our Trip Moments platform brings together travellers who share their experiences, recommendations, and reviews, creating a rich source of travel stories. Engaged by 35% of our app users, this platform attracts and retains travellers well, and influences 22% of them to book a travel-related product within a month.”</p><p>The Group’s extensive proprietary database, enriched by human feedback, are supported by a global team of experts who curate travel content, ensuring authenticity and immersion in travel experiences in our all-in-one app.</p><p>Besides this, Mr Chai explained that AI technology also played a significant role in improving customer service within the travel sector. Trip.com Group has achieved remarkable self-service rates, where AI chatbots handle numerous inquiries via text and voice with over 85% semantic recognition accuracy. This streamlined approach results in impressive self-service resolution rates of 78% for airline tickets and 68% for hotels.</p><p>The success of our AI integration saves the time and energy of customers and service agents, thereby accelerating case solving efficiency. Empowered by AI, customer service teams can focus on more complex cases and provide a better overall experience for customers.</p><p><strong>AI-powered journeys amid growing travel demand</strong></p><p>Jane Sun, Trip.com Group CEO, said, “As the appetite for travel continues to grow, the future of AI in travel is expected to focus on efficient and highly personalised solutions tailored to individual travellers' needs. This vision not only signifies the next phase of the travel industry but also underscores the profound impact of AI in making travel more convenient, personalised, and memorable for everyone. Together with our partners, Trip.com Group stands ready to support and shape the future of travel with AI.”</p><p>Trip.com Group's AI push follows a thriving travel market, with international travel restrictions lifted and domestic and regional tourism experiencing a substantial surge. According to data by Trip.com Group, during China's Golden Week, outbound travel volume surged by over 800% compared to the previous year, while domestic tourism grew by nearly 200% this year.</p><p>&nbsp;</p>", new DateTime(2024, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "news5.jpg", "PHTV-BusOnlineTicket.com Group Empowers the Travel Industry with Transformative AI Innovation" },
                    { 6, "<p>In its first appearance at World Travel Market (WTM) 2023, Trip.com Group, a global leader in travel services, laid out its inroads into the European market and the transformative role of artificial intelligence. The event, held from 6-8 November in London, provided a platform for Trip.com Group to articulate its vision of reshaping the travel experience with advanced AI technology and to solidify its position as an emerging key player in the European travel market.</p><p><strong>Leap Forward in AI-Powered Travel Customisation</strong><br>Boon Sian Chai, Managing Director and Vice President for International Markets at Trip.com Group took centre stage at the event's Technology Summit. Chai discussed the pivotal role of AI in revolutionising the travel sector, enhancing customer service through intelligent chatbots, and improving overall service experiences while also touching on the resurgence of outbound travel from China.</p><p>The introduction of TripGenie, Trip.com Group's AI assistant, earlier this year marked a significant enhancement in the company's technology suite. TripGenie has notably improved user engagement and conversion rates by personalising travel experiences and simplifying travel planning. The Group plans to further enhance TripGenie's features, augmenting its capability to provide bespoke travel arrangements.</p><p>\"Our AI-driven tools, such as our curated travel lists, Trip.Trends and Trip.Best, transcend mere technological evolution,\" Chai stated. \"They foster a sense of community and enrich the travel experience, adding a personal touch to each journey our customers undertake.\"</p><p>Chai highlighted the impressive impact of \"Trip.Best,\" which has markedly increased traffic and bookings for partner hotels, and the success of \"Trip Moments,\" which has actively involved a substantial segment of the app's users in creating and sharing content. The Group's strides in AI for customer service, celebrated for their accuracy in understanding user queries and high rates of resolving inquiries autonomously, have further cemented their dedication to improving customer interactions.</p><p><strong>Trip.com Group's Strategic Growth in the European Market</strong><br>Andy Washington, General Manager for Europe at Trip.com Group, emphasised the company's strategic commitment to integrating with local cultures and travel ecosystems.</p><p>\"Our comprehensive, all-in-one app ensures a personalised journey for every traveller, reflecting the unique character of each destination and catering to the diverse preferences of our customers. It encompasses a wide array of transportation options, accommodations, and local experiences, all while championing responsible travel and sustainability,\" he noted.</p><p>Although still in the growth stage across Europe, Trip.com Group's bookings are witnessing a notable increase, signalling an expansion of its influence across the continent. The company's data reveals a significant uptick in travel activity from Europe, with the UK experiencing a 67% increase in flight bookings and a 62% rise in hotel reservations from 2022 to 2023. This figure dramatically eclipses pre-pandemic levels with a staggering 604% growth in flights compared to 2019. Similar upward trends are evident across other key European markets, including Germany, France, Spain, and Italy, which collectively have seen a 40% rise in flight bookings and a 60% increase in hotel bookings year over year.</p><p>As WTM London 2023 wraps up, Trip.com Group delivers a clear statement: technology and personalisation are at the forefront of travel's future. The company's active role at the event underscores its dedication to driving travel forward with innovative approaches and a deep understanding of the burgeoning European market.</p>", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "news6.jpg", "PHTV-BusOnlineTicket.com Group's Inaugural WTM Showcase Highlights Surge in European Travel Market and AI-Driven Industry Transformation" },
                    { 7, "<p>Leading global travel service provider Trip.com Group and the Tourism Authority of Thailand (TAT) today signed a Letter of Intent (LOI) to cooperate on bolstering tourism in Thailand. This collaboration aims to promote Thailand as the premier travel hotspot for tourists from the Chinese mainland, who have consistently ranked it as one of their top destinations.</p><p>The LOI was signed by Amanda Wang, Vice President, Global Destinations, Trip.com Group and Thapanee Kiatphaibool, Governor, Tourism Authority of Thailand, in Beijing, China. It was part of an official visit by a high-level delegation to China led by Srettha Thavisin, Prime Minister of Thailand.</p><p>Ms Wang said: “Thailand has consistently captivated the hearts of travellers from the Chinese mainland, establishing itself as an irresistible destination. With the recent introduction of visa-free travel to Thailand, we foresee this trend of travel to Thailand continuing, and look forward to working closely with TAT to bring more tourists to the Land of Smiles.”</p><p>Ms Kiatphaibool said: “The signing of this Letter of Intent signifies a new phase of comprehensive co-operation in the promotion of Thai tourism in the Chinese market. The Tourism Authority of Thailand will use this as a framework to continue our close collaboration, and make every effort to ensure the safety and security of tourists travelling to Thailand. We will also organise a series of promotional activities to attract more tourists from mainland China to Thailand, promoting the high-quality development of our tourism sector.”</p><p>The LOI signed between the two parties will serve as a catalyst to further enhance the existing partnership and harness the extensive expertise and insights of Trip.com Group on Chinese travellers. It will entail knowledge and information sharing, joint promotional activities, as well as the establishment of formal communication channels for regular bilateral tourism updates. It formalises an established and fruitful working relationship between the two parties, a notable recent example being January's Thailand edition of the Group’s “Super World Trip” series of livestreams.</p><p>The three-hour livestream session targeting the outbound mainland Chinese audience recorded sales of more than 20,000 room nights amounting to a Gross Merchandise Value of over RMB 40 million, featuring almost 60 products, including attractions, tickets and staycation packages at hotels across Thailand such as The Peninsula Bangkok, Capella Bangkok, InterContinental Pattaya Resort, and Banyan Tree Krabi.</p><p>Thailand was one of the top destinations of choice for Chinese tourists during the recent Golden Week holidays, with outbound travel volume to Thailand at over 11 times of 2022 volume for the same period. Compared to this year’s May Day holidays, volume was up by 27.6%. After the announcement of visa-free travel for Chinese travellers was made last month, searches for Thai destinations across Trip.com Group’s platforms soared by 800%.</p>", new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "news7.png", "PHTV-BusOnlineTicket.com Group  and Tourism Authority of Thailand Sign Partnership" },
                    { 8, "<p>Trip.com Group CEO Jane Sun highlighted the dynamic role of tourism as a key economic driver at the inaugural SuperBridge Summit Dubai. Her message emphasised the industry's remarkable resilience and potential to drive substantial global growth, particularly in the Middle East. She also discussed the future of sustainable travel in the post-pandemic era.</p><p>Trip.com Group CEO Jane Sun (right), addressing the topic of tourism as a key driver of the economy, at the inaugural SuperBridge Summit in Dubai.</p><p>Ms Sun underscored the pivotal role of travel and tourism, noting that the travel industry, prior to the pandemic, contributed to 10% of all jobs worldwide, ushering in 1 in every 5 new job opportunities.</p><p>In the Middle East, an area brimming with opportunities, the UAE stands as the third-largest economy. According to global research, tourism represented 9% of the total GDP in 2022, with about USD 32 billion in international tourist spending. The sector also accounted for 12% of the UAE's GDP, employing 363,000 people in 2019.</p><p>In addition to the economic vitality of tourism, Ms Sun explored prevailing trends within the travel industry, notably the resurging demand for domestic and global travel. With international travel restrictions lifted, domestic and regional tourism has experienced a remarkable upsurge. For instance, during China's Golden Week, outbound travel volume surged by over 800% compared to the previous year, while domestic tourism grew by nearly 200% this year.</p><p>The Middle East, in particular, has emerged as a sought-after destination. According to Trip.com Group data, hotel bookings from China to the Middle East have surged by over 400% in 2023, alongside a 300% increase in flight volumes. Additionally, bookings for attractions and events in Dubai have seen an astounding 450% surge in 2023.</p><p>Ms Sun also emphasised the growing importance of sustainable travel, a trend accelerated by the pandemic. Travellers are increasingly environmentally conscious, driving the industry to adopt eco-friendly practices and products. In response, Trip.com Group has actively engaged in various initiatives to reduce carbon emissions and promote sustainable travel, including partnering with CHOOOSE to offset CO2 emissions and joining the Science Based Targets initiative (SBTi) to encourage low-carbon practices in the tourism industry. She also lauded Dubai's The Sustainable City aims to achieve net-zero energy by 2040 as a pioneering effort in creating eco-conscious destinations for tourists.</p><p><strong>Jane Sun, CEO of Trip.com Group, said,</strong> \"Tourism stands as a key economic driver with unparalleled potential, driving global prosperity and shaping a brighter future. We are committed to harnessing this potential in the Middle East, offering high-spending tourists an unparalleled blend of luxury and sustainability. Together, we will make the Middle East a prime destination for travellers seeking exceptional experiences and eco-friendly adventures.\"</p><p>Additionally, Ms Sun highlighted Trip.com Group's commitment to embracing technological innovation, particularly the Group’s AI-driven travel assistant, TripGenie. The tool is designed to streamline the booking process, catering to travellers' needs and enhancing their overall experience.</p><p>Trip.com Group is resolute in its mission to create a sustainable, innovative, and enjoyable future for the travel industry, leveraging tourism's economic vitality to propel global growth.</p>", new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "news8.jpg", "PHTV-BusOnlineTicket.com Group Highlights Tourism's Economic Vitality and Middle East Potential" },
                    { 9, "<p>Trip.com, the internationally renowned one-stop travel service provider, achieved a new milestone by securing three awards at the 2023 World Travel Awards™ – Europe. The company earned \"Europe's Leading Online Travel Agency 2023,\" \"Spain's Leading Online Travel Agency 2023,\" and \"England's Leading Online Travel Agency 2023.\" This recognition reflects the resounding vote of confidence from customers, travel professionals, and media, reaffirming Trip.com's steadfast commitment to excellence in serving travellers across these markets.<br>Trip.com received this year's World Travel Awards accolades during a prestigious ceremony held in Batumi, Georgia, on 29th September 2023, highlighting Trip.com's outstanding performance and ever-expanding influence in Europe's online travel agency (OTA) sector.</p><p>\"Securing three awards at the 2023 World Travel Awards - Europe is a testament to our unwavering dedication to delivering exceptional travel experiences and growing recognition at regional and country levels,\" said Andy Washington, General Manager of Trip.com Europe.</p><p>\"We are honoured to be acknowledged as the leading online travel agency in Europe, Spain, and England. Product choice, technological innovation, and exceptional customer support are undoubtedly the keys to this success. However, this achievement wouldn't have been possible without the tireless efforts of our team and the trust of our customers and industry partners, who cast their votes in our favour.\"</p><p>Graham E. Cooke, Founder, World Travel Awards, said: “Congratulations to Trip.com for winning 'Europe's Leading Online Travel Agency 2023,' 'Spain's Leading Online Travel Agency 2023,' and 'England's Leading Online Travel Agency.' This is a remarkable achievement, reflecting how the brand is setting the benchmark in online travel. The commitment of the entire team at Trip.com serves as an inspiration to us all.\"</p><p>Trip.com's extensive global network encompasses 1.2 million accommodation services, over 480 airlines, and more than 30,000 tourism partners. Through an innovative mobile-first strategy and a comprehensive all-in-one travel platform offering flights, hotels, trains, cars, attractions, and more. Trip.com has rapidly grown as a significant player in the European travel industry in recent years. Today, it holds a robust presence across the globe, with 48 website variations, support for 31 currencies, availability in over 20 languages, and operations spanning 39 countries and regions.</p><p>Trip.com is at the forefront of innovation in the travel industry with its latest advancements, including TripGenie. This cutting-edge chatbot utilises advanced AI technology to provide travellers with real-time live assistance, delivering personalised travel routes, customised itineraries and valuable booking advice directly on the Trip.com platform, offering unprecedented support and guidance throughout their journeys.</p><p>Trip.com offers world-class 24/7 multilingual customer services globally, instrumental in creating unparalleled travel experiences for millions of customers worldwide. The Edinburgh-based call centre, catering to the European region, is a dedicated workforce of over 200 professionals who provide round-the-clock English customer support, with its customer service team ensuring rapid responses, with most calls answered within 30 seconds.</p><p>In 2022, the platform witnessed a surge in global app downloads, with over 14.1 million installations. The Spanish and English markets have played pivotal roles in Trip.com's success in Europe.</p><p>The UK market, led by England, has experienced a remarkable surge, with daily app downloads increasing by an astonishing 400% year-on-year. The percentage of flight and hotel orders has risen by 180% and 80%, respectively, compared to 2022, with direct channel growth for flights and hotels at 240% and 170%, respectively.<br>These achievements highlight Trip.com's unwavering commitment to delivering unparalleled travel experiences and solidifying its reputation for dedication to customer satisfaction. With this remarkable success, Trip.com stands firm as a pioneering global travel service provider, leading the way in shaping the future of travel.</p>", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "news9.png", "PHTV-BusOnlineTicket.com Sweeps Three Awards at World Travel Awards™ 2023 – Europe" },
                    { 10, "<p>Trip.com Group today showcased its vision for the future of travel at its Envision 2023 global partner conference. The conference was attended by about 700 industry partners globally.</p><p>Mr James Liang, Chairman of Trip.com Group, remarked in his video address: “Travel is unique. It not only promotes economic growth and development but also fulfills our intellectual needs. Trip.com Group is dedicated to enriching the travel experience while maintaining industry responsibility. We believe that travel, as a fundamental human need, has the power to inspire innovation, drive progress, and foster a greater sense of unity and understanding among people from around the world.”</p><p>Speaking at the conference, Trip.com Group CEO Jane Sun recapped the company's journey, including the series of initiatives and programmes implemented in support of its partners during the past three years. Over the years, Trip.com Group has proactively collaborated with partners across hotels, flights, vacations and attractions, supporting their efforts in serving Chinese travellers, who are among the top spenders in many markets globally. In 2019, Chinese tourists represented 15% of international spending, and post-pandemic, that figure is set to grow tremendously.</p><p><strong>Growing Partner Value Across All Levels</strong></p><p>Specifically, Ms Sun shared Trip.com Group’s strategies in collaborating with its partners to chart the future of the travel and tourism industry. \"In recent years, Trip.com Group has strengthened our technological capabilities while, at the same time, implemented targetted strategies in various markets with the aim of connecting our partners with our users. These include our series of BOSS Live livestream sessions, enhancements to our global airfare capabilities, the launch of our AI travel assistant TripGenie, among others.</p><p>\"Today, we are well-positioned to support our partners unlock new opportunities and expand their reach to our international customers. We will leverage our technology to strengthen the positioning and visibility of our partners and their offerings to our customers, including the high-spending consumers from China. The travel and tourism industry contribute significantly to global GDP and employment, and Trip.com Group will continue to utilise advanced technology and innovation to create new opportunities and growths for our partners.”</p><p><strong>Shaping a Sustainable Vision of Travel for the Future</strong></p><p>On the sustainability front, the company's top leadership delved into comprehensive ESG strategies as well as the industry's approach to sustainability.</p><p>Ms Sun affirmed the promising outlook in a rejuvenated, eco-conscious landscape. She said, \"In this revitalised travel industry, the opportunities ahead are immense. We're poised to redefine the travel landscape with our cutting-edge tech innovations, expanding partnerships, and strong investor confidence. As we harness these opportunities, we envision a future where travel is not just thriving but is also greener and more responsible. The horizon is bright for our partners, investors, and travellers, and together, we'll journey towards a sustainable and prosperous future in travel.\"</p><p>Thanking the partners for their support over the years, Ms Sun concluded: \"Let us envision a future where travel is not just a destination, but a transformational experience. Together, we can chart the future of travel.\"</p>", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "news10.jpg", "PHTV-BusOnlineTicket.com Group Charts the Future of Travel at Envision 2023" }
                });

            migrationBuilder.InsertData(
                table: "Offers",
                columns: new[] { "Id", "BeginDate", "Discount", "Enabled", "EndDate", "FromStation", "Image", "OfferCode", "Title", "ToStation" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 1, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 30.0, true, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "offer1.png", "NEWYEAR24", "30% off for LUNARNEWYEAR 2024 ", null },
                    { 2, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 40.0, true, new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hồ Chí Minh", "offer2.png", "HCMHANOI", "40% off for route HO CHI MINH to HA NOI", "Hà Nội" },
                    { 3, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 30.0, true, new DateTime(2024, 2, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hà Nội", "offer3.png", "HANOIDALAT30", "30% off for route HA NOI to DA LAT", "Đà Lạt" },
                    { 4, new DateTime(2024, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 20.0, true, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hồ Chí Minh", "offer4.png", "WELCOME2024", "DISCOUNT 20% WITH CODE WELCOME2024", "Bến Tre" }
                });

            migrationBuilder.InsertData(
                table: "PromoteTrips",
                columns: new[] { "Id", "FromStation", "Image", "MinPrice", "ToStation" },
                values: new object[,]
                {
                    { 1, "Hồ Chí Minh", "image1.png", null, "Hà Nội" },
                    { 2, "Hà Nội", "image2.png", null, "Đà Lạt" },
                    { 3, "Cà Mau", "image3.png", null, "Hải Phòng" },
                    { 4, "Cần Thơ", "image4.png", null, "Bình Định" },
                    { 5, "Hải Phòng", "image5.png", null, "Nha Trang" },
                    { 6, "Đà Lạt", "image6.png", null, "Cà Mau" },
                    { 7, "Nha Trang", "image7.png", null, "Cần Thơ" },
                    { 8, "Bình Định", "image8.png", null, "Thái Nguyên" }
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
                    { 1, null, "admin@phtv.com", null, "$2a$11$vaO4gADljNYrjfTCwEbxhOUmk3QtmRtKJrQSWDADnYtAldu4L.vj2", "Admin" },
                    { 2, null, "emp@phtv.com", null, "$2a$11$eATVKwW9iB4ewwrdQ3ld7ewJSsJKXs7Tncywm1xOnFlTIALxk6SRO", "Mod" },
                    { 3, null, "user@phtv.com", null, "$2a$11$KjWpBiYnfji1WiCjLYCoCOHnjy5EDbsOWFiBobnUA8MbQq6IqrRXy", "User" }
                });

            migrationBuilder.InsertData(
                table: "Buses",
                columns: new[] { "Id", "BusPlate", "BusTypeId", "Enabled", "Note", "StationId" },
                values: new object[,]
                {
                    { 1, "59A1-55999", 1, true, "", "" },
                    { 2, "59A1-55998", 2, true, "", "" },
                    { 3, "59A1-55997", 3, true, "", "" },
                    { 4, "59A1-55996", 4, true, "", "" },
                    { 5, "59A1-55995", 1, true, "", "" },
                    { 6, "59A1-55994", 2, true, "", "" },
                    { 7, "59A1-55993", 3, true, "", "" },
                    { 8, "59A1-55992", 4, true, "", "" },
                    { 9, "59A1-55991", 1, true, "", "" },
                    { 10, "59A1-55900", 2, true, "", "" },
                    { 11, "59A1-55901", 3, true, "", "" },
                    { 12, "59A1-55902", 4, true, "", "" },
                    { 13, "59A1-55903", 1, true, "", "" },
                    { 14, "59A1-55904", 2, true, "", "" },
                    { 15, "59A1-55905", 3, true, "", "" },
                    { 16, "59A1-55906", 4, true, "", "" },
                    { 17, "59A1-55907", 1, true, "", "" },
                    { 18, "59A1-55908", 2, true, "", "" },
                    { 19, "59A1-55909", 3, true, "", "" },
                    { 20, "59A1-55911", 4, true, "", "" }
                });

            migrationBuilder.InsertData(
                table: "Trips",
                columns: new[] { "Id", "BusId", "DriverId", "FinishTime", "FromStationId", "Image", "StartTime", "TicketPrice", "ToStationId" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 100.0, 2 },
                    { 2, 2, 2, new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image2.jpg", new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 200.0, 2 },
                    { 3, 3, 3, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image3.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 300.0, 2 },
                    { 4, 4, 4, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image4.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 350.0, 2 },
                    { 5, 5, 5, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image5.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 400.0, 3 },
                    { 6, 6, 6, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image6.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 3 },
                    { 7, 7, 7, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image7.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 150.0, 3 },
                    { 8, 8, 8, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image8.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 160.0, 4 },
                    { 9, 9, 9, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image9.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 180.0, 4 },
                    { 10, 10, 10, new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image10.jpg", new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 190.0, 4 },
                    { 11, 1, 1, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image11.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 290.0, 5 },
                    { 12, 2, 2, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image12.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 5 },
                    { 13, 3, 3, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image13.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 360.0, 5 },
                    { 14, 4, 4, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image14.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 5 },
                    { 15, 5, 5, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image15.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 420.0, 6 },
                    { 16, 6, 6, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image16.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 6 },
                    { 17, 7, 7, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image17.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 6 },
                    { 18, 8, 8, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image18.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 210.0, 7 },
                    { 19, 9, 9, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image19.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 7 },
                    { 20, 10, 10, new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image20.jpg", new DateTime(2024, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 7 },
                    { 21, 1, 1, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image21.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 8 },
                    { 22, 2, 2, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image22.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 8 },
                    { 23, 3, 3, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image23.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 410.0, 8 },
                    { 24, 4, 4, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image24.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 8 },
                    { 25, 5, 5, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image25.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 590.0, 9 },
                    { 26, 6, 6, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image26.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 490.0, 9 },
                    { 27, 7, 7, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image27.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 9 },
                    { 28, 8, 8, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image28.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 220.0, 10 },
                    { 29, 9, 9, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image29.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 390.0, 10 },
                    { 30, 10, 10, new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image30.jpg", new DateTime(2024, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 10 },
                    { 31, 1, 1, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image31.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 100.0, 2 },
                    { 32, 2, 2, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image32.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 200.0, 2 },
                    { 33, 3, 3, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image33.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 300.0, 2 },
                    { 34, 4, 4, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image34.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 350.0, 2 },
                    { 35, 5, 5, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image35.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 400.0, 3 },
                    { 36, 6, 6, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image36.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 3 },
                    { 37, 7, 7, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image37.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 150.0, 3 },
                    { 38, 8, 8, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image38.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 160.0, 4 },
                    { 39, 9, 9, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image39.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 180.0, 4 },
                    { 40, 10, 10, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image40.jpg", new DateTime(2024, 2, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 190.0, 4 },
                    { 41, 1, 1, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image41.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 290.0, 5 },
                    { 42, 2, 2, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image42.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 5 },
                    { 43, 3, 3, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image43.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 360.0, 5 },
                    { 44, 4, 4, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image44.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 5 },
                    { 45, 5, 5, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image45.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 420.0, 6 },
                    { 46, 6, 6, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image46.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 6 },
                    { 47, 7, 7, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image47.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 6 },
                    { 48, 8, 8, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image48.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 210.0, 7 },
                    { 49, 9, 9, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image49.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 7 },
                    { 50, 10, 10, new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image50.jpg", new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 7 },
                    { 51, 1, 1, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image51.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 8 },
                    { 52, 2, 2, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image52.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 8 },
                    { 53, 3, 3, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image53.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 410.0, 8 },
                    { 54, 4, 4, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image54.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 8 },
                    { 55, 5, 5, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image55.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 590.0, 9 },
                    { 56, 6, 6, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image56.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 490.0, 9 },
                    { 57, 7, 7, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image57.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 9 },
                    { 58, 8, 8, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image58.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 220.0, 10 },
                    { 59, 9, 9, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image59.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 390.0, 10 },
                    { 60, 10, 10, new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image60.jpg", new DateTime(2024, 2, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 10 },
                    { 61, 1, 1, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image61.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 100.0, 2 },
                    { 62, 2, 2, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image62.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 200.0, 2 },
                    { 63, 3, 3, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image63.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 300.0, 2 },
                    { 64, 4, 4, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image64.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 350.0, 2 },
                    { 65, 5, 5, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image65.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 400.0, 3 },
                    { 66, 6, 6, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image66.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 3 },
                    { 67, 7, 7, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image67.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 150.0, 3 },
                    { 68, 8, 8, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image68.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 160.0, 4 },
                    { 69, 9, 9, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image69.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 180.0, 4 },
                    { 70, 10, 10, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image70.jpg", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), 190.0, 4 },
                    { 71, 1, 1, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image71.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 290.0, 5 },
                    { 72, 2, 2, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image72.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 5 },
                    { 73, 3, 3, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image73.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 360.0, 5 },
                    { 74, 4, 4, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image74.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 5 },
                    { 75, 5, 5, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image75.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 420.0, 6 },
                    { 76, 6, 6, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image76.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 6 },
                    { 77, 7, 7, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image77.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 6 },
                    { 78, 8, 8, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image78.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 210.0, 7 },
                    { 79, 9, 9, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image79.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 7 },
                    { 80, 10, 10, new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image80.jpg", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 7 },
                    { 81, 1, 1, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image81.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 8 },
                    { 82, 2, 2, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image82.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 8 },
                    { 83, 3, 3, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image83.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 410.0, 8 },
                    { 84, 4, 4, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image84.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 8 },
                    { 85, 5, 5, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image85.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 590.0, 9 },
                    { 86, 6, 6, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image86.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 490.0, 9 },
                    { 87, 7, 7, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image87.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 9 },
                    { 88, 8, 8, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image88.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 220.0, 10 },
                    { 89, 9, 9, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image89.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 390.0, 10 },
                    { 90, 10, 10, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image90.jpg", new DateTime(2024, 2, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 10 },
                    { 91, 1, 1, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image91.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 100.0, 2 },
                    { 92, 2, 2, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image92.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 200.0, 2 },
                    { 93, 3, 3, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image93.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 300.0, 2 },
                    { 94, 4, 4, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image94.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 350.0, 2 },
                    { 95, 5, 5, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image95.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 400.0, 3 },
                    { 96, 6, 6, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image96.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 3 },
                    { 97, 7, 7, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image97.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 150.0, 3 },
                    { 98, 8, 8, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image98.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 160.0, 4 },
                    { 99, 9, 9, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image99.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 180.0, 4 },
                    { 100, 10, 10, new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image100.jpg", new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 190.0, 4 },
                    { 101, 1, 1, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image101.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 290.0, 5 },
                    { 102, 2, 2, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image102.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 5 },
                    { 103, 3, 3, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image103.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 360.0, 5 },
                    { 104, 4, 4, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "image104.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 5 },
                    { 105, 5, 5, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image105.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 420.0, 6 },
                    { 106, 6, 6, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image106.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 340.0, 6 },
                    { 107, 7, 7, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "image107.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 6 },
                    { 108, 8, 8, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image108.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 210.0, 7 },
                    { 109, 9, 9, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image109.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 7 },
                    { 110, 10, 10, new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "image110.jpg", new DateTime(2024, 2, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 7 },
                    { 111, 1, 1, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image111.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 280.0, 8 },
                    { 112, 2, 2, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image112.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 320.0, 8 },
                    { 113, 3, 3, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image113.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 410.0, 8 },
                    { 114, 4, 4, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "image114.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 8 },
                    { 115, 5, 5, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image115.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 590.0, 9 },
                    { 116, 6, 6, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image116.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 490.0, 9 },
                    { 117, 7, 7, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "image117.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 230.0, 9 },
                    { 118, 8, 8, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image118.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 220.0, 10 },
                    { 119, 9, 9, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image119.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 390.0, 10 },
                    { 120, 10, 10, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "image120.jpg", new DateTime(2024, 2, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 270.0, 10 },
                    { 121, 1, 1, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image121.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 100.0, 2 },
                    { 122, 2, 2, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image122.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 200.0, 2 },
                    { 123, 3, 3, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image123.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 300.0, 2 },
                    { 124, 4, 4, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image124.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 350.0, 2 },
                    { 125, 5, 5, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image125.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 400.0, 3 },
                    { 126, 6, 6, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image126.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 3 },
                    { 127, 7, 7, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image127.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 150.0, 3 },
                    { 128, 8, 8, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image128.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 160.0, 4 },
                    { 129, 9, 9, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image129.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 180.0, 4 },
                    { 130, 10, 10, new DateTime(2024, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image130.jpg", new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 190.0, 4 },
                    { 131, 1, 1, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image1.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 100.0, 2 },
                    { 132, 2, 2, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image2.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 200.0, 2 },
                    { 133, 3, 3, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image3.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 300.0, 2 },
                    { 134, 4, 4, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "image4.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 350.0, 2 },
                    { 135, 5, 5, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image5.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 400.0, 3 },
                    { 136, 6, 6, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image6.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 250.0, 3 },
                    { 137, 7, 7, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "image7.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 150.0, 3 },
                    { 138, 8, 8, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image8.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 160.0, 4 },
                    { 139, 9, 9, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image9.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 180.0, 4 },
                    { 140, 10, 10, new DateTime(2024, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "image10.jpg", new DateTime(2024, 1, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 190.0, 4 }
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
                name: "IX_Comments_NewsId",
                table: "Comments",
                column: "NewsId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");

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
                name: "Comments");

            migrationBuilder.DropTable(
                name: "FAQs");

            migrationBuilder.DropTable(
                name: "Offers");

            migrationBuilder.DropTable(
                name: "PromoteTrips");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "News");

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
