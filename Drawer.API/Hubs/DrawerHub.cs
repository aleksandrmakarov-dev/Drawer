using Drawer.API.Data;
using Drawer.API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Drawer.API.Hubs
{
    public class DrawerHub:Hub<IDrawerClient>
    {
        private readonly ApplicationDbContext _context;
        private readonly List<string> _usernameList;

        public DrawerHub(ApplicationDbContext context)
        {
            _context = context;
            _usernameList = new List<string>
            {
                "MysticStar77",
                "GalacticEcho",
                "LunarDreamer",
                "FrostyWhisper",
                "VelvetPhoenix",
                "QuantumVoyager",
                "NebulaNinja",
                "RadiantPulse",
                "CosmicWanderer",
                "EchoBlaze"
            };
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            User? foundUser = await _context.Users.FirstOrDefaultAsync(u => u.ConnectionId == Context.ConnectionId);

            _context.Users.Remove(foundUser);
            await _context.SaveChangesAsync();

            await Clients.All.LeaveGroupMessage(new LeaveGroupMessage
            {
                Sender = new Sender
                {
                    Id = Context.ConnectionId,
                    Username = foundUser.Username
                }
            });
        }

        public async Task JoinGroup(string? groupId = null)
        {
            if (groupId is null)
            {
                groupId = Guid.NewGuid().ToString();

                await _context.Groups.AddAsync(new Group
                {
                    GroupId = groupId,
                    State = "Waiting",
                    Word = "Language"
                });
            }

            string username = _usernameList[Random.Shared.Next(_usernameList.Count)];

            await _context.Users.AddAsync(new User
            {
                GroupId = groupId,
                ConnectionId = Context.ConnectionId,
                Username = username
            });

            await _context.SaveChangesAsync();

            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);

            await Clients.Group(groupId).JoinGroupMessage(new JoinGroupMessage
            {
                GroupId = groupId,
                Sender = new Sender
                {
                    Id = Context.ConnectionId,
                    Username = username
                }
            });
        }

        public async Task SendText(string text)
        {
            User? foundUser = await _context.Users.FirstOrDefaultAsync(u => u.ConnectionId == Context.ConnectionId);

            await Clients.Group(foundUser.GroupId).ReceiveTextMessage(new ReceiveTextMessage
            {
                Text = text,
                Sender = new Sender
                {
                    Id = Context.ConnectionId,
                    Username = foundUser?.Username
                }
            });
        }
    }

    public interface IDrawerClient
    {
        public Task ReceiveTextMessage(ReceiveTextMessage message);
        public Task JoinGroupMessage(JoinGroupMessage message);
        public Task LeaveGroupMessage(LeaveGroupMessage message);
    }
}
