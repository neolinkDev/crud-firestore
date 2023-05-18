// import { getCustomers } from "../../firebase/firebase";
import { renderFAB } from "./presentation/render-fab";
import { renderModal } from "./presentation/render-modal";
import { renderTable } from "./presentation/render-table";

const element = document.querySelector('.table-container');

export const init = async () => {
  // const customers = await getCustomers();
 
  // customers.forEach(customer => {
  //   console.log(customer.data())
  // });

  await renderTable(element);
  renderFAB(element);
  renderModal(element);
}