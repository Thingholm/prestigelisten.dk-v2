using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Models;
using Prestigelisten.Core.Interfaces.Repositories;

namespace Prestigelisten.Persistence.Repositories;

public class BaseRepository<T> : IBaseRepository<T>
    where T : class, IEntity
{
    protected readonly AppDbContext _context;
    protected DbSet<T> _dbSet;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    protected virtual IQueryable<T> SetupQueryable()
    {
        return _dbSet.AsQueryable();
    }

    public virtual IEnumerable<T> GetAll()
    {
        return SetupQueryable().ToList();
    }

    public virtual T? GetById(int id)
    {
        return SetupQueryable().FirstOrDefault(entity => entity.Id == id);
    }

    public virtual IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
    {
        return SetupQueryable().Where(predicate).ToList();
    }

    public virtual T? FindFirstOrDefault(Expression<Func<T, bool>> predicate)
    {
        return SetupQueryable().FirstOrDefault(predicate);
    }

    public virtual void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public virtual void AddRange(IEnumerable<T> entities)
    {
        _dbSet.AddRange(entities);
    }

    public virtual void Update(T entity)
    {
        _dbSet.Update(entity);
    }

    public virtual void AddOrUpdate(T entity)
    {
        var existingEntity = GetById(entity.Id);

        if (existingEntity is null)
        {
            _dbSet.Add(entity);
            return;
        }

        Update(entity);
    }

    public virtual void AddOrUpdateRange(IEnumerable<T> entities)
    {
        foreach (var entity in entities)
        {
            AddOrUpdate(entity);
        }
    }

    public virtual void Remove(T entity)
    {
        _dbSet.Remove(entity);
    }

    public virtual void RemoveRange(IEnumerable<T> entities)
    {
        _dbSet.RemoveRange(entities);
    }

    public virtual void RemoveAll()
    {
        _dbSet.RemoveRange(_dbSet);
    }

    public virtual async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
