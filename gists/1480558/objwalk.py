"""
http://code.activestate.com/recipes/577982-recursively-walk-python-objects/

A small function that walks over pretty much any Python object and yields the
objects contained within (if any) along with the path to reach them. I wrote it
and am using it to validate a deserialized data-structure, but you can probably
use it for many things.

Example use: In one configuration mechanism I implemented, there exists an
UNCONFIGURED sentinel that marks configuration items that are required but
aren't set. If a loaded configuration has unconfigured items in it, it's
considered invalid. I used objwalk to recursively traverse the configuration
object and possibly raise an exception telling where in the configuration were
unconfigured elements found.

"""

from collections import Mapping, Set, Sequence 

try:
    from six import string_types, iteritems
except ImportError:
    string_types = (str, unicode) if str is bytes else (str, bytes)
    iteritems = lambda mapping: getattr(mapping, 'iteritems', mapping.items)()

def objwalk(obj, path=(), memo=None):
    if memo is None:
        memo = set()
    if isinstance(obj, Mapping):
        if id(obj) not in memo:
            memo.add(id(obj)) 
            for key, value in iteritems(obj):
                for child in objwalk(value, path + (key,), memo):
                    yield child
    elif isinstance(obj, (Sequence, Set)) and not isinstance(obj, string_types):
        if id(obj) not in memo:
            memo.add(id(obj))
            for index, value in enumerate(obj):
                for child in objwalk(value, path + (index,), memo):
                    yield child
    else:
        yield path, obj