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

    [get]  /request/destroy/[リクエストID]
    
リクエストIDを指定すると、リクエストを削除できます。

#### Stock

在庫の登録、入荷、在庫巣の変更が可能です。

    [get]  /stock
    
在庫リストを表示します。カテゴリによるフィルタリング、ソートが可能です。

    [get]  /stock/[商品ID]
    
商品の詳細情報を表示します。売り上げ推移の表示も可能です。

    [get]  /stock/[商品ID]/edit
    
商品情報を編集します。

    [get]  /stock/create
    
新しい商品を登録します。

    [get]  /stock/add?number=[入荷数]&id=[商品ID]&...

商品を入荷します。

    [get]  /stock/loss/
    
在庫数の変更を行います。

#### User

    [get]  /user?name=[名前]&grade=[学年]&from_balance=[残高]&to_balance=[残高]&sort=[ソート方法]&r1=[ソート方法(0/1)]
    
ユーザーリストを表示します。また、名前、学年、残高で絞込み検索が可能です。ソート方法も指定可能です。

    [get]  /user/[ユーザーID]
    
ユーザーの詳細情報を表示します。残高の推移も表示可能です。

    [get]  /user/[ユーザーID]/edit
    
ユーザー情報を変更できます。

    [get]  /user/[ユーザーID]/password
    
ユーザーのパスワードを変更できます。

    [get]  /user/create
    
新しいユーザーを登録します。

    [get]  /user/alledit
    
一括編集を行います。

#### Log

    [get]  /log/
    
ログ閲覧を行います。

### User

購入者権限を持つユーザーは、商品の購入、リクエストの送信、自分の情報の閲覧・編集が可能です。

#### Stock

    [get]  /stock/list
    
商品リストを表示します。ソート、カテゴリによるフィルタが可能です。

    [get/post]  /stock/purchase?id[商品ID]=[購入数]...
    
購入処理を行います。

#### Request

    [get]  /request/user_request?
    
リクエストリストを表示します。リクエストの送信も可能です。

    [post]  /request/reqsubmit?request=[リクエスト]
    
リクエストを行います。

    [get]  /request/evaluation/[リクエストID]
    
リクエストをお気に入りにします。

#### User

    [get]  /user/mypage
    
自分の情報を表示します。残高の推移も表示可能です。

    [get]  /user/mypage/edit
    
自分の情報を編集します。

    [get]  /user/[ユーザーID]/password
    
自分のパスワードを編集します。

a [Sails](http://sailsjs.org) application

[Sails beta docs](http://beta.sailsjs.org/#/documentation)
