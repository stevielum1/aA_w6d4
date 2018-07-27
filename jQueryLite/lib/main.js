const DOMNodeCollection = require("./dom_node_collection.js");

//this is simulating the jQuery's selector style and rapper style
function $l(arg){
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(Array.from(arg));
  } else if (arg instanceof Function) {
    // eventArray.push(arg);
    // while(document.readyState !== 'complete'){
    console.log(document.readyState, "readyState");
    // eventArray.forEach(el=>{
    //   el();
    // });
    if(!window.eventList) {
      window.eventList = [];
    }
    window.eventList.push(arg);

    document.onreadystatechange = function () {
      if (document.readyState !== 'complete'){
        window.eventList.forEach(el=>{
          el();
        });
      }
    };
  }
  else {
    const elementList = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.from(elementList));
  }
}

window.$l = $l;
