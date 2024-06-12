using Microsoft.EntityFrameworkCore;

namespace TimeSheet.Repositories {
    public class UserRepository {

        private readonly TimeSheetContext _context;
        public UserRepository(TimeSheetContext context) {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAll() {
            return await _context.Users.ToListAsync();
        }
        public async Task<bool> UserExists(Guid id) {
            return await _context.Users
                .AnyAsync(x => x.Id == id);
        }
        public async Task<bool> UserExists(string cpf) {

            CPFValidations.Normalize(ref cpf);

            return await _context.Users
                .AnyAsync(x => x.CPF == cpf);
        }
        public async Task<User?> FindUser(string cpf) {

            CPFValidations.Normalize(ref cpf);

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.CPF == cpf);

            return user;
        }
        public async Task AddUser(User user) {

            if (user is null) {
                throw new ArgumentNullException(nameof(user));
            }

            if (await _context.Users
                .AnyAsync(x => x.CPF == user.CPF)) {
                throw new InvalidOperationException("Usuário já cadastrado.");
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
        public async Task<User?> FindUser(Guid id) {

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == id);

            return user;
        }
        public async Task DeleteUser(User user) {

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        public async Task SaveChanges() {
            await _context.SaveChangesAsync();
        }
    }
}
