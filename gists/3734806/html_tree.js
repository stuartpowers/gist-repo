function htmlTree(obj){
        var obj = obj || document.getElementsByTagName('body')[0];
        var str = "<ul><li>" + obj.tagName;
        if (obj.hasChildNodes()) {
          var child = obj.firstChild;
          while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
              str += htmlTree(child)
            }
            child = child.nextSibling;
          }
        }
        str += "</li></ul>";
        return str;
      }
      document.write(htmlTree());