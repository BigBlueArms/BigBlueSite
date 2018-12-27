#!/bin/bash
# BABEL
./node_modules/.bin/babel js/src --out-file js/dist/big-blue-site.js
#custom file for accueil
./node_modules/.bin/babel js/accueil/accueil.js --out-file js/dist/big-blue-accueil.js

#UGLIFY
./node_modules/.bin/uglifyjs js/dist/big-blue-site.js -o js/dist/big-blue-site.js -c -m
./node_modules/.bin/uglifyjs js/dist/big-blue-accueil.js -o js/dist/big-blue-accueil.js -c -m

#LICENSE
cat license.js js/dist/big-blue-accueil.js > js/dist/temp1.js
cat license.js js/dist/big-blue-site.js > js/dist/temp2.js
rm  js/dist/big-blue-accueil.js
rm  js/dist/big-blue-site.js
mv js/dist/temp1.js js/dist/big-blue-accueil.js
mv js/dist/temp2.js js/dist/big-blue-site.js
