
let card;

let initCard = function(card) {
  card = {};
  card.$ = document.querySelector('.book-card');
  card.close = card.querySelector('.close');
  card.close.addEventListener('click', function() {
    card.$.removeAttribute('data-shown');
  });
  card.title = card.querySelector('.book-card__title');
  card.authorBlock = card.querySelector('.book-card__author');
  card.author = card.authorBlock.querySelector('.author');
  card.publisherBlock = card.querySelector('.book-card__publisher');
  card.publisher = card.publisherBlock.querySelector('.publisher');
  card.priceBlock = card.querySelector('.book-card__price');
  card.price = card.priceBlock.querySelector('.price');
  card.button = card.querySelector('.book-card__button').querySelector('button');
  card.rating = card.querySelector('.book-card__rating');
};

export default function(data) {
  if (!card) {
    initCard();
  }

  card.title.innerHTML = data.title;
  if (data.author) {
    card.author.textContent = data.author;
    card.authorBlock.style.display = "block";
  }
  else card.authorBlock.style = "none";
  if (data.publisher) {
    card.publisherBlock.style.display = "block";
    card.publisher.textContent = data.publisher;
  }
  
  card.setAttribute('data-shown', '');
}