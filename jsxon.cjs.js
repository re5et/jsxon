var React = require('react');

var jsxon = function(obj, rootElement){
  var props = {};
  for(var prop in obj){
    if(prop != "el" && prop != "children" && prop != "text"){
      props[prop] = obj[prop];
    }
  }
  var element = React.createElement(obj.el, props, obj.text);
  if(!rootElement){
    rootElement = element;
  }
  if(obj.children){
    element.props.children = obj.children.map(function(child){
      return jsxon(child, rootElement);
    });
    return element;
  } else {
    return element;
  }
};

module.exports = jsxon;
