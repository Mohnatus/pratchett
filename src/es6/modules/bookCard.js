
let card;

let initCard = function() {
  card = {};
  card.$ = document.querySelector('.book-card');
  card.close = card.$.querySelector('.close');
  card.close.addEventListener('click', function() {
    card.$.removeAttribute('data-shown');
  });
  card.link = card.$.querySelector('.book-card__img');card.img = card.link.querySelector('img');
  card.title = card.$.querySelector('.book-card__title');
  card.author = card.$.querySelector('.book-card__author');
  card.publisherBlock = card.$.querySelector('.book-card__publisher');
  card.publisher = card.publisherBlock.querySelector('.publisher');
  card.priceBlock = card.$.querySelector('.book-card__price');
  card.price = card.priceBlock.querySelector('.price');
  card.button = card.$.querySelector('.book-card__button').querySelector('button');
  card.rating = card.$.querySelector('.book-rating');
  card.ratingCount = card.rating.querySelector('.count');
  card.yearBlock = card.$.querySelector('.book-card__year');
  card.year = card.yearBlock.querySelector('.year');
  card.description = card.$.querySelector('.book-card__annotation');
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
  card.button.setAttribute('data-element', id);
};

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
  setDescription(data.description);
  setId(data.id);
};


export default function(data) {
  if (!data) return;

  if (!card) {
    initCard();
  }

  setData(data);

  card.$.setAttribute('data-shown', '');
}