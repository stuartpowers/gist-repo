I have a bash function, 'postit' to send files to my server with curl.

This returns a link to the file, both a local filepath and an http link, once you've uploaded the code just shoot me an email an I'll grab it.

Alternatively, you can go to http://sentedrop.com/upload for a browser upload

```bash
stu@vervet ~ $ type postit
postit is a function
postit ()
{
    if [[ -t 0 ]]; then
        curl -sF "$(basename "$1")=<-" http://curl.sente.cc < "$1";
    else
        if [[ -n $1 ]]; then
            curl -sF "$1=<-" http://curl.sente.cc;
        else
            curl -sF "index=<-" http://curl.sente.cc;
        fi;
    fi
}
stu@vervet ~ $ time postit vimfonts.zip
/var/www/curl/htdocs/TpmV/vimfonts.zip
http://c.sente.cc/TpmV/vimfonts.zip

real    0m5.127s
user    0m0.090s
sys     0m0.070s
stu@vervet ~ $ du -sch vimfonts.zip
53M     vimfonts.zip
53M     total
stu@vervet ~ $ # took 5 seconds for 50MB
stu@vervet ~ $
```