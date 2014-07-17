# Food Product Management System

## How to install Node.js, Sails.js

Node.js, node-gypが正常に動作する環境であればどのような環境にもデプロイすることが出来ます。

### Ubuntu

Ubuntuでデプロイするには、前準備としてpython, g++, make、実行環境としてnodejs(+node-gyp)、フレームワークとしてsailsjsが必要になります。

Node.jsのインストール

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

Sails.jsのインストール

    sudo npm -g install sails@0.10.0-rc8
    sudo npm -g install node-gyp
    
### Windows

Windowsでデプロイする場合、前準備としてPython 2.7, Microsoft Visual C++ for Windows Desktop(2012 or 2013)、実行環境としてnodejs(node-gyp)、フレームワークとしてsailsjsが必要になります。


Microsoft Visual Studio 2010が入っている場合、node-gypのインストール、bcryptのインストールで問題が発生する危険性がありますので、アンインストールすることをおすすめします。

[Node.js download](http://nodejs.org/download/)

[Python 2.7.x Download](https://www.python.org/download/)

[Microsoft Visual C++ for Windows Desktop Download](http://go.microsoft.com/?linkid=9816758)

    npm -g install sails@0.10.0-rc8

    npm -g install node-gyp

    (optional)
    node-gyp configure --msvs_version=2012

## How to lunch Sails application

    cd [sails directory]
    sails lift
    
    http://localhost:1337/

    オプションとして--portでポートを指定できます。
    
### Before first lift

    最初に起動する前に、パッケージのインストールが必要になります。

    npm -g install
    npm install
    
## How to use Food Product Management System

### First lift

このシステムは、初期状態ではユーザーが用意されていません。

    localhost:1337/FirstUserCreate/

上記のアドレスにアクセスすると管理者権限のユーザーを作成できます。json形式で発行されます。また、この操作はユーザーが一名も登録されていない時のみ実行可能ですのでご留意下さい。

初めに作成されたパスワードは安全であることが保証されませんので、外環境への公開前に変更することをお勧めします。

### Administrator

管理者権限を持つユーザーは、システムに登録されている情報に対してあらゆる操作が可能になります。ただし、購入処理やリクエストの送信などは許可されません。

#### Request

リクエストの閲覧、削除、フィードバックが可能です。

    [get]  /request?r1=[フィードバックのあり/なし]&grade=[評価状態]

リクエストをリスト表示します。また、フィードバックのあり/なし、評価状態について絞り込み検索が可能です。

    [get]  /request/[リクエストID]

リクエストIDを指定すると、リクエストの詳細情報を閲覧できます。この画面でフィードバックを行う事もできます。

#### Stock

#### User

#### Log

a [Sails](http://sailsjs.org) application

[Sails beta docs](http://beta.sailsjs.org/#/documentation)
