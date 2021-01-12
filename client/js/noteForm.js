import { List } from "./list";

export class NoteForm {
  constructor() {
    this.createButton = document.querySelector("#create");
    this.noteForm = document.querySelector("#form");
    this.modal = document.querySelector("#modal");
    this.close = document.querySelector("#close");
    this.listContainer = document.querySelector("#list");
    this.title = document.querySelector("#titleInput");
    this.content = document.querySelector("#contentTextarea");
    this.id = document.querySelector("#id");

    this.init();
  }

  init() {
    this.createButton.addEventListener("click", () => {
      this.clearForm();
      this.toggleModal();
    });

    this.close.addEventListener("click", () => {
      this.toggleModal();
    });

    this.noteForm.addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
  }

  // обнуляем данные из формы
  clearForm() {
    this.title.value = "";
    this.content.value = "";
    this.id.value = "";
    this.noteForm.reset();
  }

  toggleModal() {
    this.modal.classList.toggle("modal--active");
  }

  onSubmit(event) {
    event.preventDefault();

    const data = this.getFormData();
    const formData = new FormData(this.noteForm);
    const isEditMode = formData.get("id");

    if (this.isFormValid(data)) {
      fetch(`/api/data${isEditMode ? `/${formData.get("id")}` : ""}`, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => new List(this.listContainer, data.list))
        .catch((error) => console.error(error));

      this.clearForm();
      this.toggleModal();
    }
  }

  // Получаем объект полей формы
  getFormData() {
    const data = {};
    const currentDate = new Date();
    const formData = new FormData(this.noteForm); //new FormData  собирает все данные с полей формы в объект, где ключ будет атрибут name

    formData.append("id", currentDate.getTime());

    for (const [name, value] of formData) {
      data[name] = value;
    }

    return data;
  }

  isFormValid({ content, title }) {
    if (content.trim().length > 1 && title.trim().length > 1) {
      return true;
    }
    alert(
      "Текст должен быть не короче 2 символов и не длиннее 80 для заголовка и 200 для описания"
    );
    return false;
  }
}
