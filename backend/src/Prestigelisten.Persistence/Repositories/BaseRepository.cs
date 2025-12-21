using Microsoft.EntityFrameworkCore;
using Prestigelisten.Core.Interfaces.Models;
using Prestigelisten.Core.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Prestigelisten.Persistence.Repositories;

public class BaseRepository<T> : IBaseRepository<T>
    where T : class, IEntity
{
    private readonly IDbContextFactory<AppDbContext> _contextFactory;

    public BaseRepository(IDbContextFactory<AppDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    protected virtual AppDbContext CreateContext()
    {
        return _contextFactory.CreateDbContext();
    }

    protected virtual IQueryable<T> SetupQueryable(AppDbContext context)
    {
        return context.Set<T>();
    }

    public virtual IEnumerable<T> GetAll()
    {
        using var context = _contextFactory.CreateDbContext();
        return SetupQueryable(context).ToList();
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        await using var context = _contextFactory.CreateDbContext();
        return await SetupQueryable(context).ToListAsync();
    }

    public virtual T? GetById(int id)
    {
        using var context = _contextFactory.CreateDbContext();
        return SetupQueryable(context).FirstOrDefault(entity => entity.Id == id);
    }

    public virtual IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
    {
        using var context = _contextFactory.CreateDbContext();
        return SetupQueryable(context).Where(predicate).ToList();
    }

    public virtual T? FindFirstOrDefault(Expression<Func<T, bool>> predicate)
    {
        using var context = _contextFactory.CreateDbContext();
        return SetupQueryable(context).FirstOrDefault(predicate);
    }

    public virtual void Add(T entity)
    {
        using var context = _contextFactory.CreateDbContext();
        context.Set<T>().Add(entity);
    }

    public virtual void AddRange(IEnumerable<T> entities)
    {
        using var context = _contextFactory.CreateDbContext();
        context.Set<T>().AddRange(entities);
    }

    public virtual void Update(T entity)
    {
        using var context = _contextFactory.CreateDbContext();
        context.Set<T>().Update(entity);
    }

    public virtual void AddOrUpdate(T entity)
    {
        using var context = _contextFactory.CreateDbContext();
        var existingEntity = context.Set<T>().Local.FirstOrDefault(e => e.Id == entity.Id);

        if (existingEntity is null)
        {
            existingEntity = GetById(entity.Id);
        }

        if (existingEntity is null)
        {
            context.Set<T>().Add(entity);
            return;
        }

        context.Entry(existingEntity).CurrentValues.SetValues(entity);
    }

    public virtual void AddOrUpdateRange(IEnumerable<T> entities)
    {
        using var context = _contextFactory.CreateDbContext();

        var entityList = entities.ToList();
        if (!entityList.Any()) return;

        var entityIds = entityList.Select(e => e.Id).Where(id => id > 0).ToList();

        var existingEntities = entityIds.Any()
            ? context.Set<T>().Where(e => entityIds.Contains(e.Id)).ToDictionary(e => e.Id)
            : new Dictionary<int, T>();

        foreach (var entity in entityList)
        {
            if (entity.Id > 0 && existingEntities.TryGetValue(entity.Id, out var existingEntity))
            {
                context.Entry(existingEntity).CurrentValues.SetValues(entity);
            }
            else
            {
                context.Set<T>().Add(entity);
            }
        }
    }

    public virtual void Remove(T entity)
    {
        using var context = _contextFactory.CreateDbContext();
        context.Set<T>().Remove(entity);
    }

    public virtual void RemoveRange(IEnumerable<T> entities)
    {
        using var context = _contextFactory.CreateDbContext();
        context.Set<T>().RemoveRange(entities);
    }

    public virtual void RemoveAll()
    {
        using var context = _contextFactory.CreateDbContext();
        var dbSet = context.Set<T>();
        dbSet.RemoveRange(dbSet);
    }

    public virtual async Task<int> SaveChangesAsync()
    {
        using var context = _contextFactory.CreateDbContext();
        return await context.SaveChangesAsync();
    }
}
