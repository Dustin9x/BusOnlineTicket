namespace project.Models
{
    public class formBus
    {
        //xe bus mà công ty hiện có
        public int Id { get; set; }
        public string name { get; set; }
        public string numberPlate { get; set; }
        public int transportCompanyId { get; set; }
        public transportCompany? transportCompany { get; set; }
    }
}
