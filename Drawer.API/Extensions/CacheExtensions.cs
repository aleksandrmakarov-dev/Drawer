using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

namespace Drawer.API.Extensions
{
    public static class CacheExtensions
    {
        public static async Task<T?> GetObjectAsync<T>(this IDistributedCache cache, string key) where T : class
        {
            string? json = await cache.GetStringAsync(key);

            return json is null ? null : JsonSerializer.Deserialize<T>(json);
        }

        public static async Task SetObjectAsync<T>(this IDistributedCache cache, string key, T value) where T : class
        {
            string json = JsonSerializer.Serialize(value);

            await cache.SetStringAsync(key, json);
        }
    }
}
