using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SkillsTracker.DAL.Repositories
{
    public interface IBaseRepository<T> where T : class, new()
    {
        IQueryable<T> Get();
        IQueryable<T> Get(Expression<Func<T, bool>> whereExpression);
        IQueryable<TSelect> Get<TSelect>(Expression<Func<T, TSelect>> selectExpression);
        IQueryable<TSelect> Get<TSelect>(Expression<Func<T, bool>> whereExpression, Expression<Func<T, TSelect>> selectExpression);
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> whereExpression);
        T Add(T entity);
        void Update(T entity);
        T Remove(T entity);
        Task<int> SaveChangesAsync();
    }
}
