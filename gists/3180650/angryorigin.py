from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from SocketServer import ThreadingMixIn
import threading
import requests

class Handler(BaseHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        print "Init!"
        self.protocol_version = 'HTTP/1.1'
        BaseHTTPRequestHandler.__init__(self, request, client_address, server) #http://www.mlsite.net/blog/?p=80

    def send_default_headers(self):
        methods_value = ",".join(self.get_capabilities())
        self.send_response(200);
        self.send_header('Allow',methods_value)
              
        #Works for *uncredentialed requests only*
        #self.send_header('Access-Control-Allow-Headers','*') 
        self.send_header('Access-Control-Allow-Headers','Content-Type') 
        self.send_header('Access-Control-Allow-Methods',methods_value)
    
        #Cannot use wildcard in Access-Control-Allow-Origin when credentials flag is true.
        #self.send_header('Access-Control-Allow-Origin','*')
        self.send_header('Access-Control-Allow-Origin',self.headers['Origin'])

        #Silence Credentials flag is true, but Access-Control-Allow-Credentials is not "true"
        self.send_header('Access-Control-Allow-Credentials','true')

        self.send_header('Access-Control-Max-Age',1000);
        return

    def get_capabilities(self):
        return filter(lambda x: x is not None,(map(self.capability_from_method,dir(self))))
    
    def capability_from_method(self,methodname):
        possible = methodname.split('do_')
        if (len(possible) > 1):
            return possible[1]

    def do_OPTIONS(self):
        self.send_default_headers()
        self.send_header('Content-Length',0)
        self.send_header('Connection','close')
        self.end_headers()
        return

    def do_POST(self):
            length = int(self.headers.getheader('content-length'))
            data = self.rfile.read(length)

            response = self.process_data(data)
            self.send_response(int(response['status']),self.responses[response['status']][0])
            self.send_default_headers()
            for k, v in response['headers'].iteritems():
                self.send_header(k,v)
            self.end_headers()
            if (len(response['content']) != 0):
                self.wfile.write(response['content'])
            self.wfile.write('    ');
            return

    def process_data(self, data):
        DESTINATION="http://somedestination" + str(self.path)
        r = requests.post(DESTINATION, data=data)
        return {'status': r.status_code, 'headers': r.headers, 'content': r.content}

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""

if __name__ == '__main__':
    server = ThreadedHTTPServer(('localhost', 8080), Handler)
    print 'Starting server, use <Ctrl-C> to stop'
    server.serve_forever();