define(['react'], function(React){

  var specialProperties = ['el', 'children', 'text', 'defaultEl'];

  var jsxon = function(obj, defaultEl){

    if(typeof(obj) == "function"){
      return React.createElement(obj);
    }

    defaultEl = defaultEl || "div";

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

    if(obj.defaultEl){
      defaultEl = obj.defaultEl;
    }

    var elementType = obj.el || obj.defaultEl || defaultEl;

    if(obj.text || obj.children){
      var children = obj.text || obj.children.map(function(child){
        return jsxon(child, defaultEl);
      });
    }

    return React.createElement(elementType, props, children);
  };

  return jsxon;

});
