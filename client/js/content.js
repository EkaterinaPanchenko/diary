import { List } from "./list";

export class Content {
  constructor(contentEl) {
    this.contentEl = contentEl;
    this.modal = document.querySelector("#modal");
    this.title = document.querySelector("#titleInput");
    this.content = document.querySelector("#contentTextarea");
    this.id = document.querySelector("#id");
    this.contentEl = document.querySelector("#content");
    this.listContainer = document.querySelector("#list");
  }

  init(item) {
    this.editForm(item);
    this.deleteNote(item.id);
  }

  render(item) {
    const content = `
        <div class="main-section__content-container">
            <h2 class="main-section__content-title">${item.title}</h2>
            <time class="main-section__content-time">${this.getFormatedDate(
              +item.id
            )}</time>
            <p class="main-section__content-description">${item.content}</p>
            <div class="button-container">
              <input id="buttonEdit" class="button-edit" type="button" method="get" input="button" value="Редактировать">
              <input id="buttonDelete" type="button" class="button-delete" value="Удалить">
            </div>
        </div>
    `;

    this.contentEl.innerHTML = content;

    this.init(item);
  }

  editForm(item) {
    const editButton = document.querySelector("#buttonEdit");

    editButton.addEventListener("click", () => {
      this.modal.classList.toggle("modal--active");
      this.title.value = item.title;
      this.content.value = item.content;
      this.id.value = item.id;
    });
  }

  clearContent() {
    this.contentEl.innerHTML = "";
  }

  deleteNote(id) {
    const deleteButton = document.querySelector("#buttonDelete");

    deleteButton.addEventListener("click", () => {
      fetch(`/api/data/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json;charset=utf-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          this.clearContent();
          return new List(this.listContainer, data.list);
        })
        .catch((error) => console.error(error));
    });
  }

  // Форматируем id (из new Date) к виду "10.01.2021, 23:25:27"
  getFormatedDate(id) {
    return new Date(id).toLocaleString();
  }
}
