let modal;


export const toggleModal = () => {
  modal.classList.toggle('hide-modal');
}

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderModal = (element) => {

  if (modal) return;

  modal = document.createElement('DIV');
  modal.classList.add('w-1/2', 'modal', 'hide-modal');
  modal.innerHTML = `
    <form class="modal-bg">
      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Cliente
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
      </div>

      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
          Correo
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="email" placeholder="correo@example.com">
      </div>

      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-phone">
          Teléfono
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-phone" type="tel" placeholder="1234567890">
      </div>

      <div class="mb-6">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-company">
          Empresa
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-company" type="text" placeholder="Nombre de la empresa">
      </div>

      <div class="flex justify-center">
        <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" type="submit">Enviar</button>
      </div>

    </form>
  `;

  modal.addEventListener('click', (e) => {
    
    if(e.target.matches('.modal')){
      toggleModal();
    }
  });

  element.append(modal);

  
};
