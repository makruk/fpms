# Food Product Management System

Sailsについて困ったときは[Sails beta docs](http://beta.sailsjs.org/#/documentation)を読もう

## How to install Node.js, Sails.js

### Ubuntu

Node.jsのインストール

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

Sails.jsのインストール

    sudo npm -g install sails@0.10.0-rc5
    sudo npm -g install node-gyp
    
### Windows
[Node.js download](http://nodejs.org/download/)

    npm -g install sails@0.10.0-rc5
    
[Python 2.7.x Download](https://www.python.org/download/)
[Microsoft Visual C++ for Windows Desktop Download](http://go.microsoft.com/?linkid=9816758)

    npm -g install node-gyp
    node-gyp configure --msvs_version=2012

## How to lunch Sails application

    cd [sails directory]
    npm -g install
    sails lift
    
    http://localhost:1337/
    
もしCSSなどが適用されなかった場合、
    
    npm install
    
を試してください    

a [Sails](http://sailsjs.org) application
