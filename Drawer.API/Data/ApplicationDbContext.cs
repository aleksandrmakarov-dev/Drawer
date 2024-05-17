using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Drawer.API.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
    }

    public class User
    {
        [Key]
        [MaxLength(32)]
        public required string ConnectionId { get; set; }
        [Required]
        [MaxLength(32)]
        public required string Username { get; set; }
        [MaxLength(32)]
        public required string GroupId { get; set; }
    }

    public class Group
    {
        [Key]
        [MaxLength(32)]
        public required string GroupId { get; set; }
        [MaxLength(32)]
        public required string State { get; set; }
        [MaxLength(32)]
        public string? Word { get; set; }
    }
}
