/*
    The MIT License (MIT)
    Copyright (c) 2013 - 2014 Vlad Stirbu
    
    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:
    
    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
CDV = ( typeof CDV == 'undefined' ? {} : CDV );
var cordova = window.cordova || window.Cordova;
//var exec = require('cordova/exec');

var hasCheckedInstall,
    isAppInstalled;

function shareDataUrl(dataUrl, caption, callback) {
  var imageData = dataUrl.replace(/data:image\/(png|jpeg);base64,/, "");

  cordova.exec(function () {
    callback && callback(null, true);
  },

  function (err) {
    callback && callback(err);
  }, "Instagram", "share", [imageData, caption]);
}

CDV.instagram = {
  // calls to see if the device has the Instagram app
  isInstalled: function (callback) {
    exec(function () {
      hasCheckedInstall = true;
      isAppInstalled = true;
      callback && callback(null, true);
    },

    function () {
      hasCheckedInstall = true;
      isAppInstalled = false;
      callback && callback(null, false);
    }, "com.vladstirbu.cordova.instagram", "isInstalled", []);
  },
openUserLink: function (username) {
    console.log("Lauching Instagram App");
    cordova.exec(function () { console.log("Lauch Instagram App") }, (fail?fail:null), "com.vladstirbu.cordova.instagram", "openUserLink", []);
},
};

