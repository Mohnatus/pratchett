let XSlider = function(config) {
  this.$ = config.element;
  this.createCustomSlide = config.createSlide;
  this.currentSlide = 0;
  this.slides = Array.prototype.slice.call(this.$.querySelectorAll('.' + XSlider.classes.slide));

  this.controls = [];
  this.$controls = this.$.querySelector('.' + XSlider.classes.controls);

  this.slides.forEach((slide, index) => {
    slide.setAttribute(XSlider.attrs.index, index);
    this.createControl(index);
  })
}

XSlider.mainClass = "x-slider";

XSlider.classes = {
  "slider": XSlider.mainClass,
  "leftArrow": XSlider.mainClass + "__left",
  "rightArrow": XSlider.mainClass + "__right",
  "viewport": XSlider.mainClass + "__viewport",
  "slide": XSlider.mainClass + "__slide",
  "controls": XSlider.mainClass + "__controls",
  "control": XSlider.mainClass + "__control",
};

XSlider.attrs = {
  "sliderName": "data-slider",
  "active": "data-active",
  "index": "data-index"
};

XSlider.prototype.addSlides = function(slides) {
  for (let i = 0, count = slides.length; i < count; i++) {
    let slide = this.createSlide(slides[i]);
  }
};

XSlider.prototype.createSlide = function(slideData) {
  let slide = this.createCustomSlide(slideData, slide);
  slide.classList.add(XSlider.classes.slide);
  return slide;
};

XSlider.prototype.createControl = function() {
  let control = document.createElement('div');
  control.classList.add(XSlider.classes.control);
  control.textContent = "X";
  return control;

  control.setAttribute(XSlider.attrs.index, index);
    this.controls.push(control);
    this.$controls.appendChild(control);
}

XSlider.prototype.setActiveSlide = function(index) {

}

export default XSlider;