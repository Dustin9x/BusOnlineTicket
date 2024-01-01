using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace project.Models
{
    public class seat
    {
        //ghế xe bus 

    public int Id { get; set; }
    public string name { get; set; }
    public bool order { get; set; } = false;
    public int busId { get; set; }
    public bus? bus { get; set; }


    public int? userId { get; set; }
    }
}
