using backend.Models;

namespace backend.SeedData
{
    public class StationData
    {
        public static Station[] StationSeedData()
        {
            return new Station[]
            {
               new Station{Id=1, Name="Hồ Chí Minh", Address="395/1 Nam Kỳ Khởi Nghĩa P2 Q3",},
               new Station{Id=2, Name="Hà Nội", Address="126 Hai Bà Trưng P1 Q6",},
               new Station{Id=3, Name="Đà Lạt", Address="35 Hồ Xuân Hương P9 Q1",},
               new Station{Id=4, Name="Cà Mau", Address="3A Đất Mũi, Huyện Châu Thành, Tỉnh Cà Mau",},
               new Station{Id=5, Name="Hải Phòng", Address="39 Xã Nghĩa Lộ, Huyện Cát Hải, Thành phố Hải Phòng",},
               new Station{Id=6, Name="Nha Trang", Address="46 Trần Phú, Phường Lộc Thọ, Thành phố Nha Trang, Tỉnh Khánh Hòa",},
               new Station{Id=7, Name="Cần Thơ", Address="179 Lê Lợi, Phường Cái Khế, Quận Ninh Kiều, Thành phố Cần Thơ",},
               new Station{Id=8, Name="Bình Định", Address="219 Nguyễn Thái Học, Phường Lê Lợi, Thành phố Quy Nhơn, Tỉnh Bình Định",},
               new Station{Id=9, Name="Thái Nguyên", Address="208 Lương Ngọc Quyến, Phường Quang Trung, Thành phố Thái Nguyên, Tỉnh Thái Nguyên",},
               new Station{Id=10, Name="Tây Nguyên", Address="33 Nguyễn Thị Minh Khai, Phường Thắng Nhì, Thành phố Buôn Ma Thuột, Tỉnh Đắk Lắk",},
               new Station{Id=11, Name="Lạng Sơn", Address="215 Bà Triệu, Phường Chi Lăng, Thành phố Lạng Sơn, Tỉnh Lạng Sơn",},
               new Station{Id=12, Name="Bến Tre", Address="284B Nguyễn Thị Minh Khai, Phường 8, Thành phố Bến Tre, Tỉnh Bến Tre",},
               new Station{Id=13, Name="Long An", Address="268A Hùng Vương, Phường 6, Thành phố Tân An, Tỉnh Long An",},
               new Station{Id=14, Name="Trà Vinh", Address="275 Nguyễn Thị Minh Khai, Phường 3, Thành phố Trà Vinh, Tỉnh Trà Vinh",},
               new Station{Id=15, Name="Mỹ Tho", Address="119 Bến Tre, Phường 4, Thành phố Mỹ Tho, Tỉnh Tiền Giang",},
               new Station{Id=16, Name="Tiền Giang", Address="102 Nguyễn Huệ, Phường 1, Thành phố Mỹ Tho, Tỉnh Tiền Giang",},
               new Station{Id=17, Name="Vĩnh Long", Address="217 Cách Mạng Tháng Tám, Phường 8, Thành phố Vĩnh Long, Tỉnh Vĩnh Long",},
               new Station{Id=18, Name="Bình Thuận", Address="60 Trần Hưng Đạo, Phường Phú Tài, Thành phố Phan Thiết, Tỉnh Bình Thuận",},
               new Station{Id=19, Name="Vũng Tàu", Address="141 Nam Kỳ Khởi Nghĩa, Phường 3, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu",},
               new Station{Id=20, Name="Bắc Giang", Address="188 Hoàng Văn Thụ, Phường Hoàng Văn Thụ, Thành phố Bắc Giang, Tỉnh Bắc Giang",}
            };
        }
    }
}
