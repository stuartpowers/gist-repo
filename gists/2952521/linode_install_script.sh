apt-get update
apt-get install git-core
apt-get install python-pip
apt-get install python-dev
apt-get install nmap
apt-get install netcat
apt-get install sqlite3
apt-get install liblwp-online-perl
apt-get install nginx
apt-get upgrade
/etc/init.d/nginx start


pip install --upgrade pip
pip install virtualenv
pip install virtualenvwrapper
pip install ipython

# useradd -s /bin/bash -m -g 100 -p "$(openssl passwd -1 -salt shaker "mypassword")" stu