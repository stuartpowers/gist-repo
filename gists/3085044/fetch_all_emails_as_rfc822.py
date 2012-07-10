
from imaplib_connect import *
conn = open_connection()

conn.select("[Gmail]/All Mail",readonly=True)
abc=conn.search(None,"ALL")
ids = abc[1][0].split(' ')


def chop(seq,size):
    """Chop a sequence into chunks of the given size."""
    chunk = lambda i: seq[i:i+size]
    return map(chunk,xrange(0,len(seq),size))
chops = chop(ids,200)



for chopgroup in chops:
    print chopgroup
    town = conn.fetch(','.join(chopgroup), "(RFC822)")
    for c,i in enumerate(town[1]):
        if c % 2 == 0:
            print "writing %s" % i[0].split(' ')[0]
            w = open('towns/' + i[0].split(' ')[0] + '.email','w')
            w.write(i[1])
