"""
    Stuart Powers
 
    This lets you browse by proxy arbitary domains:
 
    proxy www.google.com:   http://www.google.com.sente.cc:9055/
    proxy www.bing.com:     http://www.bing.com.sente.cc:9055/
    proxy xkcd.com:         http://xkcd.com.sente.cc:9055/
    
    This requires a DNS A record of '*' 
 
"""
 
from twisted.web.client import getPage
from klein import run, route
import sys
 
@route('/')
def sillyproxy(request):
 
    hs = request.getRequestHostname()
    proxy_host = hs.replace('.sente.cc','')
    return getPage('http://%s%s' % (proxy_host, request.uri))
 
 
run("0.0.0.0", 9055)