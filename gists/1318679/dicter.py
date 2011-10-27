#!/usr/bin/python
""" this tool 'flattens' JSON data, so I can grep/cut/etc it on the command
line.

to get a 2column file of videoids and comment_counts:

stu@sente ~ $ curl -s 'http://gdata.youtube.com/feeds/api/videos?q=hacky%20sack&alt=json&v=2&prettyprint=true'  | dicter.py - | grep -E 'videoid|viewCount' | cut -f2 -d= | xargs -n2

o-8tatHXJHw 341291
GswCIa0b6f8 212116
09sUYDQBNy4 44549
AMKJdzAby5k 68960
5itJmOo9E_M 890067
uSdIfdZyHBI 167667
zKzHEqnfdfI 143730
tqldzoMHjBs 134730
7myTzyS7tjE 76627
...

we could have also passed the URL directly to dicter.py, or a filename, etc etc yada yada
"""

import sys


def showkeys(d,root=''):

    import simplejson
    import urllib

    if d == '-':
        d = simplejson.load(sys.stdin)
    elif isinstance(d,str):
        d = simplejson.load(urllib.urlopen(d))


    for k,v in d.items():
        if isinstance(v,str):
            print "%s[%s]=%r" % (root,k,v)
        if isinstance(v,int):
            print "%s[%s]=%r" % (root,k,v)
        if isinstance(v,float):
            print "%s[%s]=%r" % (root,k,v)

        if isinstance(v,dict):
            showkeys(v,root = root + '['+k+']')

        if isinstance(v,list):
            for i,v in enumerate(v):
                showkeys(v,root = root + '['+k+']' + '['+str(i)+']')



if __name__ == '__main__':
    d = sys.argv[1]
    showkeys(d,root='[root]')