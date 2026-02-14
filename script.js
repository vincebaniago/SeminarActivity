// GuestbookStorage: Handles all data persistence logic
class GuestbookStorage {
  constructor(storageKey = "guestbook_entries") {
    this.storageKey = storageKey;
  }

  save(name, learn) {
    let entries = this.getAll();
    entries.push({ name, learn });
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

// GuestbookRenderer: Handles all UI rendering logic
class GuestbookRenderer {
  constructor(listSelector) {
    this.list = document.querySelector(listSelector);
  }

  renderEntry(name, learn) {
    const li = document.createElement("li");
    li.className = "guest-entry";
    li.innerHTML = `<div class="guest-info"><strong>${name}</strong><span>Learned: ${learn}</span></div>`;
    this.list.appendChild(li);
  }

  clearList() {
    this.list.innerHTML = "";
  }
}

// GuestbookValidator: Handles all input validation logic
class GuestbookValidator {
  static validateEntry(name, learn) {
    if (!name || !learn) {
      throw new Error("Please fill in both fields!");
    }
    return true;
  }
}

// GuestbookManager: Orchestrates the other components (high-level logic)
class GuestbookManager {
  constructor(storage, renderer, validator) {
    this.storage = storage;
    this.renderer = renderer;
    this.validator = validator;
  }

  addEntry(name, learn) {
    this.validator.constructor.validateEntry(name, learn);
    this.storage.save(name, learn);
    this.renderer.renderEntry(name, learn);
  }

  loadEntries() {
    const entries = this.storage.getAll();
    entries.forEach((entry) => {
      this.renderer.renderEntry(entry.name, entry.learn);
    });
  }
}

// Initialize components with dependency injection
const storage = new GuestbookStorage();
const renderer = new GuestbookRenderer("#guest-list");
const validator = GuestbookValidator;
const manager = new GuestbookManager(storage, renderer, validator);

// Load saved entries on page load
window.addEventListener("load", () => {
  manager.loadEntries();
});

// Handle form submission
document.getElementById("entryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("nameInput");
  const learnInput = document.getElementById("learnInput");

  try {
    manager.addEntry(nameInput.value, learnInput.value);
    nameInput.value = "";
    learnInput.value = "";
  } catch (error) {
    alert(error.message);
  }
});
