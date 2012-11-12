// changed the functions from .keys() -> ._keys(), likewise for .values()
// because .keys()/.values() breaks jQuery

Object.prototype._keys = function (i) {
    var keys = Object.keys(this);
    return (i >= 0) ? keys[i] : keys;
};

Object.prototype._values = function (i) {
    var self = this;
    var values = Object.keys(this).map(function(key){
        return self[key];
    });
    return (i >= 0) ? values[i] : values;
};