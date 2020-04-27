#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist
echo 'drippy.live' > CNAME

git init
git add -A
git commit -m "Build #${RANDOM}"
git push -f https://github.com/Drippy-Music/drippy-music.github.io.git master

cd -