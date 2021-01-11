export class Content {
  constructor(contentEl) {
    this.contentEl = contentEl;
  }

  render(item) {
    const content = `
        <div class="main-section__content-container">
            <h2 class="main-section__content-title">${item.title}</h2>
            <time class="main-section__content-time">${this.getFormatedDate(+item.id)}</time>
            <p class="main-section__content-description">${item.content}</p>
        </div>
    `;
    this.contentEl.innerHTML = content;
  }

  // Форматируем id (из new Date) к виду "10.01.2021, 23:25:27"
  getFormatedDate(id) {
    return new Date(id).toLocaleString();
  }
}
