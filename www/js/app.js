(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {


    function DBinit()
    {
      var favorites = [];
      /*
      var db = window.sqlitePlugin.openDatabase({name: "myfavorites.db"});

      db.transaction(function(tx) {
        //create favorites_table
        tx.executeSql('CREATE TABLE IF NOT EXISTS favorites_table (id integer primary key, title text, url text, description text, img text)');

        //Read table data (favorites)
        /*
        tx.executeSql("select * from favorites_table", [], function(tx, res) {
          if(res.rows.length)
          {
            console.log("res.rows.length: " + res.rows.length);
            // console.log("res.rows.item(0) = " + JSON.stringify(res.rows.item(0)));
            //ループ変数i
            for(var i=0; i<res.rows.length; i++)
            {
              console.log("res.rows.item(" + i + ") = " + JSON.stringify(res.rows.item(i)));
              favorites.push(res.rows.item(i));
            }
          }

          $data.favorites = favorites;

        });
        */

    }

    //初期化実行
    DBinit();


  });




  module.controller('HomeController', function($scope, $data, $http) {

    //$scope.items = {title:'', url:''};
    //初期化
    function init()
    {
      var datas = [];
      $http({
                method : 'GET',
                url : 'http://dogmap.jp/wp-json/posts/'
            }).success(function(data, status, headers, config) {
                //$scope.results = data.data;
                //console.log("get:success");
                //console.log(status);
                //console.log(data);
                var dataLength = data.length;
                console.log("長さ："+dataLength);
                for(var i=0; i<dataLength; i++)
                {
                  //画像が設定されているとき
                  if(data[i].featured_image != null)
                  {
                    datas[i] = {title: data[i].title, url: data[i].link, description: data[i].excerpt, img: data[i].featured_image.guid};
                  }else{
                    datas[i] = {title: data[i].title, url: data[i].link, description: data[i].excerpt, img: "https://developer.chrome.com/extensions/examples/api/idle/idle_simple/sample-128.png"};
                  }
                }
                //viewdataにいれる
                $scope.items = datas;
                //console.log($scope.items);
                //console.log(datas);


            }).error(function(data, status, headers, config) {
              console.log("get:fail");
                console.log(status);
            });
    }

    $scope.openBrowser = function(index) {
      var selectedItem = $scope.items[index];
      console.log(selectedItem);
      var ref = window.open(selectedItem.url, '_blank', 'location=yes');

    };

    //初期化実行
    init();

  });

  module.controller('FavoritesController', function($scope, $data) {

  });




  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
  });




  module.factory('$data', function() {
      var data = {};

      data.items = [];

      return data;
  });
})();
