using Prestigelisten.Core.Interfaces.Models;

namespace Prestigelisten.Application.Helpers;

public static class DictionaryHelper
{
    public static Dictionary<string, TEntity> ToLookup<TEntity>(
        IBaseRepository<TEntity> repository, 
        Func<TEntity, string> keySelector
    ) where TEntity : class, IEntity
    {
        return repository
            .GetAll()
            .ToDictionary(
                keySelector,
                entity => entity,
                StringComparer.OrdinalIgnoreCase
            );
    }
}
