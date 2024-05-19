using System.ComponentModel.DataAnnotations;

namespace Drawer.API.Data;

public class User
{
    [Required]
    [MaxLength(32)]
    public required string Username { get; set; }
    [MaxLength(32)]
    public required string GroupId { get; set; }
}