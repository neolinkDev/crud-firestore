import { toggleModal } from './render-modal';

/**
 * 
 * @param {HTMLElement} element 
 */
export const renderFAB = (element) => {
  
  const $faButton = document.createElement('button');
  $faButton.classList.add(
    'fixed',
    'bottom-20',
    'right-28',
    'bg-orange-500',
    'hover:bg-orange-700',
    'text-white',
    'font-bold',
    'py-2',
    'px-4',
    'rounded',
    'cursor-pointer',
    'z-1',
    'fadeInShake'
  );
  $faButton.innerHTML = '+';

  element.appendChild($faButton);

  $faButton.addEventListener('click', () => {

    toggleModal();
  });
};
