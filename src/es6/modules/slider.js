let XSlider = function(config) {
  try {
    this.$ = config.element;
    this.createCustomSlide = config.createSlide;
    this.currentSlide;
    this.currentSlideIndex;
    this.animationDuration = config.animationDuration || 700;
    this.inAnimation = false;
    this.sets = {};
    this.currentSet;

    this.close = this.$.querySelector("." + XSlider.classes.close);
    if (this.close) {
      this.close.addEventListener('click', () => {
        this.hide();
      })
    }

    this.$viewport = this.$.querySelector("." + XSlider.classes.viewport);

    this.slides = Array.prototype.slice.call(this.$viewport.querySelectorAll('.' + XSlider.classes.slide));

    this.controls = [];
    this.$controls = this.$.querySelector('.' + XSlider.classes.controls);

    this.slides.forEach((slide, index) => {
      this.initSlide(slide, index);
    });

    this.$prevSlide = this.$.querySelector("." + XSlider.classes.leftArrow);
    this.$nextSlide = this.$.querySelector("." + XSlider.classes.rightArrow);

    this.$prevSlide.addEventListener('click', ()=> {
      this.toPrevSlide();
    })

    this.$nextSlide.addEventListener('click', ()=> {
      this.toNextSlide();
    })

    this.setActiveSlide(0);
  } catch(e) {
    return {
      error: true
    }
  }
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
  "close": XSlider.mainClass + "__close"
};

XSlider.attrs = {
  "sliderName": "data-slider",
  "active": "data-active",
  "index": "data-index"
};

XSlider.prototype.initSlide = function($slide, index) {
  $slide.setAttribute(XSlider.attrs.index, index);
  this.slides.push($slide);
  this.createControl(index);
};

XSlider.prototype.createSlide = function(slideData) {
  let slide = this.createCustomSlide(slideData, slide);
  slide.classList.add(XSlider.classes.slide);
  return slide;
};

XSlider.prototype.addSlides = function(slides, setName) {
  console.log('add', slides)
  if (!slides || !slides.length) return;
  let fragment = document.createDocumentFragment();
  for (let i = 0, count = slides.length; i < count; i++) {
    let slide = this.createSlide(slides[i]);
    this.initSlide(slide, i);
    fragment.appendChild(slide);
  }
  this.$viewport.appendChild(fragment);
  if (!this.currentSlide) this.setActiveSlide(0);
};

XSlider.prototype.saveSet = function(setName) {
  console.log('save set', setName);
  let set = {};
  set.slides = this.slides;
  set.controls = this.controls;
  this.sets[setName] = set;
  console.log(this.sets);
}

XSlider.prototype.restoreSet = function(setName) {
  console.log('restore', setName);
  let viewportFragment = document.createDocumentFragment();
  let controlFragment = document.createDocumentFragment();
  let set = this.sets[setName];
  for (let i = 0, count = set.slides.length; i < count; i++) {
    let slide = set.slides[i];
    viewportFragment.appendChild(slide);
    let control = set.controls[i];
    controlFragment.appendChild(control);
  }
  this.slides = set.slides;
  this.controls = set.controls;
  this.$viewport.appendChild(viewportFragment);
  this.$controls.appendChild(controlFragment);
  if (!this.currentSlide) this.setActiveSlide(0);
}

XSlider.prototype.update = function(slides, setName) {
  console.log('update', slides, setName, this.currentSet)
  if (this.currentSet == setName) return;
  this.currentSet = setName;
  this.clean();
  if (this.sets[setName]) this.restoreSet(setName);
  else {
    this.addSlides(slides);
    this.saveSet(setName);
  }
};

XSlider.prototype.clean = function(setName) {
  if (setName && !this.sets[setName]) {
    
  }
  this.slides = [];
  this.controls = [];
  this.$viewport.innerHTML = '';
  this.$controls.innerHTML = '';
  this.currentSlide = null;
  this.currentSlideIndex = 0;
  this.currentControl = null;
};

XSlider.prototype.createControl = function(index) {
  let control = document.createElement('div');
  control.classList.add(XSlider.classes.control);
  control.textContent = "X";
  control.setAttribute(XSlider.attrs.index, index);

  control.addEventListener('click', ()=> {
    this.toSlide(index);
  });

  this.controls.push(control);
  this.$controls.appendChild(control);
};

XSlider.prototype.setActiveSlide = function(index) {
  if (this.slides.length == 0) return;
  if (this.slides.length <= index) index = 0;
  if (this.currentSlide) {
    this.currentSlide.removeAttribute(XSlider.attrs.active);
    this.currentControl.removeAttribute(XSlider.attrs.active);
  }
  this.currentSlideIndex = index || 0;
  this.currentSlide = this.slides[this.currentSlideIndex];
  this.currentSlide.setAttribute(XSlider.attrs.active, ''); 
  this.currentControl = this.controls[this.currentSlideIndex];
  this.currentControl.setAttribute(XSlider.attrs.active, ''); 
};

XSlider.prototype.animate = function(nextIndex, dir) {
  if (this.inAnimation) return;

  let nextStart = '100%';
  let prevFinish = '-100%';
  if (dir == "left") {
    nextStart = '-100%';
    prevFinish = '100%';
  }

  let nextSlide = this.slides[nextIndex];
  nextSlide.setAttribute(XSlider.attrs.active, '');
  let nextControl = this.controls[nextIndex];

  this.inAnimation = true;

  anime.timeline({
    begin: () => {
      this.currentControl.removeAttribute(XSlider.attrs.active);
      nextControl.setAttribute(XSlider.attrs.active, '');
    },
    complete: () => {
      this.currentSlide.removeAttribute(XSlider.attrs.active);
  
      this.currentSlide.style.left = "0";
      this.currentSlideIndex = nextIndex;
      this.currentSlide = nextSlide;
      this.currentControl = nextControl;
      this.inAnimation = false;
    }
  })
  .add({
    targets: nextSlide,
    left: [
      { value: nextStart, duration: 0 },
      { value: '0%', duration: 1200, easing: 'linear' }
    ],
    offset: 0
  })
  .add({
    targets: this.currentSlide,
    left: {
      value: prevFinish, duration: 1200, easing: 'linear'
    },
    offset: 0
  })
}

XSlider.prototype.toSlide = function(index) {
  if (
    this.currentSlideIndex == index 
    || index < 0 
    || index >= this.slides.length
  ) return;

  let dir = "left";
  if (this.currentSlideIndex - index < 0) dir = "right";

  this.animate(index, dir);
};

XSlider.prototype.toNextSlide = function() {
  let nextIndex = this.currentSlideIndex + 1;
  if (nextIndex >= this.slides.length) nextIndex = 0;

  this.animate(nextIndex, 'right');
}

XSlider.prototype.toPrevSlide = function() {
  let nextIndex = this.currentSlideIndex - 1;
  if (nextIndex < 0) nextIndex = this.slides.length - 1;

  this.animate(nextIndex, 'left');
}

XSlider.prototype.hide = function() {
  this.$.style.display = "none";
}

XSlider.prototype.show = function() {
  if (this.slides.length == 0) return;
  this.$.style.display = "block";
}

export default XSlider;