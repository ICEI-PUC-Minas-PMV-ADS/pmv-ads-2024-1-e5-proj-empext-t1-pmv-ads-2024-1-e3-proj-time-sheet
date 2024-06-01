namespace TimeSheet.Queries {
    public class GetUsersQueryHandler
        : IQueryHandler<GetUsersQuery, GetUsersQueryResult> {

        private readonly UserRepository _repository;
        public GetUsersQueryHandler(UserRepository repository) {
            _repository = repository;
        }
        public async Task<GetUsersQueryResult> Handle(GetUsersQuery query) {

            var users = (await _repository.GetAll()).OrderBy(user => user.Name).ToList();           
            var usersResult = new List<GetUserQueryResult>();

            users.ForEach(user => {
                usersResult.Add(GetUserQueryResult.FromUser(user));
            });

            return new GetUsersQueryResult {
                Users = usersResult
            };
        }
    }
}
