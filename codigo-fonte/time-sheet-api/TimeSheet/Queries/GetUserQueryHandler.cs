namespace TimeSheet.Queries {
    public class GetUserQueryHandler
        : IQueryHandler<GetUserQuery, GetUserQueryResult> {

        private readonly UserRepository _repository;
        public GetUserQueryHandler(UserRepository repository) {
            _repository = repository;
        }
        public async Task<GetUserQueryResult> Handle(GetUserQuery query) {

            var user = await _repository.
                FindUser(query.UserId);

            if (user is null)
            {
                return null;
            }

            return GetUserQueryResult.FromUser(user);
        }
    }
}
