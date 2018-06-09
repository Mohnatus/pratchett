import bookCard from './bookCard.js';
import slider from './simpleSlider.js';

let card = {
  $: null,
  close: null,
  controls: null,

  bookCard: bookCard,
  controlsSlider: slider,
  sets: {},
  currentSet: null,

  showAttr: 'data-shown',
  controlClass: 'pratchett-control'
};

card.init = function(config) {
  this.$ = config.element;
  this.close = this.$.querySelector('[data-close]');

  this.close.addEventListener('click', () => this.hideCard());
  document.addEventListener('click', (e) => {
    if (this.isOpen && !this.$.contains(e.target)) {
      this.hideCard();
    }
  });

  this.$bookCard = this.$.querySelector(config.bookCard);
  this.bookCard.init({
    element: this.$bookCard
  });

  let controls = this.$.querySelector(config.controls);
  
  this.controls = controls.querySelector('[data-slides]');
  this.controlsSlider.init({
    element: controls,
    onChange: (index) => this.controlChange(index)
  });
};

card.update = function(slides, cycle, index) {
  this.controlsSlider.moveOff();
  if (!this.sets[cycle]) {
    this.createSet(slides, cycle);
  }
  this.restoreSet(cycle);
  this.activateElement(cycle, index);
  this.showCard();
  this.controlsSlider.moveOn();
};

card.createSet = function(data, setName) {
  let controlsData = this.createControls(data);

  this.sets[setName] = {
    items: data,
    $controls: controlsData.fragment,
    controls: controlsData.items
  };
};

card.createControls = function(data) {
  let fr = document.createDocumentFragment();
  let items = []; 

  for (let i = 0, count = data.length; i < count; i++) {
    let itemData = data[i];
    let control = this.createControl(itemData.img);
    items.push(control);
    fr.appendChild(control);
  }

  return {
    fragment: fr,
    items: items
  }
};

card.createControl = function(img) {
  let el = document.createElement('div');
  el.classList.add(this.controlClass);
  let $img = `<img src=${img} />`;
  el.innerHTML = $img;
  return el;
};

card.restoreSet = function(setName) {
  this.currentSet = setName;
  let setData = this.sets[setName];
  let clone = setData.$controls.cloneNode(true);
  this.setControls(clone);
};

card.setControls = function(html) {
  this.controls.innerHTML = "";
  this.controls.appendChild(html);
  this.controlsSlider.update();
};

card.controlChange = function(index) {
  this.updateCard(this.currentSet, index);
}

card.activateElement = function(cycle, index) {
  this.updateCard(cycle, index);
  this.controlsSlider.setActive(index);
}

card.updateCard = function(cycle, index) {
  console.log('update', cycle, index)
  let data = this.sets[cycle].items[index];
  this.bookCard.setData(data);
};



card.showCard = function() {
  if (this.isOpen) return;
  this.$.setAttribute(this.showAttr, '');
  this.isOpen = true;
};

card.hideCard = function() {
  if (!this.isOpen) return;
  this.$.removeAttribute(this.showAttr);
  this.isOpen = false;
};

export default card;