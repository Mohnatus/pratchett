export default function(selector) {
  let map = document.querySelector(selector);
  let close = map.querySelector(`${selector}__close`);

  let isClose = map.hasAttribute('data-close');

  let closeMap = (event) => {
    isClose = true;
    map.setAttribute('data-close', '');
  };

  let openMap = (event) => {
    isClose = false;
    map.removeAttribute('data-close');
  };

  map.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isClose) openMap();
    else closeMap();
  });
}