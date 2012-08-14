# Stuart Powers

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

