#!/usr/bin/python

"""
    computes a sha1 hash of a file just as git does
    usage: $0 <filename>
"""

from hashlib import sha1
import sys


def githash(data):
    s = sha1()
    s.update("blob %u\0" % len(data))
    s.update(data)
    return s.hexdigest()


def main():

    try:
        file = sys.argv[1]
        data = open(file,'rb').read()
        print githash(data)
    except Exception, e:
        raise str(e)
        sys.stderr.write("must pass a file as a parameter")
        sys.exit(1)


if __name__ == '__main__':
    main()
