#region using

using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

#endregion

namespace Gallery.Helpers
{
    public static class EntityHelper<TEntity>
    {
        public static Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> GetOrderBy(string orderColumn,
            string orderType)
        {
            orderType = string.IsNullOrEmpty(orderType) ? "Ascending" : orderType;
            orderColumn = string.IsNullOrEmpty(orderColumn) ? "Id" : orderColumn;
            var typeQueryable = typeof (IQueryable<TEntity>);
            var argQueryable = Expression.Parameter(typeQueryable, "p");
            var outerExpression = Expression.Lambda(argQueryable, argQueryable);
            var props = orderColumn.Split('.');
            var type = typeof (TEntity);
            var arg = Expression.Parameter(type, "x");

            Expression expr = arg;
            foreach (var prop in props)
            {
                var pi = type.GetProperty(prop, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                expr = Expression.Property(expr, pi);
                type = pi.PropertyType;
            }
            var lambda = Expression.Lambda(expr, arg);
            var methodName = orderType == "Ascending" ? "OrderBy" : "OrderByDescending";

            var resultExp =
                Expression.Call(typeof (Queryable), methodName, new[] {typeof (TEntity), type}, outerExpression.Body,
                    Expression.Quote(lambda));
            var finalLambda = Expression.Lambda(resultExp, argQueryable);
            return (Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>) finalLambda.Compile();
        }
    }
}
