function(key, values, rereduce) {
      Array.prototype.unique = function() {
        var a = [];
        var l = this.length;
        for(var i=0; i<l; i++) {
          for(var j=i+1; j<l; j++) {
            // If this[i] is found later in the array
            if (this[i] === this[j])
              j = ++i;
          }
          a.push(this[i]);
        }
        return a;
      }

      if (rereduce) {
        result = new Array();
        for (var i = 0; i < values.length; i++) {
          result = result.concat(values[i]);
        }
        return result.unique();
      } else {
        var manufacturers = {};
        for(i = 0; i < values.length; i++) {
          if (!manufacturers[key[i][0]]) {
            manufacturers[key[i][0]] = new Array();
          }
          manufacturers[key[i][0]].push(values[i]);
        }
        result = new Array();
        for (var manufacturer in manufacturers) {
          result = result.concat(manufacturers[manufacturer]).unique();
        }
        return result;
      }
    }