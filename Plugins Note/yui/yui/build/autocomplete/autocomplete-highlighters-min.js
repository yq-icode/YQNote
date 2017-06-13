/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("autocomplete-highlighters",function(D){var C=D.Array,A=D.Highlight,B=D.mix(D.namespace("AutoCompleteHighlighters"),{charMatch:function(H,G,E){var F=C.unique((E?H:H.toLowerCase()).split(""));return C.map(G,function(I){return A.all(I,F,{caseSensitive:E});});},charMatchCase:function(F,E){return B.charMatch(F,E,true);},phraseMatch:function(G,F,E){return C.map(F,function(H){return A.all(H,[G],{caseSensitive:E});});},phraseMatchCase:function(F,E){return B.phraseMatch(F,E,true);},startsWith:function(G,F,E){return C.map(F,function(H){return A.all(H,[G],{caseSensitive:E,startsWith:true});});},startsWithCase:function(F,E){return B.startsWith(F,E,true);},wordMatch:function(G,F,E){return C.map(F,function(H){return A.words(H,G,{caseSensitive:E});});},wordMatchCase:function(F,E){return B.wordMatch(F,E,true);}});},"3.3.0pr1",{requires:["array-extras","highlight-base"]});