"""
this is a quick and dirty script to send HTML email - emphasis on dirty :)
python emailpage.py http://www.sente.cc
made to answer: http://stackoverflow.com/questions/9226719/sending-a-html-file-via-python
Stuart Powers
"""
import lxml.html
import smtplib
import sys
import os


page = sys.argv[1]  #the webpage to send

root = lxml.html.parse(page).getroot()
root.make_links_absolute()

content = lxml.html.tostring(root)

message = """From: Stuart Powers <stuart.powers@gmail.com>
To: Stuart Powers <stuart.powers@gmail.com>
MIME-Version: 1.0
Content-type: text/html
Subject: %s

%s""" %(page, content)


smtpserver = smtplib.SMTP("smtp.gmail.com",587)
smtpserver.starttls()
smtpserver.login("stuart.powers@gmail.com",os.environ["GPASS"])
smtpserver.sendmail('stuart.powers@gmail.com', ['stuart.powers@gmail.com'], message)
