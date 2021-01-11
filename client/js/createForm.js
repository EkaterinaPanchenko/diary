import { List } from "./list";

export class CreateForm {
  constructor() {
    this.createButton = document.querySelector("#create");
    this.createForm = document.querySelector("#form");
    this.modal = document.querySelector("#modal");
    this.close = document.querySelector("#close");
    this.listContainer = document.querySelector("#list");

    this.init();
  }

  init() {
    this.createButton.addEventListener("click", () => {
      this.toggleModal();
    });

    this.close.addEventListener("click", () => {
      this.toggleModal();
    });

    this.createForm.addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
  }

  toggleModal() {
    this.modal.classList.toggle("modal--active");
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = this.getFormData();

    if (this.isFormValid(formData)) {
      fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => new List(this.listContainer, data.list))
        .catch((error) => console.error(error));

      this.createForm.reset();
      this.toggleModal();
    }
  }

  // Получаем объект полей формы
  getFormData() {
    const data = {};
    const currentDate = new Date();
    const formData = new FormData(this.createForm);

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
