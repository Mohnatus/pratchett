import Map from '../modules/map.js';
//import data from '../modules/testData.js';
import card from '../modules/card.js';
import Label from '../modules/cycles.js';

var data = window.pratchettData;

window.add2Basket = function add2Basket(btn, id, callback) {
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
    let createBlock = (el, className, attrs, content) => {
      let block = document.createElement(el);
      if (className) {
        block.classList.add(className);
      }
      
      if (attrs) {
        for (let attr in attrs) {
          block.setAttribute(attr, attrs[attr] || '');
        }
      }
      if (content) {
        if (typeof(content) == "string") block.innerHTML = content;
        else block.appendChild(content);
      }
      return block;
    }

    card.init({
      element: document.querySelector('.pratchett-card'),
      bookCard: '.book-card',
      controls: '[data-slider="pratchett"]'
    });
  
    cycleItems.forEach((item, ind) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        let el = item;
        let cycle = el.dataset.cycle;
        let index = el.dataset.index - 1;
        let slides = data[cycle];
        card.update(slides, cycle, index);
      });
        
    })
  /* end Book card */
});

