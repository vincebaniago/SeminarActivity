// ============================================
// INITIALIZATION - Wire up dependencies
// ============================================
const validator = new EntryValidator();
const storage = new StorageService('guestbook_entries');
const renderer = new UIRenderer('#guest-list', '#nameInput', '#learnInput');
const app = new GuestbookApp(validator, storage, renderer);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  app.initialize();
});

// Expose addEntry for onclick handler
function addEntry() {
  app.addEntry();
}
