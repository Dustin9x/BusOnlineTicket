using project.Models;

namespace project.SeedData
{
    public class busData
    {
        public static bus[] busSeedData()
        {

            return new bus[]
            {
                    new bus{Id=1,name="xe số 1",numberPlate="49A 93456",transportCompanyId=1},
                    new bus{Id=2,name="xe số 2",numberPlate="49A 33011",transportCompanyId=2},
                    new bus{Id=3,name="xe số 3",numberPlate="49A 22222",transportCompanyId=3},
            };
        }
    }
}
