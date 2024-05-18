namespace Drawer.API.Models
{
    public class ReceiveTextMessage
    {
        public required string Text { get; set; }
        public UserModel? Caller { get; set; } 
    }
}
