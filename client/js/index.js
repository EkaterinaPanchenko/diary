import { List } from "./list";
import { NoteForm } from "./noteForm";

const noteForm = new NoteForm();

const listEl = document.querySelector("#list");

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => new List(listEl, data.list))
  .catch((error) => console.error(error));
