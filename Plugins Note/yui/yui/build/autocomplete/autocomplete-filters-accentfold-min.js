/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("autocomplete-filters-accentfold",function(D){var C=D.Unicode.AccentFold,A=D.Unicode.WordBreak,B=D.Array,E=D.Object;D.mix(D.namespace("AutoCompleteFilters"),{charMatchFold:function(H,G){var F=B.unique(C.fold(H).split(""));return C.filter(G,function(I){return B.every(F,function(J){return I.indexOf(J)!==-1;});});},phraseMatchFold:function(G,F){G=C.fold(G);return C.filter(F,function(H){return H.indexOf(G)!==-1;});},startsWithFold:function(G,F){G=C.fold(G);return C.filter(F,function(H){return H.indexOf(G)===0;});},wordMatchFold:function(H,F){var G=A.getUniqueWords(C.fold(H));return C.filter(F,function(I){var J=B.hash(A.getUniqueWords(I));return B.every(G,function(K){return E.owns(J,K);});});}});},"3.3.0pr1",{requires:["array-extras","unicode-accentfold","unicode-wordbreak"]});