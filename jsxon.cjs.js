var React = require('react');


var jsxon = function(obj, defaultType){

  var props = {};
  defaultType = defaultType || "div";

  for(var prop in obj){
    if(prop != "type" && prop != "children" && prop != "text", prop != "defaultType"){
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

  var element = React.createElement(elementType, props, obj.text);

  if(obj.children){
    element.props.children = obj.children.map(function(child){
      return jsxon(child, defaultType);
    });
    return element;
  } else {
    return element;
  }
};

module.exports = jsxon;
