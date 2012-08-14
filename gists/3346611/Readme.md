To define the function, paste the following code into your shell:

```bash
curlstats ()
{
    ( echo "url_effective\t%{url_effective}\n";
    echo "http_code\t%{http_code}\n";
    echo "content_type\t%{content_type}\n";
    echo "http_connect\t%{http_connect}\n";
    echo "time_total\t%{time_total}\n";
    echo "time_namelookup\t%{time_namelookup}\n";
    echo "time_connect\t%{time_connect}\n";
    echo "time_pretransfer\t%{time_pretransfer}\n";
    echo "time_redirect\t%{time_redirect}\n";
    echo "time_starttransfer\t%{time_starttransfer}\n";
    echo "size_download\t%{size_download}\n";
    echo "size_upload\t%{size_upload}\n";
    echo "size_header\t%{size_header}\n";
    echo "size_request\t%{size_request}\n";
    echo "speed_download\t%{speed_download}\n";
    echo "speed_upload\t%{speed_upload}\n";
    echo "redirect_ur\t%{redirect_url}\n";
    echo "num_connects\t%{num_connects}\n";
    echo "num_redirects\t%{num_redirects}\n";
    echo -ne "" ) | command curl "$@" -w '@-'
}
```

An example of using the function:

```bash
stu@vervet ~ $ curlstats -I http://j.mp/O4s1NP
HTTP/1.1 301 Moved
Server: nginx
Date: Tue, 14 Aug 2012 05:33:13 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
Set-Cookie: _bit=5029e319-003e0-013f7-2e1cf10a;domain=.j.mp;expires=Sun Feb 10 05:33:13 2013;path=/; HttpOnly
Cache-control: private; max-age=90
Location: http://stackoverflow.com/users/217652/stuart-powers
MIME-Version: 1.0
Content-Length: 143

url_effective   http://j.mp/O4s1NP
http_code       301
content_type    text/html; charset=utf-8
http_connect    000
time_total      0.112
time_namelookup 0.002
time_connect    0.055
time_pretransfer        0.055
time_redirect   0.000
time_starttransfer      0.112
size_download   0
size_upload     0
size_header     388
size_request    152
speed_download  0.000
speed_upload    0.000
redirect_ur     http://stackoverflow.com/users/217652/stuart-powers
num_connects    1
num_redirects   0

```