import slider from './simpleSlider.js';

let card;  

let initCard = function() {
  card = {};
  card.$ = document.querySelector('[data-book-card]');
  card.close = function() {
    if (!card.isOpen) return;
    card.$.removeAttribute('data-shown');
    card.isOpen = false;
  }
  card.show = function() {
    card.$.setAttribute('data-shown', '');
    card.isOpen = true;
  }
  card.$close = card.$.querySelector('[data-close]');
  card.$close.addEventListener('click', function() {
    card.close();
  });

  card.book = card.$.querySelector('.book-card');
  card.link = card.book.querySelector('.book-card__img');
  card.img = card.link.querySelector('img');
  card.title = card.book.querySelector('.book-card__title');
  card.author = card.book.querySelector('.book-card__author');
  card.publisherBlock = card.book.querySelector('.book-card__publisher');
  card.publisher = card.publisherBlock.querySelector('.publisher');
  card.priceBlock = card.book.querySelector('.book-card__price');
  card.price = card.priceBlock.querySelector('.price');
  card.buttonBlock = card.book.querySelector('.book-card__button');
  card.rating = card.book.querySelector('.book-rating');
  card.ratingCount = card.rating.querySelector('.count');
  card.yearBlock = card.book.querySelector('.book-card__year');
  card.year = card.yearBlock.querySelector('.year');
  card.description = card.book.querySelector('.book-card__annotation');

  card.controlsBlock = card.$.querySelector('[data-controls]');
  card.controlsSlider = new slider(card.controlsBlock.querySelector('[data-simple-slider]'));
  card.controls = card.controlsBlock.querySelector('[data-slides]');

  card.currentControl = null;

  card.isOpen = false;

  document.addEventListener('click', (e) => {
    if (card.isOpen && !card.$.contains(e.target)) {
      card.close();
    }
  });
  card.$.addEventListener('click', (e) => {
    //e.stopPropagation();
  });
};

let setImage = function(img) {
  card.img.setAttribute('src', img);
};

let setLink = function(link) {
  card.link.setAttribute('href', link);
};

let setTitle = function(title) {
  card.title.textContent = title;
};

let setAuthor = function(author) {
  if (!author) 
    card.author.style.display = "none";
  else {
    card.author.textContent = author;
    card.author.style.display = "block";
  } 
};

let setRating = function(rating) {
  rating = rating || 0;
  card.rating.setAttribute('data-rating', Math.ceil(rating));
  card.ratingCount.textContent = rating;
};

let setYear = function(year) {
  if (!year) {
    card.yearBlock.style.display = "none";
  } else {
    card.year.textContent = year;
    card.yearBlock.style.display = "block";
  }
};

let setPublisher = function(publisher) {
  if (!publisher) {
    card.publisherBlock.style.display = "none";
  } else {
    card.publisher.textContent = publisher;
    card.publisherBlock.style.display = "block";
  }
};

let setPrice = function(price) {
  card.price.textContent = price;
};

let setId = function(id) {
  card.book.setAttribute('data-element', id);
};

let setButton = function(data) {
  card.buttonBlock.innerHTML = data.button;
  let button = card.buttonBlock.querySelector('button');
  button.addEventListener('click', (e) => {
    if (button.getAttribute('data-status') == 'buy') {
      let id = button.getAttribute('data-product');
      window.add2Basket(button, id, () => {
        data.button = card.buttonBlock.innerHTML;
      });
    }
  }) 
};

let setDescription = function(description) {
  card.description.innerHTML = description;
}

let setData = function(data) {
  setLink(data.link);
  setImage(data.img);
  setTitle(data.title);
  setAuthor(data.author);
  setRating(data.rating);
  setYear(data.year);
  setPublisher(data.publisher);
  setPrice(data.price);
  setDescription(data.description);
  setId(data.id);
  setButton(data);
};

let setControls = function(slides, index) {
  let fr = document.createDocumentFragment();
  for (let i = 0, count = slides.length; i < count; i++) {
    let slide = slides[i];
    let control = createControl(slide.img);
    if (i == index) activateControl(control);
    control.addEventListener('click', () => {
      activateControl(control);
      updateBigCard(slide);
    });
    fr.appendChild(control);
  }
  card.controls.innerHTML = "";
  card.controls.appendChild(fr);
  card.controlsSlider.update(index);
}

let createControl = function(img) {
  let el = document.createElement('div');
  el.classList.add('pratchett-control');
  let $img = `<img src=${img} />`;
  el.innerHTML = $img;
  return el;
}

let activateControl = function(control) {
  card.currentControl ? card.currentControl.removeAttribute('data-active') : null;
  card.currentControl = control;
  control.setAttribute('data-active', '');
}

let updateBigCard = function(slide) {
  setData(slide);
}



export default function(slides, index) {
  if (!slides) return;

  index = index || 0;
  if (index >= slides.length) index = 0;

  if (!card) {
    initCard();
  }

  let slideData = slides[index];
  if (!slideData) return;

  setData(slideData);
  setControls(slides, index);

  card.show();
}