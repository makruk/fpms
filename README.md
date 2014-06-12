# Food Product Management System

Sailsについて困ったときは[Sails beta docs](http://beta.sailsjs.org/#/documentation)を読もう

## How to install Node.js, Sails.js

### Ubuntu
    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs
    sudo npm -g install sails@0.10.0-rc5
### Windows
[Node.js download](http://nodejs.org/download/)

    npm -g install sails@0.10.0-rc5
    
## How to lunch Sails application

    cd [sails directory]
    npm -g install
    sails lift
    
    http://localhost:1337/
    
もしCSSなどが適用されなかった場合、
    
    npm install
    
を試してください    

a [Sails](http://sailsjs.org) application
