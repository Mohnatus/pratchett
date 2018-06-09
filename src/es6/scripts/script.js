import Map from '../modules/map.js';
import data from '../modules/testData.js';
import card from '../modules/card.js';
import Label from '../modules/cycles.js';
import Slider from '../modules/slider.js';


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

    // let slider = new Slider({
    //   element: document.querySelector('[data-slider="pratchett"]'),
    //   createSlide: function(data) {
    //     let name = 'pratchett-slide';
    //     let slide = createBlock('div', name);
    //     let link = createBlock('a', name + "__link", {href: data.link});
    //     let image = createBlock('img', name + "__img", {src: data.img})
    //     link.appendChild(image);
    //     let info = createBlock('div', name + "__info");
    //     let title = createBlock('div', name + "__title", false, data.title);
    //     let author = data.author ? createBlock('div', name + "__author", false, data.author) : '';
    //     let ratingContent = document.createDocumentFragment();
    //     let ratingTitle = createBlock('span', 'rating__title', false, 'Рейтинг: <b>' + data.rating + '</b>');
    //     let vote = createBlock('span', 'rating__vote', false, data.votes);
    //     let star = "<svg class='rating__star'><use xlink:href='#star-icon'></use></svg>";
    //     let starsGroup = "";
    //     for (let i = 0; i < 10; i++) {
    //       starsGroup += star;
    //     };
    //     let stars = createBlock('span', 'rating__stars', false, starsGroup);
    //     ratingContent.appendChild(ratingTitle);
    //     ratingContent.appendChild(vote);
    //     ratingContent.appendChild(stars);
    //     console.log(ratingContent)
    //     let rating = createBlock('div', "rating", {"data-rating": Math.ceil(data.rating)}, ratingContent);
    //     let year = createBlock('p', false, false, "Год издания: " + data.year);
    //     let publisher = createBlock('p', false, false, "Издательство: " + data.publisher);
    //     let price = createBlock('p', false, false, "Цена: <b>" + data.price + '&#8381;</b>');
    //     let button = createBlock('div', name + "__button", false, data.button);
    //     info.appendChild(title);
    //     info.appendChild(author);
    //     info.appendChild(rating);
    //     info.appendChild(year);
    //     info.appendChild(publisher);
    //     info.appendChild(price);
    //     info.appendChild(button);
        
    //     slide.appendChild(link);
    //     slide.appendChild(info);

    //     slide.imagePath = data.img;
    //     return slide;
    //   },
    //   createControl: function($slide) {
    //     let name = 'pratchett-control';
    //     let control = createBlock('div', name);
    //     let img = $slide.imagePath;
    //     control.style.backgroundImage = `url(${img})`;
    //     return control;
    //   },
    //   updateSlide: function(data) {

    //   }
    // });

    // let slider = new Slider({
    //   element: document.querySelector('[data-slider="pratchett"]'),
    //   onChange: function(data) {
    //     console.log('on change')
    //     updateCard(data);
    //   },
    //   visibleCount: 5,
    //   mainPosition: 3
    // })

    // if (slider.error) alert('slider error!' + slider.message);
  


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
});

