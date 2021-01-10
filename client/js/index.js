import { List } from "./list";

const listEl = document.querySelector("#list");

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => new List(listEl, data.list))
  .catch((error) => console.error(error));
