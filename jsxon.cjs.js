var defaultElementType = "div";

var jsxon = function(obj, rootElement){
  var props = {};
  for(var prop in obj){
    if(prop != "el" && prop != "children" && prop != "text", prop != "defaultElementType"){
      props[prop] = obj[prop];
    }
  }
  if(obj.defaultElementType){
    elementType = obj.defaultElementType
  }
  else{
    elementType = obj.el || defaultElementType
  }
  var element = React.createElement(elementType, props, obj.text);
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

return jsxon;
