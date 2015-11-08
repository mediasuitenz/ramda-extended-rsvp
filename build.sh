#!/usr/bin/env bash

[ -d "dist" ] && rm -rf "dist"

mkdir "dist"

cp "src/ramda-extended-rsvp.js" "dist/ramda-extended-rsvp.js"
uglifyjs "dist/ramda-extended-rsvp.js" --mangle --keepfnames > "dist/ramda-extended-rsvp.min.js"
