namespace Drawer.API.Models
{
    public class JoinGroupCallerMessage
    {
        public required string GroupId { get; set; }
        public UserModel Caller { get; set; }
        public List<UserModel> Users { get; set; } = new();
    }
}
