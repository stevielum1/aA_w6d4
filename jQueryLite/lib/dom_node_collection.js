class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }
  html(str){
    if (str){
      this.elements.forEach(el=>{
        el.innerHTML = str;
      });
    } else {
      if (this.elements[0] === undefined) {
        return undefined;
      } else {
        return this.elements[0].innerHTML;
      }
    }
  }
  empty(){
    this.elements.forEach(el => {
      el.innerHTML = "";
    });
  }
  append(arg){
    this.elements.forEach(el=>{
      if(arg instanceof HTMLElement){
        el.innerHTML += arg.outerHTML;
      } else if (arg instanceof DOMNodeCollection) {
        arg.elements.forEach(el2 => {
          el.innerHTML += el2.outerHTML;
        });
      } else {
        el.innerHTML += arg;
      }
    });
  }
  attr(name, value) {
    if (value) {
      this.elements.forEach(el => {
        el.setAttribute(name, value);
      });
    } else {
      this.elements.map(el => {
        el.getAttribute(name);
      });
    }
  }
  addClass(...names) {
    this.elements.forEach(el => {
      el.classList.add(...names);
    });
  }
  removeClass(...names) {
    this.elements.forEach(el => {
      el.classList.remove(...names);
    });
  }
  children() {
    let result = [];
    this.elements.forEach(el => {
      result = result.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(result);
  }
  parent(){
    let result = [];
    this.elements.forEach(el => {
      result = result.concat([el.parentElement]);
    });
    return new DOMNodeCollection(result);
  }
  find(selector){
    let result = [];
    this.elements.forEach(el => {
      result = result.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(result);
  }
  remove(selector){
    if (selector) {
      this.find(selector).elements.forEach(el => {
        // if (this.children().elements.includes(el)) {
        //   //find the element that matches the selector and remove its html
        //   // const elToRemoveIdx = this.children().elements.indexOf(el);
        //   // const elToRemove = this.children().elements[elToRemoveIdx];
        //   elToRemove.innerHTML = "";
        // }
        el.outerHTML = "";
      });
    } else {
      this.empty();
      while(this.elements.length > 0) {
        this.elements.pop();
      }
    }
  }
  on(action, callback){
    this.elements.forEach(el=>{
      el.addEventListener(action, callback);
      el.eventListenerAttr = el.eventListenerAttr || {};
      el.eventListenerAttr[action] = el.eventListenerAttr[action] || callback;
    });
  }
  off(action){
    this.elements.forEach(el=>{
      let callback = el.eventListenerAttr[action];
      el.removeEventListener(action, callback);
    });
  }
}

module.exports = DOMNodeCollection;
