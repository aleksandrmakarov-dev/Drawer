namespace Drawer.API.Models
{
    public class MouseDownMessage
    {
        public double X { get; set; }
        public double Y { get; set; }
        public int LineWidth { get; set; }
        public required string Color { get; set; }
    }
}
