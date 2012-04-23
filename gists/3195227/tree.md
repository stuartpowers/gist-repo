# One-line Tree in Python

Using Python's built-in [defaultdict](http://docs.python.org/library/collections.html#collections.defaultdict) we can easily define a tree data structure:

```python
def tree(): return defaultdict(tree)
```

That's it!

It simply says that a tree is a dict whose default values are trees.

(If you're following along at home, make sure to `from collections import defaultdict`)

(Also: Hacker News reader @zbuc points out that this is called [autovivification](https://en.wikipedia.org/wiki/Autovivification). Cool!)

## Examples
### JSON-esque
Now we can create JSON-esque nested dictionaries without explicitly creating sub-dictionaries—they magically come into existence as we reference them:

```python
users = tree()
users['harold']['username'] = 'hrldcpr'
users['handler']['username'] = 'matthandlersux'
```

We can print this as json with `print(json.dumps(users))` and we get the expected:

```python
{"harold": {"username": "hrldcpr"}, "handler": {"username": "matthandlersux"}}
```

### Without assignment
We can even create structure with no assignment at all:

```python
taxonomy = tree()
taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Felidae']['Felis']['cat']
taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Felidae']['Panthera']['lion']
taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Canidae']['Canis']['dog']
taxonomy['Animalia']['Chordata']['Mammalia']['Carnivora']['Canidae']['Canis']['coyote']
taxonomy['Plantae']['Solanales']['Solanaceae']['Solanum']['tomato']
taxonomy['Plantae']['Solanales']['Solanaceae']['Solanum']['potato']
taxonomy['Plantae']['Solanales']['Convolvulaceae']['Ipomoea']['sweet potato']
```

We'll prettyprint this time, which requires us to convert to standard dicts first:

```python
def dicts(t): return {k: dicts(t[k]) for k in t}
```

Now we can prettyprint the structure with `pprint(dicts(taxonomy))`:

```python
{'Animalia': {'Chordata': {'Mammalia': {'Carnivora': {'Canidae': {'Canis': {'coyote': {},
                                                                            'dog': {}}},
                                                      'Felidae': {'Felis': {'cat': {}},
                                                                  'Panthera': {'lion': {}}}}}}},
 'Plantae': {'Solanales': {'Convolvulaceae': {'Ipomoea': {'sweet potato': {}}},
                           'Solanaceae': {'Solanum': {'potato': {},
                                                      'tomato': {}}}}}}
```

So the substructures we referenced now exist as dicts, with empty dicts at the leaves.

### Iteration
This tree can be fun to iteratively walk through, again because structure comes into being simply by referring to it.

For example, suppose we are parsing a list of new animals to add to our taxonomy above, so we want to call a function like:
```python
add(taxonomy,
    'Animalia,Chordata,Mammalia,Cetacea,Balaenopteridae,Balaenoptera,blue whale'.split(','))
```

We can implement this simply as:

```python
def add(t, keys):
  for key in keys:
    t = t[key]
```

Again we are never assigning to the dictionary, but just by referencing the keys we have created our new structure:

```python
{'Animalia': {'Chordata': {'Mammalia': {'Carnivora': {'Canidae': {'Canis': {'coyote': {},
                                                                            'dog': {}}},
                                                      'Felidae': {'Felis': {'cat': {}},
                                                                  'Panthera': {'lion': {}}}},
                                        'Cetacea': {'Balaenopteridae': {'Balaenoptera': {'blue whale': {}}}}}}},
 'Plantae': {'Solanales': {'Convolvulaceae': {'Ipomoea': {'sweet potato': {}}},
                           'Solanaceae': {'Solanum': {'potato': {},
                                                      'tomato': {}}}}}}
```

## Conclusion
This probably isn't very useful, and it makes for some perplexing code (see `add()` above).

But if you like Python then I hope this was fun to think about or worthwhile to understand.