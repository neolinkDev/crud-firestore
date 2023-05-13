import { renderFAB } from "./presentation/render-fab";
import { renderModal } from "./presentation/render-modal";
import { renderTable } from "./presentation/render-table";

const element = document.querySelector('.table-container');


export const init = () => {
  
  renderTable(element);
  renderFAB(element);
  renderModal(element);
}