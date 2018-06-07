let slider = function (config) {
  this.$ = config.element;
  this.$slides = this.$.querySelector('[data-slides]');

  this.onChange = config.onChange;

  this.sets = {};
  this.currentSet;

  this.prev = this.$.querySelector('[data-prev]');
  this.next = this.$.querySelector('[data-next]');
  
  this.prev.addEventListener('click', this.toPrevSlide.bind(this));
  this.next.addEventListener('click', this.toNextSlide.bind(this));

  this.visibleCount = config.visibleCount;
  this.mainPosition = config.mainPosition;
};

slider.prototype.toPrevSlide = function() {

};
slider.prototype.toNextSlide = function() {

};

slider.prototype.update = function() {
  this.slides = Array.prototype.slice.call(this.$slides.children);
};

slider.prototype.setActiveSlide = function(index) {

};

slider.prototype.setCenterSlide = function() {

};



export default slider;

