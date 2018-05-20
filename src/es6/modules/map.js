export default function(selector) {
  let map = document.querySelector(selector);
  let close = map.querySelector(`${selector}__close`);

  let isClose = false;

  let closeMap = (event) => {
    event.stopImmediatePropagation();
    isClose = true;
    map.setAttribute('data-close', '');
  };

  let openMap = () => {
    isClose = false;
    map.removeAttribute('data-close');
  };

  close.addEventListener('click', closeMap);
  map.addEventListener('click', () => {
    if (isClose) openMap();
  });
}