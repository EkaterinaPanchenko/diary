export class Content {
  constructor(contentEl) {
    this.contentEl = contentEl;
    this.modal = document.querySelector("#modal");
    this.title = document.querySelector("#titleInput");
    this.content = document.querySelector("#contentTextarea");
    this.id = document.querySelector("#id");
  }

  render(item) {
    const content = `
        <div class="main-section__content-container">
            <h2 class="main-section__content-title">${item.title}</h2>
            <time class="main-section__content-time">${this.getFormatedDate(
              +item.id
            )}</time>
            <p class="main-section__content-description">${item.content}</p>
            <input id="buttonEdit" class="button-edit" type="button" method="get" input="button" value="Редактировать">
        </div>
    `;
    this.contentEl.innerHTML = content;
    this.editForm(item);
  }

  editForm(item) {
    const buttonForm = document.querySelector("#buttonEdit");
    buttonForm.addEventListener("click", () => {
      this.modal.classList.toggle("modal--active");
      this.title.value = item.title;
      this.content.value = item.content;
      this.id.value = item.id;
    });
  }

  // Форматируем id (из new Date) к виду "10.01.2021, 23:25:27"
  getFormatedDate(id) {
    return new Date(id).toLocaleString();
  }
}
