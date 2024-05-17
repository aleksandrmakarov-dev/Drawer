namespace Drawer.API.Models
{
    public class JoinGroupMessage
    {
        public required string GroupId { get; set; }
        public Sender Sender { get; set; }
    }
}
