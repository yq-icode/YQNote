/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("autocomplete-plugin",function(B){var A=B.Plugin;function C(D){D.inputNode=D.host;if(!D.render&&D.render!==false){D.render=true;}C.superclass.constructor.apply(this,arguments);}B.extend(C,B.AutoCompleteList,{},{NAME:"autocompleteListPlugin",NS:"ac",CSS_PREFIX:B.ClassNameManager.getClassName("aclist")});A.AutoComplete=C;A.AutoCompleteList=C;},"3.3.0pr1",{requires:["autocomplete-list","node-pluginhost"]});