using TimeSheet.Repositories;

namespace TimeSheet.Queries {
    public class GetUsersQueryHandler
        : IQueryHandler<GetUsersQuery, GetUsersQueryResult> {

        private readonly UserRepository _repository;
        public GetUsersQueryHandler(UserRepository repository) {
            _repository = repository;
        }
        public async Task<GetUsersQueryResult> Handle(GetUsersQuery query) {

            var users = await _repository.GetAll();

            return new GetUsersQueryResult {
                Users = users,
            };
        }
    }
}
