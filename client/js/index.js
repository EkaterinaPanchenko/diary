import { List } from "./list";
import { CreateNewNoteForm } from "./createNewNoteForm";

const createNewNoteForm = new CreateNewNoteForm();

const listEl = document.querySelector("#list");

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => new List(listEl, data.list))
  .catch((error) => console.error(error));
