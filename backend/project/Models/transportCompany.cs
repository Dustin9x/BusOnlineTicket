using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace project.Models
{
    public class transportCompany
    {
        // nhà xe (điền linh, anh tuyên, phương trang,...)
 
        public int Id { get; set; }
        public string name { get; set; }
        public string? image {  get; set; }
        public string? address { get; set; }
        public ICollection<bus>? bus { get; set; }
        public ICollection<formBus>? formBus { get; set; }
    }
}
