
let card;

let initCard = function() {
  card = {};
  card.$ = document.querySelector('[data-book-card]');

  card.close = card.$.querySelector('[data-close]');
  card.close.addEventListener('click', function() {
    card.$.removeAttribute('data-shown');
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
  //card.description = card.book.querySelector('.book-card__annotation');

  card.controls = card.$.querySelector('[data-controls]');

  card.currentControl = null;
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

let setButton = function(button) {
  card.buttonBlock.innerHTML = button;
}

let setDescription = function(description) {
  card.description.textContent = description;
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
  //setDescription(data.description);
  setId(data.id);
  setButton(data.button);
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
}

let createControl = function(img) {
  let el = document.createElement('div');
  el.classList.add('pratchett-control');
  el.style.backgroundImage = `url(${img})`;
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

  card.$.setAttribute('data-shown', '');
}