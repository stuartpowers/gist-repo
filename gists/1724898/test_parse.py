# -*- coding: UTF-8 -*-
# Stuart Powers
# http://sente.cc/

import lxml.html
import urllib
import urllib2.urlopen
import sys

webpage = sys.argv[1]
switch = int(sys.argv[2])


if switch == 1:
    obj = lxml.html.parse(webpage)
    print lxml.html.tostring(obj)

if switch == 2:
    obj = lxml.html.parse(urllib.urlopen(webpage))
    print lxml.html.tostring(obj)

if switch == 3:
    obj = lxml.html.parse(urllib.urlopen(webpage).read()).getroot()
    print lxml.html.tostring(obj)

if switch == 4:
    obj = lxml.html.fromstring(urllib.urlopen(webpage).read())
    print lxml.html.tostring(obj)

#if switch == 5:
#    obj = lxml.html.parse(urllib2.urlopen(webpage))
#    print lxml.html.tostring(obj)



#    when running:
#    python test_parse.py https://mtgox.com/ 1
#    python test_parse.py https://mtgox.com/ 2
#    python test_parse.py https://mtgox.com/ 3
#    python test_parse.py https://mtgox.com/ 4
#
#    1 and 3 fail, 2 and 4 work
#
#    stu@sente ~/tmp/daily/02/02/lxmltest $ python test_parse.py https://mtgox.com/ 1 > mtgox/1.html
#    Traceback (most recent call last):
#      File "test_parse.py", line 11, in <module>
#        obj = lxml.html.parse(webpage)
#      File "/usr/lib/python2.6/dist-packages/lxml/html/__init__.py", line 692, in parse
#        return etree.parse(filename_or_url, parser, base_url=base_url, **kw)
#      File "lxml.etree.pyx", line 2942, in lxml.etree.parse (src/lxml/lxml.etree.c:54187)
#      File "parser.pxi", line 1528, in lxml.etree._parseDocument (src/lxml/lxml.etree.c:79485)
#      File "parser.pxi", line 1557, in lxml.etree._parseDocumentFromURL (src/lxml/lxml.etree.c:79768)
#      File "parser.pxi", line 1457, in lxml.etree._parseDocFromFile (src/lxml/lxml.etree.c:78843)
#      File "parser.pxi", line 997, in lxml.etree._BaseParser._parseDocFromFile (src/lxml/lxml.etree.c:75698)
#      File "parser.pxi", line 564, in lxml.etree._ParserContext._handleParseResultDoc (src/lxml/lxml.etree.c:71739)
#      File "parser.pxi", line 645, in lxml.etree._handleParseResult (src/lxml/lxml.etree.c:72614)
#      File "parser.pxi", line 583, in lxml.etree._raiseParseError (src/lxml/lxml.etree.c:71927)
#    IOError: Error reading file 'https://mtgox.com/': failed to load external entity "https://mtgox.com/"
#
#    stu@sente ~/tmp/daily/02/02/lxmltest $ python test_parse.py https://mtgox.com/ 2 > mtgox/2.html
#    stu@sente ~/tmp/daily/02/02/lxmltest $ python test_parse.py https://mtgox.com/ 3 > mtgox/3.html
#
#    Traceback (most recent call last):
#      File "test_parse.py", line 19, in <module>
#        obj = lxml.html.parse(urllib.urlopen(webpage).read()).getroot()
#      File "/usr/lib/python2.6/dist-packages/lxml/html/__init__.py", line 692, in parse
#        return etree.parse(filename_or_url, parser, base_url=base_url, **kw)
#      File "lxml.etree.pyx", line 2942, in lxml.etree.parse (src/lxml/lxml.etree.c:54187)
#      File "parser.pxi", line 1528, in lxml.etree._parseDocument (src/lxml/lxml.etree.c:79485)
#      File "parser.pxi", line 1557, in lxml.etree._parseDocumentFromURL (src/lxml/lxml.etree.c:79768)
#      File "parser.pxi", line 1457, in lxml.etree._parseDocFromFile (src/lxml/lxml.etree.c:78843)
#      File "parser.pxi", line 997, in lxml.etree._BaseParser._parseDocFromFile (src/lxml/lxml.etree.c:75698)
#      File "parser.pxi", line 564, in lxml.etree._ParserContext._handleParseResultDoc (src/lxml/lxml.etree.c:71739)
#      File "parser.pxi", line 645, in lxml.etree._handleParseResult (src/lxml/lxml.etree.c:72614)
#      File "parser.pxi", line 579, in lxml.etree._raiseParseError (src/lxml/lxml.etree.c:71894)
#    UnicodeDecodeError: 'ascii' codec can't decode byte 0xc2 in position 6949: ordinal not in range(128)
#
#    stu@sente ~/tmp/daily/02/02/lxmltest $ python test_parse.py https://mtgox.com/ 4 > mtgox/4.html
