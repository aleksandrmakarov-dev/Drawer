using Drawer.API.Data;
using Drawer.API.Extensions;
using Drawer.API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;

namespace Drawer.API.Hubs
{
    public class DrawerHub:Hub<IDrawerClient>
    {
        private readonly IDistributedCache _cache;
        private readonly List<string> _usernameList;

        public DrawerHub(IDistributedCache cache)
        {
            _cache = cache;
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
            User? foundUser = await _cache.GetObjectAsync<User>(Context.ConnectionId);

            if (foundUser is null)
            {
                return;
            }

            await _cache.RemoveAsync(Context.ConnectionId);

            await Clients.All.LeaveGroupMessage(new LeaveGroupMessage
            {
                Caller = new UserModel
                {
                    Id = Context.ConnectionId,
                    Username = foundUser.Username
                }
            });
        }

        public async Task JoinGroup(string? groupId = null)
        {
            groupId ??= Guid.NewGuid().ToString();

            string username = _usernameList[Random.Shared.Next(_usernameList.Count)];
            string userId = Context.ConnectionId;

            User user = new User
            {
                GroupId = groupId,
                Username = username
            };

            await _cache.SetObjectAsync(Context.ConnectionId, user);

            Group group = await _cache.GetObjectAsync<Group>(groupId) ?? new Group();

            group.UserIds.Add(userId);

            await _cache.SetObjectAsync(groupId,group);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);

            List<UserModel> usersInGroup = new();

            foreach (string id in group.UserIds)
            {
                User? foundUser = await _cache.GetObjectAsync<User>(id);

                if (foundUser != null)
                {
                    usersInGroup.Add(new UserModel
                    {
                        Id = id,
                        Username = foundUser.Username
                    });
                }
            }

            await Clients.Caller.JoinGroupCallerMessage(new JoinGroupCallerMessage
            {
                GroupId = groupId,
                Caller = new UserModel
                {
                    Id = Context.ConnectionId,
                    Username = username
                },
                Users = usersInGroup
            });

            await Clients.OthersInGroup(groupId).JoinGroupMessage(new JoinGroupMessage
            {
                Caller = new UserModel
                {
                    Id = Context.ConnectionId,
                    Username = username
                }
            });
        }

        public async Task SendText(string text)
        {

            User? foundUser = await _cache.GetObjectAsync<User>(Context.ConnectionId);

            if (foundUser is null)
            {
                return;
            }

            await Clients.Group(foundUser.GroupId).ReceiveTextMessage(new ReceiveTextMessage
            {
                Text = text,
                Caller = new UserModel
                {
                    Id = Context.ConnectionId,
                    Username = foundUser.Username
                }
            });
        }

        public async Task MouseDown(MouseDownMessage message)
        {
            User? foundUser = await _cache.GetObjectAsync<User>(Context.ConnectionId);

            if (foundUser is null)
            {
                return;
            }

            Group? foundGroup = await _cache.GetObjectAsync<Group>(foundUser.GroupId);

            if (foundGroup is null)
            {
                return;
            }



            await Clients.OthersInGroup(foundUser.GroupId).MouseDownMessage(new MouseDownMessage
            {
                X = message.X,
                Y = message.Y,
                Color = message.Color,
                LineWidth = message.LineWidth
            });
        }
        public async Task MouseMove(MousePositionMessage message)
        {
            User? foundUser = await _cache.GetObjectAsync<User>(Context.ConnectionId);

            if (foundUser is null)
            {
                return;
            }

            await Clients.OthersInGroup(foundUser.GroupId).MouseMoveMessage(new MousePositionMessage
            {
                X = message.X,
                Y = message.Y
            });
        }
        public async Task MouseUp()
        {
            User? foundUser = await _cache.GetObjectAsync<User>(Context.ConnectionId);

            if (foundUser is null)
            {
                return;
            }

            await Clients.OthersInGroup(foundUser.GroupId).MouseUpMessage();
        }
    }
}
