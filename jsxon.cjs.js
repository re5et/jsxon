var React = require('react');

var specialProperties = ['type', 'children', 'text', 'defaultType'];

var jsxon = function(obj, defaultType){

  defaultType = defaultType || "div";

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

  var elementType = obj.type || obj.defaultType || defaultType;

  if(obj.text || obj.children){
    var children = obj.text || obj.children.map(function(child){
      return jsxon(child, defaultType);
    });
  }

  return React.createElement(elementType, props, children);
};

module.exports = jsxon;
