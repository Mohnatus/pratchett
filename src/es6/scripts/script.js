import Map from '../modules/map.js';

import data from '../modules/testData.js';

import showBookCard from '../modules/bookCard.js';

import Label from '../modules/cycles.js';


window.addEventListener('DOMContentLoaded', function() {
  Map('.pratchett-map');

  let turtle = document.querySelector('.turtle');

  let flags = turtle.querySelectorAll('.flag');

  for (let i = 0, len = flags.length; i < len; i++) {
    flags[i].addEventListener('mouseenter', function(e) {
      let cycle = this.dataset.cycle;
      let index = this.dataset.index;
      Label.show(cycle, index);
    });
    flags[i].addEventListener('click', function(e) {
      let cycle = this.dataset.cycle;
      let index = this.dataset.index;
      Label.hide();
      let bookData = data[cycle][index];
      showBookCard(bookData);
    });
    flags[i].addEventListener('mouseleave', function(e) {
      Label.hide();
    });
  }

});

