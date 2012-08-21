import lxml.html
import sys


def dostuff(url):
    url = sys.argv[1]
    root = lxml.html.parse(url).getroot()

    for ea in root.xpath('//table[@id="entitySimsTable"]/tr/td/a'):
        print ea.text.strip()
        print ea.attrib.get('href').strip()

if __name__ == '__main__':
    url = sys.argv[1]
    dostuff(url)
