using backend.Models;

namespace backend.SeedData
{
    public class formBusData
    {
        public static formBus[] formBusSeedData()
        {
            return new formBus[]
            {
                    new formBus{Id=1,name="xe số 1",numberPlate="49A 93456",transportCompanyId=1},
                    new formBus{Id=2,name="xe số 2",numberPlate="49A 33011",transportCompanyId=1},
                    new formBus{Id=3,name="xe số 3",numberPlate="49A 22222",transportCompanyId=1},
                    new formBus{Id=4,name="xe số 4",numberPlate="49A 10223",transportCompanyId=2},
                    new formBus{Id=5,name="xe số 5",numberPlate="49A 23341",transportCompanyId=2},
                    new formBus{Id=6,name="xe số 6",numberPlate="49F 99999",transportCompanyId=2},
                    new formBus{Id=7,name="xe số 7",numberPlate="49F 11111",transportCompanyId=3},
                    new formBus{Id=8,name="xe số 8",numberPlate="49F 23313",transportCompanyId=3},
                    new formBus{Id=9,name="xe số 9",numberPlate="49F 43531",transportCompanyId=3},
                    new formBus{Id=10,name="xe số 10",numberPlate="49F 93233",transportCompanyId=3},
            };
        }
    }
}
