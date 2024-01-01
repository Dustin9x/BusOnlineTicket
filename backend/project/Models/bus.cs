using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace project.Models
{
    public class bus
    {
        
        public int Id { get; set; }
        public string name { get; set; }
        public string numberPlate { get; set; }
        public ICollection<busService>? busServices { get; set; }
        public  ICollection<seat>? seats { get; set; }
        public int transportCompanyId { get; set; }
        public transportCompany? transportCompany { get; set; }
    }
}
