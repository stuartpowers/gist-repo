#!/usr/bin/python

"""
sloppy helper functions used to transform images (works with PIL-Image)
Stuart Powers
"""


def translate(tpl,a,b,c):
    return (tpl[a],tpl[b],tpl[c])

def filter_out(tpl,a,b,c):
    return (tpl[0]*a,tpl[1]*b,tpl[2]*c)

def munge(srcimg,ar,tup):

    # eww I know...
    a = tup[0]
    b = tup[1]  
    c = tup[2]  
    img = srcimg.copy()

    for x in range(img.size[0]-1):
        for y in range(img.size[1]-1):
            img.putpixel((x,y),translate(ar[x][y],a,b,c))
    return img

def munge_filter(srcimg,ar,tup):

    a = tup[0]
    b = tup[1]
    c = tup[2]
    img = srcimg.copy()

    for x in range(img.size[0]-1):
        for y in range(img.size[1]-1):
            img.putpixel((x,y),filter_out(ar[x][y],a,b,c))
    return img