import bookCard from './bookCard.js';
import slider from './simpleSlider.js';

let card = {
  $: null,
  close: null,
  controls: null,
  seria: null,

  bookCard: bookCard,
  controlsSlider: slider,
  sets: {},
  currentSet: null,

  tagText: '',

  showAttr: 'data-shown',
  controlClass: 'pratchett-control',
  controlBookAttr: 'view',
  controlVarAttr: 'var'
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

  this.seria = this.$.querySelector(config.seria);
  this.tagText = config.tagText || this.tagText;

  let controls = this.$.querySelector(config.controls);
  
  this.controls = controls.querySelector('[data-slides]');
  this.controlsSlider.init({
    viewed: 4,
    center: 1,
    element: controls,
    onChange: (data) => this.controlChange(data),
    attr: this.controlBookAttr
  });
};

card.update = function(data) {
  this.setSeria(data.cycleName);
  this.$.setAttribute('data-cycle', data.cycle);
  this.controlsSlider.moveOff();
  if (!this.sets[data.cycle]) {
    this.createSet(data.slides, data.cycle);
  }
  this.restoreSet(data.cycle);
  this.activateElement(data.cycle, data.index, 0);
  this.showCard();
  this.controlsSlider.moveOn();
};

card.setSeria = function(seria) {
  if (seria) this.$.setAttribute('data-seria', seria);
  else this.$.removeAttribute('data-seria');
  this.seria.textContent = seria ? `цикла «${seria}»` : "Терри Пратчетта";
}

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

  console.log('controls', data);

  for (let i = 0, count = data.length; i < count; i++) {
    let els = data[i];
    els.forEach((el, ind) => {
      let control = this.createControl(el, i, ind);
      items.push(control);
      fr.appendChild(control);
    })
  }

  return {
    fragment: fr,
    items: items
  }
};

card.createControl = function(data, i, ind) {
  let el = document.createElement('div');
  el.classList.add(this.controlClass);
  el.setAttribute("data-" + this.controlBookAttr, i);
  el.setAttribute("data-" + this.controlVarAttr, ind);
  let img = document.createElement('div');
  img.classList.add(this.controlClass + '__img');
  img.innerHTML = `<img src=${data.img}><div class="tag" data-index data-cycle-bg>${this.tagText}</div>`;
  let title = document.createElement('div');
  title.innerHTML = data.title;
  title.classList.add(this.controlClass + '__title');
  el.appendChild(img);
  el.appendChild(title);
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

card.controlChange = function(data) {
  console.log('card', data)
  this.updateCard(this.currentSet, data[this.controlBookAttr], data[this.controlVarAttr]);
}

card.activateElement = function(cycle, index, book) {
  this.updateCard(cycle, index, book);
  this.controlsSlider.setActive(index, this.controlAttr);
}

card.updateCard = function(cycle, index, book) {
  console.log('update card', index, book)
  book = book || 0;
  let data = this.sets[cycle].items[index][book];
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