import requests
import json
import time
import sys
import os


class Crawler(object):

    after = None
    items = []
    myset = set()
    last_response = None
    dud_count = 0
    urls = []

    def __init__(self, logdir):

        self.logdir = logdir
        os.mkdir('logs/%s' % self.logdir)
        os.mkdir('logs/%s/uniq' % self.logdir)

    def login(self, user,passwd):

        login_url = 'http://www.reddit.com/api/login'
        data = {'user': user, 'passwd': passwd}
        resp = requests.post(login_url, data=data)
        self.last_response = resp
        if resp.status_code == 200:
            self.cookies = resp.cookies
            return 0
        else:
            print "error"
            self.cookies = None
            return -1



    def get_new(self):

        new_url = 'http://www.reddit.com/reddits/new/.json'
        if self.after:
            new_url = "%s?after=%s" % (new_url, self.after)
        resp = requests.get(new_url, cookies=self.cookies)
        self.last_response = resp
        self.urls.append(resp.request.url)

        self._handle_response(resp)

        if resp.status_code == 200:
            js = json.loads(resp.content)
            uniq_count = len(self.myset)
            for item in js['data']['children']:
                self.items.append(item)
                self.myset.add(item['data']['url'])

            if uniq_count == len(self.myset):
                self.dud_count += 1
            
            after = js['data']['after']
            self.after = after
        else:
            raise Exception("error")


    def _handle_response(self, resp):
        now = time.time()

        with open('logs/%s/requests.log' % self.logdir,'a') as mylog:
            mylog.write("%s\t%s\n" % (now, resp.request.url))

        with open('logs/%s/ids.log' % self.logdir ,'a') as mylog:
            js = json.loads(resp.content)
            for item in js['data']['children']:
                id = item ['data']['id']
                created = item ['data']['created_utc']
                url = item ['data']['url']
                mylog.write('%s\t%s\t%s\t%s\n' % (resp.request.url, id, created, url))
                sys.stdout.write('%s\t%s\t%s\t%s\n' % (resp.request.url, id, created, url))
                    
        with open('logs/%s/uniq/%s.log' % (self.logdir, now), 'a') as mylog:
            mylog.write(resp.content)




if __name__ == '__main__':

    try:
        user = sys.argv[1]
        passwd = sys.argv[2]
        print user
        print passwd

        c = Crawler(logdir=user)
        c.login(user, passwd)
    except:
        c = Crawler(logdir='none')
        pass



    while c.dud_count < 5:
        c.get_new()
        print len(c.items), len(c.myset), c.last_response.url
