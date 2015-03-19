# jsxon

jsx is annoying.  I made this because I prefer to do things with
js, and React.createElement is too much of a hassle.

# what this lets you do:

* just use js
* no compile step
* no hoop jumping to get your text editor to play nice (it is just js)
* you only have to call jsxon once, when you are ready to render.
  Your entire application could have a single jsxon call if you
  wanted. You can split up your logic and build up the object you pass
  in however you want.

# example

```javascript
return jsxon({
    el: 'ul',
    defaultElement: 'li'
    children: [0,1,2,3,4].map(function(i){
        return {
            text: i
            key: "item-"+i
        }
    })
});
```

is equivalent to this jsx:

```jsx
var listItems = function(){
  return [0,1,2,3,4].map(function(i){
    return <li key="item-{i}">{i}</li>
  })
}

return (<ul>
  {listtItems()}
</ul>)
```

# All keys are passed on to react except the following special keys:

* el: the element type to use (div / ul / li / etc)
* text: key to specify text for element (instead of children)
* children: key to specify the child nodes of an element
* defaultType: set the default type of element to use for type
  (hierachical), see: defaultType

# things this does that jsx doesn't do for you)

* defaultType

You can set the default element for "here on down".  See the example
of lists of lists:

```javascript
var lists = ['fooList', 'barList', 'bazList'];
var items = [0,1,2,3];

return jsxon({
  el: 'ol',
  defaultElement: 'li',
  children: lists.sort.map(function(list){
    return {
            el: 'ul'
      children: items.map(function(item){
                return {
                    defaultElement: 'span'
                    children: [{
                        text: list
                    },{
                        text: ' item: '
                    },{
                        text: item
                    }]
                }
            })
    }
  })
});
```

is equivalent to this jsx:

```jsx
return (<ol>
    <li>
        <ul>
            <li>
                <span>barList</span>
                <span> item: </span>
                <span>0</span>
            </li>
            <li>
                <span>barList</span>
                <span> item: </span>
                <span>1</span>
            </li>
            <li>
                <span>barList</span>
                <span> item: </span>
                <span>2</span>
            </li>
            <li>
                <span>barList</span>
                <span> item: </span>
                <span>3</span>
            </li>
        </ul>
    </li>
    <li>
        <ul>
            <li>
                <span>bazList</span>
                <span> item: </span>
                <span>0</span>
            </li>
            <li>
                <span>bazList</span>
                <span> item: </span>
                <span>1</span>
            </li>
            <li>
                <span>bazList</span>
                <span> item: </span>
                <span>2</span>
            </li>
            <li>
                <span>bazList</span>
                <span> item: </span>
                <span>3</span>
            </li>
        </ul>
    </li>
    <li>
        <ul>
            <li>
                <span>fooList</span>
                <span> item: </span>
                <span>0</span>
            </li>
            <li>
                <span>fooList</span>
                <span> item: </span>
                <span>1</span>
            </li>
            <li>
                <span>fooList</span>
                <span> item: </span>
                <span>2</span>
            </li>
            <li>
                <span>fooList</span>
                <span> item: </span>
                <span>3</span>
            </li>
        </ul>
    </li>
</ol>)
```

* className

You can optionally use an array to specify className, it will be
joined for you.  This can be handy, for stuff like:

```javascript
classNames = [];

if(showTheThing()){
  classNames.push('show');
}
else{
  classNames.push('hide');
}

return jsxon({
  id: 'foo',
  className: classNames
});
```
