

def print_all_leaf_nodes(data,level=0):
    if isinstance(data, dict):
        for item in data.values():
            print_all_leaf_nodes(item,level+1)
    elif isinstance(data, list) or isinstance(data, tuple):
        for item in data:
            print_all_leaf_nodes(item,level+1)
    else:
        print '%s %s' % ('....' * level, str(data))


data= {'count': 2,
        'text': '1',
        'kids': [{'count': 3,
                  'text': '1.1',
                  'kids': [{'count': 1,
                            'text': '1.1.1',
                            'kids': [{'count':0,
                                      'text': '1.1.1.1',
                                      'kids': []}]},
                           {'count': 0,
                            'text': '1.1.2',
                            'kids': []},
                           {'count': 0,
                            'text': '1.1.3',
                            'kids': []}]},
                 {'count': 0,
                  'text': '1.2',
                  'kids': []}]}



if __name__ == '__main__':
    print_all_leaf_nodes(data)

    """ outputs:
    .... 2
    .... 1
    ............ 3
    ............ 1.1
    .................... 1
    .................... 1.1.1
    ............................ 0
    ............................ 1.1.1.1
    .................... 0
    .................... 1.1.2
    .................... 0
    .................... 1.1.3
    ............ 0
    ............ 1.2
    """