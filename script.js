// ============================================
// STORAGE SERVICE - Handles data persistence
// Single Responsibility: Manage localStorage
// ============================================
class StorageService {
  constructor(storageKey = "guestbook_entries") {
    this.storageKey = storageKey;
  }

  save(entry) {
    const entries = this.getAll();
    entries.push(entry);
    localStorage.setItem(this.storageKey, JSON.stringify(entries));
  }

  getAll() {
    const savedData = localStorage.getItem(this.storageKey);
    return savedData ? JSON.parse(savedData) : [];
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

// ============================================
// VALIDATOR - Handles business logic validation
// Single Responsibility: Validate entry data
// ============================================
class EntryValidator {
  validate(name, learn) {
    if (!name || !learn) {
      throw new Error("Please fill in both fields!");
    }
    return { name, learn };
  }
}

// ============================================
// UI RENDERER - Handles DOM manipulation
// Single Responsibility: Render UI elements
// ============================================
class UIRenderer {
  constructor(listSelector, nameInputSelector, learnInputSelector) {
    this.listElement = document.querySelector(listSelector);
    this.nameInput = document.querySelector(nameInputSelector);
    this.learnInput = document.querySelector(learnInputSelector);
  }

  renderEntry(name, learn) {
    const li = document.createElement("li");
    li.className = "guest-entry";
    li.innerHTML = `<div class="guest-info"><strong>${name}</strong><span>Learned: ${learn}</span></div>`;
    this.listElement.appendChild(li);
  }

  clearInputs() {
    this.nameInput.value = "";
    this.learnInput.value = "";
  }

  getInputValues() {
    return {
      name: this.nameInput.value,
      learn: this.learnInput.value,
    };
  }

  renderAllEntries(entries) {
    entries.forEach((entry) => this.renderEntry(entry.name, entry.learn));
  }
}

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

// ============================================
// INITIALIZATION - Wire up dependencies
// ============================================
const validator = new EntryValidator();
const storage = new StorageService("guestbook_entries");
const renderer = new UIRenderer("#guest-list", "#nameInput", "#learnInput");
const app = new GuestbookApp(validator, storage, renderer);

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  app.initialize();
});

// Expose addEntry for onclick handler
function addEntry() {
  app.addEntry();
}
