import Map from '../modules/map.js';

import data from '../modules/testData.js';

import showBookCard from '../modules/bookCard.js';

import Label from '../modules/cycles.js';

import Slider from '../modules/slider.js';


window.addEventListener('DOMContentLoaded', function() {
  Map('.pratchett-map');

  let turtle = document.querySelector('.turtle');

  let flags = turtle.querySelectorAll('.flag');

  let cycles = document.querySelector('.cycles');

  for (let i = 0, len = flags.length; i < len; i++) {
    flags[i].addEventListener('mouseenter', function(e) {
      let cycle = this.dataset.cycle;
      let index = this.dataset.index - 1;
      Label.show(cycle, index);
    });
    flags[i].addEventListener('click', function(e) {
      let cycle = this.dataset.cycle;
      let index = this.dataset.index - 1;
      Label.hide();
      let bookData = data[cycle][index];
      showBookCard(bookData);
    });
    flags[i].addEventListener('mouseleave', function(e) {
      Label.hide();
    });
  }

  let createBlock = (el, className, attrs, content) => {
    let block = document.createElement(el);
    block.classList.add(className);
    if (attrs) {
      for (let attr in attrs) {
        block.setAttribute(attr, attrs[attr] || '');
      }
    }
    if (content) block.textContent = content;
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
      let description = createBlock('div', name + "__description", false, data.description);
      info.appendChild(title);
      info.appendChild(author);
      slide.appendChild(link);
      slide.appendChild(info);
      return slide;
    }
  });

  if (slider.error) alert('slider error!')

  cycles.addEventListener('click', (e) => {
    let el = e.target;
    while(!el.classList.contains('book')) {
      el = el.parentNode;
      if (el.classList.contains('cycles')) break;
    }
    if (el.classList.contains('book')) {
      let cycle = el.dataset.cycle;
      let index = el.dataset.index - 1;
      let slides = data[cycle];
      slider.update(slides, cycle);
      slider.setActiveSlide(index);
      slider.show(index);
    }
  })

});

