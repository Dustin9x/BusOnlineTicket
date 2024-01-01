using project.Models;

namespace project.SeedData
{
    public class transportCompanyData
    {
        public static transportCompany[] transportCompanySeedData()
        {
            return new transportCompany[]
            {
                    new transportCompany{Id=1,name="Anh Tuyên"},
                    new transportCompany{Id=2,name="Điền Linh"},
                    new transportCompany{Id=3,name="Phương Trang"}
            };
        }
    }
}
