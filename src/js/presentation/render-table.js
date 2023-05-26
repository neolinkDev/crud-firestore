import { onGetCustomers } from '../../../firebase/config';

let table;
const d = document;

/**
 *
 * @returns {HTMLTableElement}
 */
const createTable = () => {
  const $table = d.createElement('table');
  const $tableHead = d.createElement('thead');

  $table.classList.add('min-w-full');

  $tableHead.innerHTML = `
    <tr>
      <th class="pb-2 px-4 text-center whitespace-nowrap">Nombre cliente</th>
      <th class="pb-2 px-4 text-center">Correo</th>
      <th class="pb-2 px-4 text-center">Teléfono</th>
      <th class="pb-2 px-4 text-center">Empresa</th>
      <th class="pb-2 px-4 text-center">Acciones</th>
    </tr>
  `;

  const $tableBody = d.createElement('tbody');

  $table.append($tableHead, $tableBody);

  return $table;
};

/**
 *
 * @param {HTMLElement} element
 */
export const renderTable = async (element) => {

  onGetCustomers((querySnapshot) => {

    let customersTable = '';

    querySnapshot.forEach((doc) => {
      
      const customer = doc.data();

      customersTable += `
        <tr>
          <td class="pb-2 px-4 text-center whitespace-nowrap">${customer.customer}</td>
          <td class="pb-2 px-4 text-center whitespace-nowrap">${customer.email}</td>
          <td class="pb-2 px-4 text-center whitespace-nowrap">${customer.phone}</td>
          <td class="pb-2 px-4 text-center whitespace-nowrap">${customer.company}</td>
          <td class="pb-2 px-4 text-center whitespace-nowrap">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded mr-2">
              Editar
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded">
              Eliminar
            </button>
          </td>
        </tr>
      `;
    });

    table.querySelector('tbody').innerHTML = customersTable;
  });

  if (!table) {
    table = createTable();
    element.append(table);
  }
};
