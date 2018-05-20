//let data = {};
let turtle = document.querySelector('.turtle');
let scheme = document.querySelector('.pratchett-scheme');
let data = {};
let errorCode = -1;

let currentLabel;

let showLabel = function(cycle, index) {
  hideLabel();
  if (!data[cycle]) data[cycle] = {};
  if (!data[cycle][index]) {
    let element = scheme.querySelector(`.book[data-cycle="${cycle}"][data-index="${index}"]`);
    data[cycle][index] = element ? element.cloneNode(true) : errorCode;
  }
  if (data[cycle][index] == errorCode) return;
  currentLabel = data[cycle][index];
  turtle.appendChild(currentLabel);
};

let hideLabel = function() {
  if (!currentLabel) return;
  turtle.removeChild(currentLabel);
  currentLabel = null;
};

export default {
  show: showLabel,
  hide: hideLabel
};



