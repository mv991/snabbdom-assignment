const { h,  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule, } =  require('snabbdom');

const patch = init([
  classModule, 
  propsModule, 
  styleModule, 
  eventListenersModule 
]);
let count =1;
const container = document.getElementById('app');

// Generic function to craete nodes
function MyComponent(tag,props,value) {
    return h(tag,props,value);
    }

 // function to update vNode 
function updateState(tag,props,newValue) {
   const newNode = h(tag,props,newValue);
   patch(vnode1,newNode);
   
}


// function to handle Button Click and update h1 text
function clickHandler() {
    // calling updateState
   updateState("h1#heading",{   hook: {
        update: () => {
            console.log("component updated");
        }
    }},count++)
}
// defining Heading component
const vnode1 = MyComponent("h1#heading", {
    hook: {
        update: () => {
            console.log("component updated");
        }
    }
}, "0");

// defining button 
const vnode2 = MyComponent("button#btn",{on:{click:clickHandler},hook:{update:() => {console.log("updated")}}},"Add");

// Div our root element. Adding insert to watch for it being Mounted
const vnode = h("div",{  hook: {
        insert: () => {
            console.log("component mounted");
        }
    }},[vnode1,vnode2])

    //Patch used to replace old vNode with new vnode 
patch(container, vnode);