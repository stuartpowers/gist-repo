from email.utils import formatdate
from datetime import datetime, timedelta, tzinfo

"""
prints the current time and time from three hours ago in RFC 2822 (email) format
stu@sente ~ $ python rfc2822.py
Wed, 21 Dec 2011 16:45:46 -0500
Wed, 21 Dec 2011 13:45:46 -0500
"""

now = datetime.now()
delta = timedelta(hours=-3)

newdate = now + delta

print formatdate(float(now.strftime("%s")),tzinfo())
print formatdate(float(newdate.strftime("%s")),tzinfo())