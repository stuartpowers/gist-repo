
cat P4EN.log INYG.log > access.log

grep -E '^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' access.log  > ips.log 

sed -e 's/ - \[/\t"/' -e 's/\] "/"\t\"/' -e 's/" /"\t/' -e 's/ "/\t"/' -e 's/" "/"\t"/' -e 's/" /"\t/' < ips.log  > ips.dat
