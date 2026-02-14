// ============================================
// VALIDATOR - Handles business logic validation
// Single Responsibility: Validate entry data
// ============================================
class EntryValidator {
  validate(name, learn) {
    if (!name || !learn) {
      throw new Error('Please fill in both fields!');
    }
    return { name, learn };
  }
}
