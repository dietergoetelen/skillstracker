using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
namespace SkillsTracker.DAL.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class, new()
    {
        private readonly SkillsTrackerDbContext _context;

        public BaseRepository(SkillsTrackerDbContext context)
        {
            _context = context;
        }

        public  Task<IQueryable<T>> Get()
        {
            return Task.FromResult<IQueryable<T>>(_context.Set<T>());
        }

        public async Task<IQueryable<T>> Get(Expression<Func<T, bool>> whereExpression)
        {
            var allItems = await Get();
            return allItems.Where(whereExpression);
        }

        public async Task<IQueryable<TSelect>> Get<TSelect>(Expression<Func<T, TSelect>> selectExpression)
        {
            var allItems = await Get();
            return allItems.Select(selectExpression);
        }

        public async Task<IQueryable<TSelect>> Get<TSelect>(Expression<Func<T, bool>> whereExpression, Expression<Func<T, TSelect>> selectExpression)
        {
            var allItems = await Get();
            return allItems.Where(whereExpression).Select(selectExpression);
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> whereExpression)
        {
            var allItems = await Get();
            return await allItems.FirstOrDefaultAsync(whereExpression);
        }

        public T Add(T entity)
        {
            return _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public T Remove(T entity)
        {
            return _context.Set<T>().Remove(entity);
        }

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
