let bookCard = {
  inited: false,

  $: null,
  link: null,
  img: null,
  title: null,
  author: null,
  publisherBlock: null,
  publisher: null,
  priceBlock: null,
  price: null,
  buttonBlock: null,
  rating: null,
  ratingCount: null,
  yearBlock: null,
  year: null,
  description: null,
};

bookCard.selectors = {
  link: '.book-card__img',
  img: 'img',
  title: '.book-card__title',
  author: '.book-card__author',
  publisherBlock: '.book-card__publisher',
  publisher: '.publisher',
  priceBlock: '.book-card__price',
  price: '.price',
  buttonBlock: '.book-card__button',
  rating: '.book-rating',
  ratingCount: '.count',
  yearBlock: '.book-card__year',
  year: '.year',
  description: '.book-card__annotation',
}

bookCard.init = function(config) {
  if (this.inited) return;

  this.$ = config.element;

  this.link = this.$.querySelector(bookCard.selectors.link);
  this.img = this.link.querySelector(bookCard.selectors.img);
  this.title = this.$.querySelector(bookCard.selectors.title);
  this.author = this.$.querySelector(bookCard.selectors.author);
  this.publisherBlock = this.$.querySelector(bookCard.selectors.publisherBlock);
  this.publisher = this.publisherBlock.querySelector(bookCard.selectors.publisher);
  this.priceBlock = this.$.querySelector(bookCard.selectors.priceBlock);
  this.price = this.priceBlock.querySelector(bookCard.selectors.price);
  this.buttonBlock = this.$.querySelector(bookCard.selectors.buttonBlock);
  this.rating = this.$.querySelector(bookCard.selectors.rating);
  this.ratingCount = this.rating.querySelector(bookCard.selectors.ratingCount);
  this.yearBlock = this.$.querySelector(bookCard.selectors.yearBlock);
  this.year = this.yearBlock.querySelector(bookCard.selectors.year);
  this.description = this.$.querySelector(bookCard.selectors.description);

  this.inited = true;
}

bookCard.setImage = function(img) {
  this.img.setAttribute('src', img);
};

bookCard.setLink = function(link) {
  this.link.setAttribute('href', link);
};

bookCard.setTitle = function(title) {
  this.title.textContent = title;
};

bookCard.setAuthor = function(author) {
  if (!author) 
    this.author.style.display = "none";
  else {
    this.author.textContent = author;
    this.author.style.display = "block";
  } 
};

bookCard.setRating = function(rating) {
  rating = rating || 0;
  this.rating.setAttribute('data-rating', Math.ceil(rating));
  this.ratingCount.textContent = rating;
};

bookCard.setYear = function(year) {
  if (!year) {
    this.yearBlock.style.display = "none";
  } else {
    this.year.textContent = year;
    this.yearBlock.style.display = "block";
  }
};

bookCard.setPublisher = function(publisher) {
  if (!publisher) {
    this.publisherBlock.style.display = "none";
  } else {
    this.publisher.textContent = publisher;
    this.publisherBlock.style.display = "block";
  }
};

bookCard.setPrice = function(price) {
  this.price.textContent = price;
};

bookCard.setId = function(id) {
  this.$.setAttribute('data-element', id);
};

bookCard.setButton = function(data) {
  this.buttonBlock.innerHTML = data.button;
  let button = this.buttonBlock.querySelector('button');
  button.addEventListener('click', (e) => {
    if (button.getAttribute('data-status') == 'buy') {
      let id = button.getAttribute('data-product');
      window.add2Basket(button, id, () => {
        data.button = this.buttonBlock.innerHTML;
      });
    }
  }) 
};

bookCard.setDescription = function(description) {
  this.description.innerHTML = description;
}

bookCard.setData = function(data) {
  this.setLink(data.link);
  this.setImage(data.img);
  this.setTitle(data.title);
  this.setAuthor(data.author);
  this.setRating(data.rating);
  this.setYear(data.year);
  this.setPublisher(data.publisher);
  this.setPrice(data.price);
  this.setDescription(data.description);
  this.setId(data.id);
  this.setButton(data);
};



// let activateControl = function(control) {
//   card.currentControl ? card.currentControl.removeAttribute('data-active') : null;
//   card.currentControl = control;
//   control.setAttribute('data-active', '');
// }

// let updateBigCard = function(slide) {
//   setData(slide);
// }



// export default function(slides, index) {
//   if (!slides) return;

//   index = index || 0;
//   if (index >= slides.length) index = 0;

//   if (!card) {
//     initCard();
//   }

//   let slideData = slides[index];
//   if (!slideData) return;

//   setData(slideData);
//   setControls(slides, index);

//   card.show();
// }

export default bookCard;