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

    fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(this.getFormData()),
    })
      .then((response) => response.json())
      .then((data) => new List(this.listContainer, data.list))
      .catch((error) => console.error(error));

    this.createForm.reset();
    this.toggleModal();
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
}
