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

        public IQueryable<T> Get()
        {
            return _context.Set<T>();
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> whereExpression)
        {
            return Get().Where(whereExpression);
        }

        public IQueryable<TSelect> Get<TSelect>(Expression<Func<T, TSelect>> selectExpression)
        {
            return Get().Select(selectExpression);
        }

        public IQueryable<TSelect> Get<TSelect>(Expression<Func<T, bool>> whereExpression, Expression<Func<T, TSelect>> selectExpression)
        {
            return Get().Where(whereExpression).Select(selectExpression);
        }

        public Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> whereExpression, string include=null)
        {
            var items = Get();
            if (!string.IsNullOrEmpty(include))
            {
                items = items.Include(include);
            }
            return items.FirstOrDefaultAsync(whereExpression);
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
