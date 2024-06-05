namespace TimeSheet.Common.CQRS {
    public interface IQueryHandler<TQuery, TQueryResult>
        where TQuery : IQuery
        where TQueryResult : IQueryResult {
        Task<TQueryResult?> Handle(TQuery query);
    }
}
