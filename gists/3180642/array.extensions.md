# Array.from() & Array.of()

Original discussion began on Twitter and can be found by starting 
[here](http://twitter.com/#!/littlecalculist/status/89848378682392576) and 
[here](http://twitter.com/#!/littlecalculist/status/89855977838485504). Discussion was continued on **es-discuss** mailing list in the thread [Pure win: Array.from and Array.of](https://mail.mozilla.org/pipermail/es-discuss/2011-July/015831.html)

_Update Nov. 3, 2011_ 

Official strawman has been posted: http://wiki.ecmascript.org/doku.php?id=strawman:array_extras


# Array.from( arg ) [ Unary ]

Converts a single argument that is an array-like object or list (eg. arguments, NodeList, DOMTokenList (used by classList), NamedNodeMap (used by attributes property)) into a new Array() and returns it;

<ol>
<li>Let <em>O</em> be the result of calling <strong>ToObject(</strong> <em>arg</em> <strong>)</strong>.</li>
<li>Let <em>lenValue</em> be the result of calling the [[Get]] internal method of <em>O</em> with the argument "length".</li>
<li>Let <em>len</em> be <strong>ToUint32(</strong> <em>lenValue</em> <strong>)</strong>.</li>
<li>Let <em>A</em> be a new array created as if by the expression <strong>new Array()</strong> where <strong>Array</strong> is the standard built-in constructor with that name.</li>
<li>Let <em>k</em> be 0. </li>
<li>Repeat, while <em>k</em> &lt; <em>len</em>

<ol>
<li>Let <em>Pk</em> be <strong>ToString(</strong> <em>k</em> <strong>)</strong>.</li>
<li>Let <em>kPresent</em> be the result of calling the [[HasProperty]] internal method of <em>O</em> with argument <em>Pk</em>.</li>
<li>If <em>kPresent</em> is <strong>true</strong>, then

<ol>
<li>Let <em>kValue</em> be the result of calling the [[Get]] internal method of <em>O</em> with argument <em>Pk</em>.</li>
<li>Call the [[DefineOwnProperty]] internal method of <em>A</em> with arguments <strong>ToString(</strong> <em>k</em> <strong>)</strong>, Property Descriptor {[[Value]]: kValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.</li>
</ol>
</li>

<li>Increase <em>k</em> by 1.</li>
</ol>
</li>
<li>return <em>A</em>.</li>
</ol>



<!--
1. Let _O_ be the result of calling **ToObject(** _arg_ **)**.
2. Let _lenValue_ be the result of calling the [[Get]] internal method of _O_ with the argument "length".
3. Let _len_ be **ToUint32(** _lenValue_ **)**.
4. Let _A_ be a new array created as if by the expression **new Array()** where **Array** is the standard built-in constructor with that name.
5. Let _k_ be 0. 
6. Repeat, while _k_ < _len_
 
  a. Let _Pk_ be **ToString(** _k_ **)**.
  b. Let _kPresent_ be the result of calling the [[HasProperty]] internal method of _O_ with argument _Pk_.
  c. If _kPresent_ is **true**, then
  
     * Let _kValue_ be the result of calling the [[Get]] internal method of _O_ with argument _Pk_.
     * Call the [[DefineOwnProperty]] internal method of _A_ with arguments **ToString(** _k_ **)**, Property Descriptor {[[Value]]: kValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.

  d. Increase _k_ by 1.

7. return _A_.
-->

## Implementation (Conceptual)

``` javascript
Array.from = function( arg ) {

  var O = Object( arg );
  var len = O.length >>> 0;
  var A = new Array();
  var k = 0;

  while( k < len ) {

    var kValue;

    if ( k in O ) {
      kValue = O[ k ];

      A[ k ] = kValue;
    }

    k++;
  }

  return A;
};
```

## Usage

The following use cases are based on the markup in the the attached file `domjunk.html`.

``` javascript

var divs = document.querySelectorAll("div");

Array.from( divs );
// [ <div class=​"some classes" data-info=​"12">​</div>​, <div data-info=​"10">​</div>​ ]


Array.from( divs ).forEach(function( node ) {
    console.log( node );    
});
// <div class=​"some classes" data-info=​"12">​</div>​
// <div data-info=​"10">​</div>​


Array.from( divs ).filter(function( node ) {
    return !!node.classList.length;
});
// [ <div class="some classes" data-info="12"></div> ]


Array.from( divs ).reduce(function( prev, current ) {
    return ( +prev.dataset.info ) + ( +current.dataset.info );
});
// 22


Array.from( divs[0].classList )
// ["some", "classes"]


// Now shorter then [].foo.call :)
var a = Array;


a.from( divs );
// [ <div class=​"some classes" data-info=​"12">​</div>​, <div data-info=​"10">​</div>​ ]

```


# Array.of() [ Variable Arity ]

Array.of provides a constructor that, unlike Array, does not have the special case for new Array(42), which presets length (and hints to implementations to preallocate) but leaves holes in [0, length ).

The use-case is when you can't write a literal, because you are passing a function-that-constructs as a funarg, and the eventual caller _may_ pass only one number arg, or several args. In that case, Array will not do the right thing in the one-number-arg case. (Explanation by Brendan Eich)[https://mail.mozilla.org/pipermail/es-discuss/2011-July/015841.html]


## Implementation (Conceptual)

``` javascript

// Harmony/ES.next rest params
Array.of = function( ...args ) { 
  return args; 
};

// Capable today
Array.of = function() { 
  return Array.prototype.slice.call( arguments ); 
};

```

## Usage

``` javascript


Array.of( 10 );
// [ 10 ]

// Versus the existing behaviour of new Array():

new Array( 10 );
// [ , , , , , , , , , , ]

// Makes sense when you can't use a literal, such this case...
// ES.next http://wiki.ecmascript.org/doku.php?id=harmony:rest_parameters
var o = (function( ArrayCtor, ...rest ) {
  return ArrayCtor( rest );
})( Array, 10 );


// Many args...
Array.of( "things", "that", "aren't", "currently", "an", "array" );

// [ "things", "that", "aren't", "currently", "an", "array" ]






