import { renderFAB } from "./presentation/render-fab";
import { renderTable } from "./presentation/render-table";

const element = document.querySelector('.table-container');


export const init = () => {
  
  renderTable(element);
  renderFAB(element)
}