import Map from '../modules/map.js';

import data from '../modules/testData.js';

import updateCard from '../modules/bookCard.js';

import Label from '../modules/cycles.js';

//import Slider from '../modules/slider.js';


function add2Basket(id) {

}

window.addEventListener('DOMContentLoaded', function() {
  Map('.pratchett-map');

  let turtle = document.querySelector('.turtle');

  let flags = turtle.querySelectorAll('.flag');
  let cycles = document.querySelector('.cycles');

  document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-status')) {
      if (e.target.getAttribute('data-status') == 'buy') {
        let id = e.target.getAttribute('data-product');
        add2Basket(id);
      }
    }
  })  

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

  /*let createBlock = (el, className, attrs, content) => {
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

  let slider = new Slider({
    element: document.querySelector('[data-slider="pratchett"]'),
    createSlide: function(data) {
      let name = 'pratchett-slide';
      let slide = createBlock('div', name);
      let link = createBlock('a', name + "__link", {href: data.link});
      let image = createBlock('img', name + "__img", {src: data.img})
      link.appendChild(image);
      let info = createBlock('div', name + "__info");
      let title = createBlock('div', name + "__title", false, data.title);
      let author = data.author ? createBlock('div', name + "__author", false, data.author) : '';
      let ratingContent = document.createDocumentFragment();
      let ratingTitle = createBlock('span', 'rating__title', false, 'Рейтинг: <b>' + data.rating + '</b>');
      let vote = createBlock('span', 'rating__vote', false, data.votes);
      let star = "<svg class='rating__star'><use xlink:href='#star-icon'></use></svg>";
      let starsGroup = "";
      for (let i = 0; i < 10; i++) {
        starsGroup += star;
      };
      let stars = createBlock('span', 'rating__stars', false, starsGroup);
      ratingContent.appendChild(ratingTitle);
      ratingContent.appendChild(vote);
      ratingContent.appendChild(stars);
      console.log(ratingContent)
      let rating = createBlock('div', "rating", {"data-rating": Math.ceil(data.rating)}, ratingContent);
      let year = createBlock('p', false, false, "Год издания: " + data.year);
      let publisher = createBlock('p', false, false, "Издательство: " + data.publisher);
      let price = createBlock('p', false, false, "Цена: <b>" + data.price + '&#8381;</b>');
      let button = createBlock('div', name + "__button", false, data.button);
      info.appendChild(title);
      info.appendChild(author);
      info.appendChild(rating);
      info.appendChild(year);
      info.appendChild(publisher);
      info.appendChild(price);
      info.appendChild(button);
      
      slide.appendChild(link);
      slide.appendChild(info);

      slide.imagePath = data.img;
      return slide;
    },
    createControl: function($slide) {
      let name = 'pratchett-control';
      let control = createBlock('div', name);
      let img = $slide.imagePath;
      control.style.backgroundImage = `url(${img})`;
      return control;
    }
  });

  if (slider.error) alert('slider error!');
  */



  let cycleItems = Array.prototype.slice.call(document.querySelectorAll('[data-cycle-item]'), this);

  cycleItems.forEach((item, ind) => {
    item.addEventListener('click', (e) => {
      let el = item;
      let cycle = el.dataset.cycle;
      let index = el.dataset.index - 1;
      let slides = data[cycle];
      //slider.update(slides, cycle, index);
      updateCard(slides, index);
    })
      
  })
});

