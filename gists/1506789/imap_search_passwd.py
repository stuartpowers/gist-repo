import os,sys,imaplib

"""
imap_search_passwd.py
~~~~~
quick and dirty script which reports if your email's password exists in any of your emails

stu@sente ~ $ export GPASS=XXXXXXX
stu@sente ~ $ python imap_search_passwd.py stuart.powers
('OK', ['77342 77574 78131 78730 79621 80649 82111 83729 85190 87322'])
"""

user=sys.argv[1]
password=os.environ['GPASS']

c = imaplib.IMAP4_SSL('imap.gmail.com')
c.login(user,password)
c.select('[Gmail]/All Mail')

print c.search(None,'(BODY %s)' %password)
c.logout()