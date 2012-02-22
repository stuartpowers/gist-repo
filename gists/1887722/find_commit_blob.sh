#!/bin/sh
# pass a blob sha1 OR a <filename>

blob_or_file="$1"

if [ -f "$blob_or_file" ]; then
    obj_name=$(sha1git.py "$blob_or_file")
else
    obj_name=$blob_or_file
fi


shift

git log  --pretty=format:'%T %H %s' "$@"  | while read tree commit subject ; do
    if git ls-tree -r $tree | grep -q "$obj_name" ; then
        echo $commit "$subject"
    fi
done
