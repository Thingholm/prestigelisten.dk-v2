using System.Linq.Expressions;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Core.Repositories;

public interface IBaseRepository<T>
    where T : class, IEntity
{
    IReadOnlyList<T> GetAll();

    T? GetById(int id);

    IReadOnlyList<T> Find(Expression<Func<T, bool>> predicate);

    void Add(T entity);

    void AddRange(IEnumerable<T> entities);

    void Update(T entity);

    void UpdateOrAdd(T entity);

    void Remove(T entity);

    void RemoveRange(IEnumerable<T> entities);

    Task<int> SaveChangesAsync();
}
