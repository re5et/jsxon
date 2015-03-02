var jsxon = require('../');

describe('jsxon', function(){

  var result = null;

  describe('simple element with no children', function(){

    beforeEach(function(){
      result = jsxon({
        type: 'div',
        foo: 'bar',
        text: 'element text'
      });
    });

    it('creates the element with its basics', function(){
      expect(result.type).to.eql('div');
      expect(result.props.foo).to.eql('bar');
    });

    it('has text to children', function(){
      expect(result.props.children).to.eql('element text');
    });

  });

  describe('children is a text string', function(){

    beforeEach(function(){
      result = jsxon({
        type: 'div',
        foo: 'bar',
        children: 'element text'
      });
    });

    it('has children string converted to children', function(){
      expect(result.props.children).to.eql('element text');
    });

  });

  describe('element with children', function(){

    beforeEach(function(){
      result = jsxon({
        type: 'div',
        foo: 'bar',
        children: [{
          type: 'ul',
          children: [{
            type: 'li'
          }]
        }]
      });
    });

    it("has a child", function(){
      expect(result.props.children[0].type).to.eql('ul');
    });

    it("has a child and a child of that child", function(){
      expect(result.props.children[0].props.children[0].type).to.eql('li');
    });

  });

  describe('default element specified', function(){

    beforeEach(function(){
      result = jsxon({
        defaultType: 'foo',
        children: [{
          className: 'a',
          children: [{
            className: 'b',
            children: [{
              className: 'c'
            }]
          }]
        }]
      });
    });

    it('uses the default element for the element type of each child', function(){
      expect(result.type).to.eql('foo');
      expect(result.props.children[0].type).to.eql('foo');
      expect(result.props.children[0].props.children[0].type).to.eql('foo');
      expect(result.props.children[0].props.children[0].props.children[0].type).to.eql('foo');
    });

  });

  describe('multiple nested default elements', function(){
    beforeEach(function(){
      result = jsxon({
        defaultType: 'foo',
        type: 'div',
        children: [{
          defaultType: 'bar',
          className: 'a.1',
          children: [{
            defaultType: 'baz',
            className: 'a.2',
            children: [{
              defaultType: 'qux',
              className: 'a.3.1'
            },{
              className: 'a.3.2'
            }]
          }]
        },{
          className: 'b.1',
          defaultType: 'rab',
          children: [{
            defaultType: 'zab',
            className: 'b.2',
            children: [{
              defaultType: 'xuq',
              className: 'b.3',
              children: [{
                className: 'b.4.1'
              },{
                className: 'b.4.2'
              }]
            }]
          }]
        }]
      });
    });

    it('uses the default element for the element type of each child', function(){
      expect(result.type).to.eql('div');
      expect(result.props.children[0].type).to.eql('bar');
      expect(result.props.children[0].props.children[0].type).to.eql('baz');
      expect(result.props.children[0].props.children[0].props.children[0].type).to.eql('qux');
      expect(result.props.children[0].props.children[0].props.children[1].type).to.eql('baz');
      expect(result.props.children[1].type).to.eql('rab');
      expect(result.props.children[1].props.children[0].type).to.eql('zab');
      expect(result.props.children[1].props.children[0].props.children[0].type).to.eql('xuq');
      expect(result.props.children[1].props.children[0].props.children[0].props.children[0].type).to.eql('xuq');
      expect(result.props.children[1].props.children[0].props.children[0].props.children[1].type).to.eql('xuq');
    });

  });

});
