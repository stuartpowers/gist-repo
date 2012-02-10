printf '<style> td{border:1px solid black;}</style>'
printf '<table>'
while read -a fields; do
  printf '<tr>'
  printf '  <td>%s</td>\n' "${fields[@]}"
  printf '</tr>'
done
echo '</table>'
