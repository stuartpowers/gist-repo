import urllib
import urllib2
import sys
import os



def get_data():
    """get the data we'll be sending..."""

    parms = {}
    for f in sys.argv[1:] or ['-']:
        if f == '-':
            key='stdin'
            value = sys.stdin.read()

        else:
            key = os.path.basename(f)
            value = open(f).read()

        parms[key] = value

    return parms




def send_files(parms):
    """send the data"""

    sys.stderr.write("sending:\n<filename>\t<filebytes>\n")
    for k,v in parms.items():
        sys.stderr.write('%s\t%d\n' % (k,len(v)))

    sys.stderr.write('\n')


    data = urllib.urlencode(parms)
    req = urllib2.Request('http://c.sente.cc', data)
    con = urllib2.urlopen(req)
    response = con.read()

    return response


def print_response(response):

    if os.path.exists('/var/www/curl/htdocs/'):
        print '\n'.join(sorted(response.split('\n')))

    else:
        rows = sorted(response.split('\n'))
        for row in rows:
            if not row.startswith('/'):
                print row

    return 0


parms = get_data()

response = send_files(parms)

print_response(response)