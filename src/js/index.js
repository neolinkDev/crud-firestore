// import { getCustomers } from "../../firebase/firebase";
import { renderFAB } from "./presentation/render-fab";
import { renderModal } from "./presentation/render-modal";
import { renderPaginationButtons } from "./presentation/render-pag-btns";
import { renderTable } from "./presentation/render-table";

const element = document.querySelector('.table-container');

export const init = async () => {
  
  // const element = document.querySelector('.table-container');
  let currentPage = 0;
  const pageSize = 10;

  await renderTable(element, currentPage, pageSize);
  await renderPaginationButtons(element, currentPage, pageSize);
  renderFAB(element);
  renderModal(element, currentPage);
}