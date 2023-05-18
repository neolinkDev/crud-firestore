import { saveCustomer } from '../../../firebase/config';

let modal;

export const toggleModal = () => {
  // modal.classList.toggle('show');
  modal.classList.toggle('hidden');
};

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderModal = (element) => {
  if (modal) return;

  modal = document.createElement('DIV');
  modal.classList.add('w-1/2', 'modal', 'hidden', 'z-2000');
  modal.innerHTML = `
    <form id='crud-form' class="modal-bg">
      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-customer">
          Cliente
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-customer" type="text" placeholder="Jane">
      </div>

      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-email">
          Correo
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-email" type="email" placeholder="correo@example.com">
      </div>

      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-phone">
          Teléfono
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-phone" type="tel" placeholder="1234567890">
      </div>

      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-company">
          Empresa
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-company" type="text" placeholder="Nombre de la empresa">
      </div>

      <div class="flex justify-center">
        <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" type="submit">Enviar</button>
      </div>

    </form>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target.matches('.modal') && !modal.classList.contains('hidden')) {
      toggleModal();
    }
  });

  element.append(modal);

  const crudForm = document.getElementById('crud-form');

  crudForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const customer = crudForm['crud-customer'],
      email = crudForm['crud-email'],
      phone = crudForm['crud-phone'],
      company = crudForm['crud-company'];

    saveCustomer(customer.value, email.value, phone.value, company.value);

    crudForm.reset();
  });
};
