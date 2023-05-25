/**
 * Creates a debounce function that delays the execution of another function until
 * a certain time interval has passed without additional invocations.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function} debounce fn
 */
export const debounce = (fn, delay = 500) => {
  let timeoutId;

  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // set a new timer
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

/**
 *
 * @param {HTMLInputElement} customer
 * @returns {boolean}
 */
export const checkCustomer = (customer) => {
  let isValid = false;

  const $customer = customer.value.trim();

  if (!isRequired($customer)) {
    showValidationResult(customer, 'Cliente es requerido.');
  } else if (!regexCustomer($customer)) {
    showValidationResult(customer, `Solo letras de 3 a 30 caracteres.`);
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
export const checkEmail = (mail) => {
  let isValid = false;

  const $email = mail.value.trim();

  if (!isRequired($email)) {
    showValidationResult(mail, 'Correo electrónico es requerido.');
  } else if (!isEmailValid($email)) {
    showValidationResult(mail, 'Correo electrónico no válido.');
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
export const checkPhone = (phone) => {

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
export const checkCompany = (company) => {

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
const isEmailValid = (email) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

/**
 *
 * @param {string} value
 * @returns {boolean}
 */
const isRequired = (value) => (value === '' ? false : true);

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
export const regexCompany = (company) => /^[A-Za-z0-9\s]{2,20}$/.test(company);

/**
 *
 * @param {HTMLInputElement} input
 * @param {null | string} message
 */
export const showValidationResult = (input, message = null) => {

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
export const resetFormStyles = () => {

  const formFields = document.querySelectorAll('.form-field');
  const inputFields = document.querySelectorAll('.form-field input');

  formFields.forEach((field) =>
    field.classList.remove('text-green-500', 'text-red-500')
  );
  inputFields.forEach((input) =>
    input.classList.remove('border-green-500', 'border-red-500')
  );
};


/**
 * 
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => str.replace(/\b\w/g, (match) => match.toUpperCase());