export class Content {
  constructor(contentEl) {
    this.contentEl = contentEl;
  }

  render(item) {
    const content = `
        <div class="main-section__content-container">
            <h2 class="main-section__content-title">${item.title}</h2>
            <time class="main-section__content-time">10.01.2021 14:00</time>
            <p class="main-section__content-description">${item.content}</p>
        </div>
    `;
    this.contentEl.innerHTML = content;
  }
}
