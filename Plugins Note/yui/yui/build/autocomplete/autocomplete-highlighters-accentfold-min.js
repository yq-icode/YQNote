/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("autocomplete-highlighters-accentfold",function(C){var A=C.Highlight,B=C.Array;C.mix(C.namespace("AutoCompleteHighlighters"),{charMatchFold:function(F,E){var D=B.unique(F.split(""));return B.map(E,function(G){return A.allFold(G,D);});},phraseMatchFold:function(E,D){return B.map(D,function(F){return A.allFold(F,[E]);});},startsWithFold:function(E,D){return B.map(D,function(F){return A.allFold(F,[E],{startsWith:true});});},wordMatchFold:function(E,D){return B.map(D,function(F){return A.wordsFold(F,E);});}});},"3.3.0pr1",{requires:["array-extras","highlight-accentfold"]});