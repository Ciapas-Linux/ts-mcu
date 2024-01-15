#! /bin/bash


cd /home/ciapas/Arduino/Sterowanie/ts-mcu/
yarn build
gulp --color -LLLL
cp -fv /home/ciapas/Arduino/Sterowanie/ts-mcu/static/index.html.gz.h /home/ciapas/Arduino/Sterowanie/Gon2-module/static/index.html.gz.h
echo '**************'
echo 'BUILD COMPLETE: ( ͡◉ ͜ʖ ͡◉)  =>' 
echo '**************'
