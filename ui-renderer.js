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
    const li = document.createElement('li');
    li.className = 'guest-entry';
    li.innerHTML = `<div class="guest-info"><strong>${name}</strong><span>Learned: ${learn}</span></div>`;
    this.listElement.appendChild(li);
  }

  clearInputs() {
    this.nameInput.value = '';
    this.learnInput.value = '';
  }

  getInputValues() {
    return {
      name: this.nameInput.value,
      learn: this.learnInput.value
    };
  }

  renderAllEntries(entries) {
    entries.forEach((entry) => this.renderEntry(entry.name, entry.learn));
  }
}
