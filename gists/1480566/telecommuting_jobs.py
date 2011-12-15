#!/usr/bin/env python

"""
http://c.sente.cc/DyHJ/telecommuting_jobs.html

input: http://code.activestate.com/recipes/577979-show-all-the-telecommuting-jobs-from-the-python-jo/
outputs: http://c.sente.cc/DyHJ/telecommuting_jobs.html

"""


from BeautifulSoup import BeautifulSoup
import urllib2
from pprint import pprint
from contextlib import closing
from contextlib import nested

        
url='http://www.python.org/community/jobs/'
jobs='/var/www/vhosts/jobs.dev/index.html'
with nested(closing(urllib2.urlopen(url)), open(jobs,'w')) as (stream,myout):
        html=stream.read()
        soup=BeautifulSoup(html)
        
        print >>myout,"<html><body>"
        sections=soup.findAll('div',{'class':'section'})
        for section in sections:
            #find the job which has not allowed the telecommuting 
            if section.findAll(lambda tag: tag.findAll('li',text='Telecommuting OK')):
                print >>myout,section
        print >>myout,"</body></html>"        
