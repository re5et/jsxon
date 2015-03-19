var React = require('react');

var specialProperties = ['el', 'children', 'text', 'defaultType'];

var jsxon = function(obj, defaultType){

  defaultType = defaultType || "div";

  if(obj.className && obj.className.join){
    obj.className = obj.className.join(' ');
  }

  var props = {};

  for(var prop in obj){
    if(specialProperties.indexOf(prop) == -1){
      props[prop] = obj[prop];
    }
  }

  if(typeof(obj.children) == "string"){
    obj.text = obj.children;
    delete obj.children;
  }

  if(obj.defaultType){
    defaultType = obj.defaultType;
  }

  var elementType = obj.el || obj.defaultType || defaultType;

  if(obj.text || obj.children){
    var children = obj.text || obj.children.map(function(child){
      return jsxon(child, defaultType);
    });
  }

  return React.createElement(elementType, props, children);
};

module.exports = jsxon;
