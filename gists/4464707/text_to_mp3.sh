#!/bin/sh

# Stuart Powers
# this takes a string of text and creates an mp3 of the words as if read (by google)
# its a huge hack I put together in ~10 minutes as a proof of concept


sentence="Arachnophobia is a American horror film directed by Frank Marshall and starring Jeff Daniels and John Goodman. It was the first film released by Hollywood Pictures, as well as being the directorial debut of Frank "

# remove any punctuation and whatnot
words=$(sed 's/[^a-zA-Z0-9 ]//g' <<<"${sentence}")

i=0;
for word in $words;
do
    i=$((i+1));
    idx=$(printf %03d-%s.mp3 $i ${word});
    curl -s -o "${idx}" https://ssl.gstatic.com/dictionary/static/sounds/de/0/${word}.mp3;
done


if [[ -f combined.mp3 ]]; then rm combined.mp3; fi

cat *.mp3 > combined.mp3;

# now you should have a directory full of mp3s!
# one of the mp3s, 'combined.mp3' is everything put together
# I'm fully aware it sounds like crap!


