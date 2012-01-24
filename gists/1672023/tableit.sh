#!/bin/bash

# Stuart Powers
# http://sente.cc/
# creates an html table with comma delimited data from STDIN

printf '<style> td{border:1px solid black;}</style>'
printf '<table>'
while IFS=, read -a fields; do
    printf '<tr>'
    printf '  <td>%s</td>\n' "${fields[@]}"
    printf '</tr>'
done
echo '</table>'