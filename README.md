# Food Product Management System

Sailsについて困ったときは[Sails beta docs](http://beta.sailsjs.org/#/documentation)を読もう

validationEngine.js…

[日本語で説明されているページ](http://welcustom.net/jquery-validation-engine/)

[詳しい説明(GitHub)](https://github.com/posabsolute/jQuery-Validation-Engine)

## How to install Node.js, Sails.js

### Ubuntu

Node.jsのインストール

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

Sails.jsのインストール

    sudo npm -g install sails@0.10.0-rc8
    sudo npm -g install node-gyp
    
### Windows

[Node.js download](http://nodejs.org/download/)

[Python 2.7.x Download](https://www.python.org/download/)

[Microsoft Visual C++ for Windows Desktop Download](http://go.microsoft.com/?linkid=9816758)

Microsoft Visual Studio 2010が入っている場合、アンインストールしてから試してください。

    npm -g install sails@0.10.0-rc8
    

    npm -g install node-gyp
    node-gyp configure --msvs_version=2012

## How to lunch Sails application

    cd [sails directory]
    sails lift
    
    http://localhost:1337/
    
### Before first lift

    npm -g install
    npm install
    

a [Sails](http://sailsjs.org) application
