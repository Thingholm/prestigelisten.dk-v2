using Prestigelisten.Core.Interfaces.Models;
using System.Linq.Expressions;

namespace Prestigelisten.Core.Interfaces.Repositories;

public interface IBaseRepository<T>
    where T : class, IEntity
{
    IEnumerable<T> GetAll();

    Task<IEnumerable<T>> GetAllAsync();

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
