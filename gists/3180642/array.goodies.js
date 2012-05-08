// ES-Discuss Thread: 
// https://mail.mozilla.org/pipermail/es-discuss/2011-July/015831.html

// Based on discussion originating here:
// http://twitter.com/#!/littlecalculist/status/89848378682392576
// http://twitter.com/#!/littlecalculist/status/89855977838485504


// Array.from( arrayish ) [ Unary ]
// Array.from( arrayLike ) converts any array-like object 
// (eg. arguments, NodeList, DOMTokenList) into a new Array() and returns it;

// Implementation

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
// Usage

var divs = document.querySelectorAll("div");

console.log(
    Array.from( divs )
);

// see console

Array.from( divs ).forEach(function( node ) {
    console.log( node );    
});

var filtered = Array.from( divs ).filter(function( node ) {
    return !!node.classList.length;
});

console.log( "filtered", filtered ); 
// filtered [<div class="some classes" data-info="12"></div>]


var reduced = Array.from( divs ).reduce(function( prev, current ) {
    return ( +prev.dataset.info ) + ( +current.dataset.info );
});

console.log( "reduced", reduced ); 
// reduced 22


console.log(
    Array.from( divs[0].classList )
);


var a = Array;

console.log(

    // Now shorter then [].foo.call :)
    a.from( divs )
);


//-------------------------------------------------------------


// Array.of() [ Variable Arity ]
// Array.of provides a constructor that, unlike Array, does not have the special case for new Array(42), 
// which presets length (and hints to implementations to preallocate) but leaves holes in [0, length ).
//
// The use-case is when you can't write a literal, because you are passing a function-that-constructs 
// as a funarg, and the eventual caller _may_ pass only one number arg, or several args. 
// In that case, Array will not do the right thing in the one-number-arg case.
// 
// See also: https://mail.mozilla.org/pipermail/es-discuss/2011-July/015841.html


// Implementation

// Harmony/ES.next rest params
Array.of = function( ...args ) { 
  return args; 
};

// Capable today
Array.of = function() { 
  return Array.prototype.slice.call( arguments ); 
};


// Usage

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


// Other examples:
console.log(
    Array.of( "things", "that", "aren't", "currently", "an", "array" )
);
// ["things", "that", "aren't", "currently", "an", "array"]

console.log(
    Array.of.apply( null, [ "foo", "bar", "baz" ] )
);
// [ "foo", "bar", "baz" ]








