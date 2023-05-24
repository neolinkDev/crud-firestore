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
  crudForm.addEventListener('input', debounce(({ target }) => {
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

/**
 * Creates a debounce function that delays the execution of another function until  
 * a certain time interval has passed without additional invocations.
 * @param {Function} fn 
 * @param {number} delay 
 * @returns {Function} debounce fn
 */
const debounce = (fn, delay = 500) => {

    let timeoutId;

    return (...args) => {

        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // set a new timer
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay);
    };
};

/**
 * 
 * @param {HTMLInputElement} customer 
 * @returns {boolean}
 */
const checkCustomer = (customer) => {

    let isValid = false;

    const $customer = customer.value.trim();

    if (!isRequired($customer)) {
        showValidationResult(customer, 'Cliente es requerido.');
    } else if (!regexCustomer($customer)) {
        showValidationResult(customer, `Solo letras de 3 a 30 caracteres.`)
    } else {
        showValidationResult(customer);
        isValid = true;
    }
    return isValid;
};

/**
 * 
 * @param {HTMLInputElement} mail 
 * @returns {boolean}
 */
const checkEmail = (mail) => {

    let isValid = false;

    const $email = mail.value.trim();

    if (!isRequired($email)) {
        showValidationResult(mail, 'Correo electrónico es requerido.');
    } else if (!isEmailValid($email)) {
        showValidationResult(mail, 'Correo electrónico no válido.')
    } else {
        showValidationResult(mail);
        isValid = true;
    }

    return isValid;
};

/**
 * 
 * @param {HTMLInputElement} phone 
 * @returns {boolean}
 */
const checkPhone = (phone) => {

    let isValid = false;

    const $phone = phone.value.trim();

    if (!isRequired($phone)) {
        showValidationResult(phone, 'Teléfono es requerido.');
    } else if (!regexPhone($phone)) {
        showValidationResult(phone, 'Número telefónico de 10 dígitos.');
    } else {
        showValidationResult(phone);
        isValid = true;
    }
    return isValid;
};

/**
 * 
 * @param {HTMLInputElement} company 
 * @returns {boolean}
 */
const checkCompany = (company) => {

    let isValid = false;

    const $company = company.value.trim();

    if (!isRequired($company)) {
        showValidationResult(company, 'Empresa es requerido.');
    } else if (!regexCompany($company)) {
        showValidationResult(company, 'Letras y números de 2 a 20 caracteres.');
    } else {
        showValidationResult(company);
        isValid = true;
    }
    return isValid;
};

/**
 * 
 * @param {string} email
 * @returns {boolean}
 */
const isEmailValid = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

/**
 * 
 * @param {string} value 
 * @returns {boolean}
 */
const isRequired = value => value === '' ? false : true;

/**
 * 
 * @param {string} customer
 * @returns {boolean}
 */
const regexCustomer = (customer) => /^[A-Za-z\s]{3,30}$/.test(customer);

/**
 * 
 * @param {string} phone 
 * @returns {boolean}
 */
const regexPhone = (phone) => /^\d{10}$/.test(phone);

/**
 * 
 * @param {string} company 
 * @returns {boolean}
 */
const regexCompany = (company) => /^[A-Za-z0-9\s]{2,20}$/.test(company);

/**
 * 
 * @param {HTMLInputElement} input 
 * @param {null | string} message 
 */
const showValidationResult = (input, message = null) => {
  const formField = input.parentElement;
  const error = formField.querySelector('span');

  formField.classList.remove('text-green-500', 'text-red-500');
  input.classList.remove('border-green-500', 'border-red-500');

  if (message) {
    formField.classList.add('text-red-500');
    input.classList.add('border-red-500');
    error.textContent = message;
  } else {
    formField.classList.add('text-green-500');
    input.classList.add('border-green-500');
    error.textContent = '';
  }
};

/**
 * Resetea los estilos de los inputs del formulario al agregar cliente a la BD
 * Reset the styles of the form inputs when adding a customer to the DB.
 */
const resetFormStyles = () => {
  const formFields = document.querySelectorAll('.form-field');
  const inputFields = document.querySelectorAll('.form-field input');

  formFields.forEach(field => field.classList.remove('text-green-500', 'text-red-500'));
  inputFields.forEach(input => input.classList.remove('border-green-500', 'border-red-500'));
};