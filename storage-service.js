// ============================================
// STORAGE SERVICE - Handles data persistence
// Single Responsibility: Manage localStorage
// ============================================
class StorageService {
  constructor(storageKey = 'guestbook_entries') {
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
