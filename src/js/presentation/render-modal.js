import { saveCustomer } from '../../../firebase/config';
import {
  checkCompany,
  checkCustomer,
  checkEmail,
  checkPhone,
  debounce,
  resetFormStyles,
} from '../utils/formValidations';

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
      <div class="mb-6 form-field">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-customer">
          Cliente
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-customer" type="text" placeholder="Jane">
        <span id="customer-validation" class="validation-message"></span>
      </div>

      <div class="mb-6 form-field">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-email">
          Correo
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-email" type="email" placeholder="correo@example.com">
        <span id="email-validation" class="validation-message"></span>
      </div>

      <div class="mb-6 form-field">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-phone">
          Teléfono
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-phone" type="tel" placeholder="1234567890">
        <span id="phone-validation" class="validation-message"></span>
      </div>

      <div class="mb-6 form-field">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="crud-company">
          Empresa
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="crud-company" type="text" placeholder="Nombre de la empresa">
        <span id="company-validation" class="validation-message"></span>
      </div>

      <div class="flex justify-center">
        <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" type="submit">Agregar</button>
      </div>

    </form>
  `;

  // e click que cierra el modal al hacer click fuera del mismo
  // click e that closes the modal when clicked outside of it
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

    // validate fields
    const isCustomerValid = checkCustomer(customer),
      isEmailValid = checkEmail(email),
      isPhoneValid = checkPhone(phone),
      isCompanyValid = checkCompany(company);

    const isFormValid =
      isCustomerValid && isEmailValid && isPhoneValid && isCompanyValid;

    if (isFormValid) {
      saveCustomer(customer.value, email.value, phone.value, company.value);

      crudForm.reset();
      resetFormStyles();
      toggleModal();
    }
  });

  // input event that adds feedback to the form inputs.
  // evento `input` que agrega comentarios a los campos del formulario.
  crudForm.addEventListener(
    'input',
    debounce(({ target }) => {
      // Objeto que mapea los IDs de los campos con las funciones de validación correspondientes
      // Object that maps field IDs to their corresponding validation functions
      const fieldValidations = {
        'crud-customer': checkCustomer, // ID del campo y función de validación
        'crud-email': checkEmail, // ID of input field and validation function
        'crud-phone': checkPhone,
        'crud-company': checkCompany,
      };

      // Se usa el operador ?. para verificar si la función de validación existe en fieldValidations, si existe, se llama con `target` como argumento. Si no existe, no se hace nada más.
      // The optional chaining operator ?. is used to check if the validation function exists in fieldValidations. If it exists, it is called with target as an argument. If it doesn't exist, no further action is taken.
      fieldValidations[target.id]?.(target);
    })
  );
};
