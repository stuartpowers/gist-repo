#!/usr/bin/python
# -*- coding: UTF-8 -*-

""" gdata_helper.py: wrapper/helper functions to parse Youtube's json data """

import sys
import simplejson
import glob

sys.path.insert(0,'tablib')
import tablib


def safely(f):
    def _inner(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except:
            return ""
    return _inner

def makeint(f):
    def _inner(*args, **kwargs):
        try:
            return int(f(*args, **kwargs))
        except:
            return 0
    return _inner

def makestr(f):
    def _inner(*args, **kwargs):
        try:
            res = f(*args, **kwargs)
            if res:
                return str(res)
        except:
            return ""
    return _inner




@safely
def _title(e):
    return e['title']['$t'].encode('ascii','replace')

@safely
def _firstname(e):
    return e['yt$firstName']['$t'].encode('ascii','replace')

@safely
def _lastname(e):
    return e['yt$lastName']['$t'].encode('ascii','replace')

@makeint
@safely
def _age(e):
    return e['yt$age']['$t']

@makeint
@safely
def _subscount(e):
    return int(e['yt$statistics']['subscriberCount'])

@makeint
@safely
def _viewcount(e):
    return int(e['yt$statistics']['viewCount'])

@makeint
@safely
def _watchcount(e):
    return int(e['yt$statistics']['videoWatchCount'])


@safely
def _lastwebaccess(e):
    return e['yt$statistics']['lastWebAccess']

@makeint
@safely
def _totaluploadviews(e):
    return int(e['yt$statistics']['totalUploadViews'])


@safely
def _profile(e):
    for i in e['link']:
        if i['rel'] == 'alternate':
            return i['href'].encode('ascii','replace')

@makestr
@safely
def _webpage(e):
    for i in e['link']:
        if i['rel'] == 'related':
            return i['href'].encode('ascii','replace')
    return ""


@makeint
@safely
def _favorite_count(e):
    for l in e['gd$feedLink']:
        if l['rel'].endswith('favorites'):
            return int(l['countHint'])
    return 0

@makeint
@safely
def _contact_count(e):
    for l in e['gd$feedLink']:
        if l['rel'].endswith('contacts'):
            return int(l['countHint'])
    return 0

@makeint
@safely
def _subscription_count(e):
    for l in e['gd$feedLink']:
        if l['rel'].endswith('user.subscriptions'):
            return int(l['countHint'])
    return 0

@makeint
@safely
def _upload_count(e):
    return int(e['gd$feedLink'][5]['countHint'])

@safely
def _about_me(e):
    return e['yt$aboutMe']['$t'].encode('ascii','replace')

@safely
def _thumbnail(e):
    return e['media$thumbnail']['url']

@safely
def _username(e):
    return e['author'][0]['name']['$t']



def tryit(filename):

    try:
        txt = open(filename,'r')
        js = simplejson.load(txt,encoding='utf-8')
    except:
        js={'entry':None}

    e = js['entry']
    p = {}

    p['firstname'] = _firstname(e)
    p['lastname'] = _lastname(e)
    p['username'] = _username(e)
    p['thumb'] = _thumbnail(e)
    p['title'] = _title(e)
    p['age'] = _age(e)
    p['subscriber_count'] = _subscount(e)
    p['view_count'] = _viewcount(e)
    p['watch_count'] = _watchcount(e)
    p['total_upload_views'] = _totaluploadviews(e)
    p['profile'] = _profile(e)
    p['webpage'] = _webpage(e) or ""
    p['favorite_count'] = _favorite_count(e)
    p['contact_count'] = _contact_count(e)
    p['subscription_count'] = _subscription_count(e)
    p['upload_count'] = _upload_count(e)
    p['about_me'] = _about_me(e)

    return p