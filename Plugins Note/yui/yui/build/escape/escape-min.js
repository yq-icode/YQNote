/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("escape",function(C){var A={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},B={html:function(D){return D.replace(/[&<>"'\/]/g,B._htmlReplacer);},regex:function(D){return D.replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g,"\\$&");},_htmlReplacer:function(D){return A[D];}};B.regexp=B.regex;C.Escape=B;},"3.3.0pr1");