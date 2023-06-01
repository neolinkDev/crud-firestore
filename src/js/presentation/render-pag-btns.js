import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase/config';

import { renderTable } from './render-table';

/**
 * @param {HTMLDivElement} element
 */
export const renderPaginationButtons = async (element, currentPage, pageSize) => {
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('flex', 'justify-center', 'my-4');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add(
    'bg-gray-300',
    'hover:bg-gray-400',
    'text-gray-800',
    'font-bold',
    'py-2',
    'px-4',
    'rounded-l'
  );
  prevBtn.innerText = 'Anterior';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add(
    'bg-gray-300',
    'hover:bg-gray-400',
    'text-gray-800',
    'font-bold',
    'py-2',
    'px-4',
    'rounded-r'
  );
  nextBtn.innerText = 'Siguiente';

  const currentPageLabel = document.createElement('span');
  currentPageLabel.id = 'current-page';
  currentPageLabel.innerText = currentPage + 1;
  currentPageLabel.classList.add(
    'text-gray-800',
    'font-bold',
    'py-2',
    'px-4',
    'rounded'
  );

  paginationContainer.append(prevBtn, currentPageLabel, nextBtn);
  element.append(paginationContainer);

  // Obtener el total de documentos en la colección
  const count = await getDocumentCount();

  // Actualizar el estado de los botones al cargar la página
  updateButtonState();

  // Evento de clic en el botón "Anterior"
  prevBtn.addEventListener('click', () => {
    
    if (currentPage > 0) {
      currentPage--;
      currentPageLabel.innerText = currentPage + 1;
      renderTable(element, currentPage, pageSize);
      updateButtonState();
    }
  });

  // Evento de clic en el botón "Siguiente"
  nextBtn.addEventListener('click', () => {

   
    if ((currentPage + 1) * pageSize < count) {
      currentPage++;
      currentPageLabel.innerText = currentPage + 1;
      renderTable(element, currentPage, pageSize);
      updateButtonState();
    }
  });

  // Función para obtener el total de documentos en la colección
  async function getDocumentCount() {
    const querySnapshot = await getDocs(query(collection(db, 'customers')));
    return querySnapshot.size;
  }

  // Función para actualizar el estado de los botones
  function updateButtonState() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = (currentPage + 1) * pageSize >= count;

    if (nextBtn.disabled) {
      nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
};
