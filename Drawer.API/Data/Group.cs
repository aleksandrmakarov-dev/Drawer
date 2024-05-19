using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Drawer.API.Data
{
    public class Group
    {
        [MaxLength(32)]
        public string State { get; set; }
        [MaxLength(32)]
        public string? Word { get; set; }
        public string? DrawerId { get; set; }
        public string? DrawingId { get; set; }
        public List<string> UserIds { get; set; } = new ();
    }
}
