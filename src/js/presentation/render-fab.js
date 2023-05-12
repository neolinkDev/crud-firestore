


export const renderFAB = (element) => {
  const $faButton = document.createElement('button');
  $faButton.classList.add(
    'fixed',
    'bottom-20',
    'right-20',
    'bg-orange-500',
    'hover:bg-orange-700',
    'text-white',
    'font-bold',
    'py-2',
    'px-4',
    'rounded'
  );
  $faButton.innerHTML = '+';

  element.appendChild($faButton);

  //
};
