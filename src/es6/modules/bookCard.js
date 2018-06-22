import ecommerce from './ecommerce.js';

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
  ratingVote: null,
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
  ratingVote: '.vote',
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
  this.ratingVote = this.rating.querySelector(bookCard.selectors.ratingVote);
  this.ratingVote = this.rating.querySelector(bookCard.selectors.ratingVote);
  this.yearBlock = this.$.querySelector(bookCard.selectors.yearBlock);
  this.year = this.yearBlock.querySelector(bookCard.selectors.year);
  this.description = this.$.querySelector(bookCard.selectors.description);

  this.link.addEventListener('click', this.clickHandler.bind(this));
  this.title.addEventListener('click', this.clickHandler.bind(this));

  this.inited = true;
}

bookCard.clickHandler = function(e) {
  console.log(this.link)
  e.preventDefault();
  ecommerce.link({
    id: this.$.getAttribute('data-element'),
    name: this.title.innerHTML,
    price: this.price.textContent,
    callback: () => {
      window.location.href = this.link.href;
    }
  });
};

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

bookCard.setRating = function(rating, votes) {
  rating = rating || 0;
  votes = votes || 0;
  this.ratingCount.textContent = rating;
  this.ratingVote.textContent = votes;
};

bookCard.setYear = function(year) {
  if (!year) {
    this.yearBlock.style.display = "none";
  } else {
    this.year.textContent = year;
    this.yearBlock.style.display = "inline";
  }
};

bookCard.setPublisher = function(publisher) {
  if (!publisher) {
    this.publisherBlock.style.display = "none";
  } else {
    this.publisher.textContent = publisher;
    this.publisherBlock.style.display = "inline";
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
  if (!button) return;
  button.addEventListener('click', (e) => {
    let status = button.getAttribute('data-status');
    if (status == 'buy') {
      let id = button.getAttribute('data-product');
      window.add2Basket(button, () => {
        data.button = this.buttonBlock.innerHTML;
        ecommerce.buy({id: data.id, name: data.title, price: data.price});
        VK.Retargeting.Event('button_buy');
      });
    } else if (status == 'in-basket') {
      window.location.href = '/personal/basket.php';
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
  this.setRating(data.rating, data.votes);
  this.setYear(data.year);
  this.setPublisher(data.publisher);
  this.setPrice(data.price);
  this.setDescription(data.description);
  this.setId(data.id);
  this.setButton(data);
};

export default bookCard;