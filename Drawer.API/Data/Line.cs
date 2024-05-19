namespace Drawer.API.Data;

public class Line
{
    public required string Color { get; set; }
    public int LineWidth { get; set; }
    public List<Point> Points { get; set; }
}