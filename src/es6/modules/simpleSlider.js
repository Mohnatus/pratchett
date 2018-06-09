let slider = {
  inited: false,

  $: null,
  prev: null,
  next: null,
  $slidesContainer: null,

  slides: [],

  viewed: 5,
  center: null,
  leftDiff: null,
  leftLimit: null,

  currentSlide: null,
  currentSlideIndex: null,
  currentLeftIndex: null,

  activeAttr: 'data-active',

  onChange: null,

  reset: false
};

slider.selectors = {
  prev: '[data-prev]',
  next: '[data-next]',
  slides: '[data-slides]',
}

slider.init = function(config) {
  if (this.inited) return;

  this.$ = config.element;
  this.prev = this.$.querySelector(slider.selectors.prev);
  this.next = this.$.querySelector(slider.selectors.next);

  this.prev.addEventListener('click', this.toPrevSlide.bind(this));
  this.next.addEventListener('click', this.toNextSlide.bind(this));

  this.$slidesContainer = this.$.querySelector(slider.selectors.slides);

  this.viewed = config.viewed || this.viewed;
  this.center = config.center || Math.ceil(this.viewed / 2);
  this.leftDiff = this.viewed - this.center;

  this.onChange = config.onChange;

  this.inited = true;
}

slider.update = function() {
  this.slides = [];
  let $slides = Array.prototype.slice.call(this.$slidesContainer.children);
 
  this.handleSlides($slides);
  
  if ($slides.length <= this.viewed) {
    if (!this.reset) this.resetSlider();
    return;
  }
  if (this.reset) this.setSlider();
  this.leftLimit = this.slides.length - this.viewed;
};

slider.handleSlides = function(slides) {
  slides.forEach((slide, index) => {
    slide.setAttribute('data-slide', index);
    slide.addEventListener('click', () => this.handleClick(index));
    this.slides.push({
      $: slide,
      index: index
    });
  });
  this.leftLimit = this.slides.length - this.viewed;
}

slider.setActive = function(index) {
  index = index || 0;
  if (this.currentSlide) {
    this.currentSlide.removeAttribute(this.activeAttr);
  }
  this.currentSlide = this.slides[index].$;
  this.currentSlideIndex = index;
  this.currentSlide.setAttribute(this.activeAttr, '');

  this.setCenterSlide();
};

slider.setCenterSlide = function() {
  if (this.reset) {
    this.currentLeftIndex = 0;
    this.move(0);
    return;
  }
  let sliderLeft = this.$slidesContainer.getBoundingClientRect().left;

  let leftSlide = this.countLeftSlide(this.currentSlideIndex);
  this.currentLeftIndex = leftSlide.index;
  let diff = Math.floor(leftSlide.$.getBoundingClientRect().left - sliderLeft);

  this.move(diff);
};

slider.countLeftSlide = function(centerIndex) {
  if (!centerIndex || centerIndex < 0) centerIndex = 0;

  let leftSlideIndex = 0;

  if (centerIndex > this.leftDiff) leftSlideIndex = centerIndex - this.leftDiff;
  if (leftSlideIndex > this.leftLimit) leftSlideIndex = this.leftLimit;

  let leftSlide = this.slides[leftSlideIndex];
  return leftSlide;
}

slider.move = function(diff) {
  this.$slidesContainer.style.left = (-1 * diff) + 'px';
}

slider.toPrevSlide = function() {
  let index = Math.max(this.currentSlideIndex - 1, 0);
  this.toSlide(index);
};

slider.toNextSlide = function() {
  let index = Math.min(this.currentSlideIndex + 1, this.slides.length - 1);
  this.toSlide(index);
};

slider.toSlide = function(index) {
  this.setActive(index);
  this.onChange(index);
}

slider.handleClick = function(index) {
  this.toSlide(index);
};

slider.resetSlider = function() {
  this.$.setAttribute('data-no-slider', '');
  this.prev = this.$.removeChild(this.prev);
  this.next = this.$.removeChild(this.next);
  this.reset = true;
};

slider.setSlider = function() {
  this.$.removeAttribute('data-no-slider');
  this.$.insertBefore(this.prev, this.$.children[0]);
  this.$.insertBefore(this.next, null);
  this.reset = false;
};

slider.moveOn = function() {
  this.$.setAttribute('data-move', '');
};

slider.moveOff = function() {
  this.$.removeAttribute('data-move');
};












// slider.prototype.toNextSlide = function() {
//   console.log('to next', leftSlide, this.currentLeftIndex, this.leftLimit);
//   this.currentLeftIndex = Math.min(this.currentLeftIndex + 1, this.leftLimit);
  
//   let leftSlide = this.slides[this.currentLeftIndex];
//   console.log(this.currentLeftIndex, leftSlide)
//   this.move(leftSlide.diff);
// };

// slider.prototype.toPrevSlide = function() {

//   let nextIndex = this.currentSlideIndex - 1;
//   if (nextIndex < 0) nextIndex = this.slides.length - 1;
//   this.animate(nextIndex, 'left');
// };


export default slider;