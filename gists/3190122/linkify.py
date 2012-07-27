"""
this converts URLs to <a href="...">...</a>'s and replaces
newlines with <br>
"""

import re
import sys

try:
    file = sys.argv[1]
    txt = open(file, 'r').read()
except:
    txt = sys.stdin.read()

lines = txt.strip().split('\n')

regex = re.compile('(.*((?:https?|ftp|file)://[-A-Z0-9+\&@#/%?=~_|!:,.;]*[A-Z0-9+&@#/%=~_|]).*)',re.IGNORECASE)

def sub_function(group):
    """
    replaces the links with <a href="">
    """
    line = group.group(1)
    match = group.group(2)
    return line.replace(match,'<a href="%s">%s</a>' % (match, match))

for l in lines:
    print re.sub(regex, sub_function, l),"<br>"