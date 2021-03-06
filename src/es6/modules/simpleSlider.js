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
  slideAttr: 'data-slide',
  mainAttr: '',

  onChange: null,

  reset: false,
  hideNext: false,
  hidePrev: false
};

slider.selectors = {
  prev: '[data-prev]',
  next: '[data-next]',
  slides: '[data-slides]'
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
  this.center = config.center;
  this.leftDiff = this.center - 1;
  
  this.mainAttr = config.attr;

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
    slide.setAttribute(this.slideAttr, index);
    slide.querySelector('[data-index]').setAttribute('data-index', index + 1);
    slide.addEventListener('click', () => this.handleClick(index));
    let attr = slide.dataset;
    console.log(attr)
    this.slides.push({
      $: slide,
      index: index,
      data: attr
    });

  });
  this.leftLimit = this.slides.length - this.viewed;
}

slider.setActive = function(index, attr) {
  index = index || 0;
  if (this.currentSlide) {
    this.currentSlide.removeAttribute(this.activeAttr);
  }

  let slide;

  if (attr) {
    let $slide = this.$slidesContainer.querySelector(`[data-${attr}="${index}"]`);
    console.log($slide)
    slide = this.slides[$slide.getAttribute(this.slideAttr)].$;
  } else {
    slide = this.slides[index].$;
  }

  this.currentSlide = slide;
  this.currentSlideIndex = index;

  this.currentSlide.setAttribute(this.activeAttr, '');

  this.setCenterSlide();
  this.handleControls();
};

slider.handleControls = function() {
  if (this.currentSlideIndex == 0) this.hidePrevControl();
  else if (this.hidePrev) this.showPrevControl();

  if (this.currentSlideIndex == this.slides.length - 1) this.hideNextControl();
  else if (this.hideNext) this.showNextControl();
}

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

  let leftSlideIndex = this.isCenter ? 0 : centerIndex;

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
  console.log(this.slides[index])
  this.setActive(index);
  this.onChange(this.slides[index].data);
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

slider.hidePrevControl = function() {
  //this.prev.style.visibility = "hidden";
  this.prev.setAttribute('data-inactive', '');
  this.hidePrev = true;
};

slider.hideNextControl = function() {
  //this.next.style.visibility = "hidden";
  this.next.setAttribute('data-inactive', '');
  this.hideNext = true;
};

slider.showPrevControl = function() {
  //this.prev.style.visibility = "visible";
  this.prev.removeAttribute('data-inactive');
  this.hidePrev = false;
};

slider.showNextControl = function() {
  //this.next.style.visibility = "visible";
  this.next.removeAttribute('data-inactive');
  this.hideNext = false;
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

export default slider;