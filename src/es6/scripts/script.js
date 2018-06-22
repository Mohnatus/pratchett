import Map from '../modules/map.js';
//import data from '../modules/testData.js';
import card from '../modules/card.js';
import Label from '../modules/cycles.js';
import scroll from '../modules/smoothScroll.js';
import ecommerce from '../modules/ecommerce.js';

var data = window.pratchettData;

window.add2Basket = function add2Basket(btn, callback) {
  btn.setAttribute('data-status', 'in-basket');
  btn.textContent ='В корзине';
  callback ? callback() : null;
}


window.addEventListener('DOMContentLoaded', function() {
  Map('.pratchett-map');
  let turtle = document.querySelector('.turtle');
  let flags = turtle.querySelectorAll('.flag');
  let cycleItems = Array.prototype.slice.call(document.querySelectorAll('[data-cycle-item]'), this);

  /* Label */
    window.label = Label;

    for (let i = 0, len = flags.length; i < len; i++) {
      flags[i].addEventListener('mouseenter', function(e) {
        let cycle = this.dataset.cycle;
        let index = this.dataset.index;
        Label.show(cycle, index);
      });
      flags[i].addEventListener('mouseleave', function(e) {
        Label.hide();
      });
    }
  /* end Label */

  /* Book card */
    card.init({
      element: document.querySelector('.pratchett-card'),
      bookCard: '.book-card',
      controls: '[data-slider="pratchett"]',
      seria: '.seria',
      tagText: ''
    });
  
    cycleItems.forEach((item, ind) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        let el = item;
        let cycle = el.dataset.cycle;
        let index = el.dataset.index - 1;
        let slides = data[cycle].items;
        let cycleName = data[cycle].name;
        card.update({
          slides: slides, 
          cycle: cycle, 
          cycleName: cycleName,
          index: index
        });
      });
        
    })
  /* end Book card */

  /* Compass scroll */
  let compass = document.querySelector('.compass');
  let schemeID = 'scheme-scroll';
  compass.addEventListener('click', function() {
    scroll(schemeID, 'slow');
  })
  /* end Compass scroll */
});

