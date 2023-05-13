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
export const renderTable = (element) => {
  if (!table) {
    table = createTable();
    element.append(table);

    //
  }
};
