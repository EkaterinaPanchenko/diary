import { Content } from "./content";

export class List {
  constructor(listEl, list) {
    this.list = list;
    this.listEl = listEl;
    this.contentEl = document.querySelector("#content");
    this.content = new Content(this.contentEl); // создаем эземпляр класса Content (content.js)
    this.init();
  }

  init() {
    // запускаем метод render
    this.render();
  }

  render() {
    this.listEl.innerHTML = "";
    // проходимся по list (data.json) и вставляем значения title и id в создаваемые li
    this.list.forEach((item, index) => {
      const liEl = document.createElement("li");
      liEl.classList = "main-section__item";
      liEl.setAttribute("data-id", item.id);
      liEl.innerHTML = `${item.title}<time class="main-section__time">10.01.2021 14:00</time>`;
      // по клику вызаваем метод render(item) - отрисовывается content соответствующий li
      liEl.addEventListener("click", (event) => {
        // записываем в массив все li (до этого был псевдомассив - html колекция)
        const items = Array.from(
          document.querySelectorAll(".main-section__item")
          );
          // удаляем класс active
          items.forEach((elem) => {
            elem.classList.remove("main-section__item--active");
          });
          // добавляем класс active
          liEl.classList.add("main-section__item--active");
          this.content.render(item);
        });
        if (index === 0 && this.list.length > 0) {
          liEl.classList.add("main-section__item--active");
          this.content.render(item);
        }
      this.listEl.append(liEl); // используем append для добавления элемента созданного динамически
    });
  }
}
