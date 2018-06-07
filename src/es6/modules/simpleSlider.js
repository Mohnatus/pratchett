let slider = function slider(el, diff) {
  this.$ = el;

  this.prev = this.$.querySelector('[data-left]');
  this.next = this.$.querySelector('[data-right]');

  this.prev.addEventListener('click', this.toPrevSlide.bind(this));
  this.next.addEventListener('click', this.toNextSlide.bind(this));

  this.$slides = this.$.querySelector('[data-slides]');
  this.currentCenterIndex = 0;
  this.currentLeftIndex = 0;

  this.slides = [];

  this.inAnimation = false;

  this.diff = diff || 100;
  this.viewed = 5;
  this.center = 3;
  this.leftDiff = this.viewed - this.center;
  this.leftLimit;

  this.reset = false;
};


slider.prototype.countLeftSlide = function(centerIndex) {
  if (!centerIndex || centerIndex < 0) centerIndex = 0;

  let leftSlideIndex = 0;
  if (centerIndex > this.leftDiff) leftSlideIndex = centerIndex - this.leftDiff;
  if (leftSlideIndex > this.leftLimit) leftSlideIndex = this.leftLimit;

  let leftSlide = this.slides[leftSlideIndex];
  console.log('countleft', centerIndex, leftSlideIndex, leftSlide, this.leftDiff, this.leftLimit)
  return leftSlide;
}

slider.prototype.resetSlider = function() {
  this.left.style.display = "none";
  this.right.style.display = "none";
  this.reset = true;
}

slider.prototype.setSlider = function() {
  this.left.style.display = "block";
  this.right.style.display = "block";
  this.reset = false;
}

slider.prototype.update = function(index) {
  this.slides = [];
  let $slides = Array.prototype.slice.call(this.$slides.children);
 
  if ($slides.length <= this.viewed) {
    if (!this.reset) this.resetSlider();
    return;
  }
  if (this.reset) this.setSlider();

  
  let sliderLeft = this.$slides.getBoundingClientRect().left;

  $slides.forEach(($slide, index) => {
    $slide.setAttribute('data-slide', index);
    this.slides.push({
      $: $slide,
      index: index,
      diff: $slide.getBoundingClientRect().left - sliderLeft
    });
  });
  this.leftLimit = this.slides.length - this.viewed;
  index = index || 0;
  this.setActiveSlide(index);
};

slider.prototype.setActiveSlide = function(index) {
  index = index || 0;
  this.currentCenterIndex = index;
  let leftSlide = this.countLeftSlide(index);
  this.currentLeftIndex = leftSlide.index;
  this.move(leftSlide.diff);
}

slider.prototype.move = function(diff) {
  this.$slides.style.left = (-1 * diff) + 'px';
}

slider.prototype.toNextSlide = function() {
  console.log('to next', leftSlide, this.currentLeftIndex, this.leftLimit);
  this.currentLeftIndex = Math.min(this.currentLeftIndex + 1, this.leftLimit);
  
  let leftSlide = this.slides[this.currentLeftIndex];
  console.log(this.currentLeftIndex, leftSlide)
  this.move(leftSlide.diff);
};

slider.prototype.toPrevSlide = function() {

  let nextIndex = this.currentSlideIndex - 1;
  if (nextIndex < 0) nextIndex = this.slides.length - 1;
  this.animate(nextIndex, 'left');
};


export default slider;