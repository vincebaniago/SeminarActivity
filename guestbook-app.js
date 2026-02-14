// ============================================
// GUESTBOOK APP - Orchestrates all services
// Single Responsibility: Coordinate components
// Dependency Inversion: Dependencies injected
// ============================================
class GuestbookApp {
  constructor(validator, storage, renderer) {
    this.validator = validator;
    this.storage = storage;
    this.renderer = renderer;
  }

  initialize() {
    const entries = this.storage.getAll();
    this.renderer.renderAllEntries(entries);
  }

  addEntry() {
    try {
      const { name, learn } = this.renderer.getInputValues();
      const validatedEntry = this.validator.validate(name, learn);

      this.renderer.renderEntry(validatedEntry.name, validatedEntry.learn);
      this.storage.save(validatedEntry);
      this.renderer.clearInputs();
    } catch (error) {
      alert(error.message);
    }
  }
}
