using System.Linq.Expressions;
using Prestigelisten.Core.Models;

namespace Prestigelisten.Core.Repositories;

public interface IBaseRepository<T>
    where T : class, IEntity
{
    IEnumerable<T> GetAll();

    T? GetById(int id);

    IEnumerable<T> Find(Expression<Func<T, bool>> predicate);

    T? FindFirstOrDefault(Expression<Func<T, bool>> predicate);

    void Add(T entity);

    void AddRange(IEnumerable<T> entities);

    void AddOrUpdateRange(IEnumerable<T> entities);

    void Update(T entity);

    void AddOrUpdate(T entity);

    void Remove(T entity);

    void RemoveAll();

    void RemoveRange(IEnumerable<T> entities);

    Task<int> SaveChangesAsync();
}
