/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("unicode-accentfold",function(E){var B=E.Array,D=E.Unicode,A=D.Data.AccentFold,C={canFold:function(F){var G;for(G in A){if(A.hasOwnProperty(G)&&F.search(A[G])!==-1){return true;}}return false;},compare:function(G,F,H){var I=C.fold(G),J=C.fold(F);return H?!!H(I,J):I===J;},filter:function(G,F){return B.filter(G,function(H){return F(C.fold(H));});},fold:function(F){if(E.Lang.isArray(F)){return B.map(F,C.fold);}F=F.toLowerCase();E.Object.each(A,function(H,G){F=F.replace(H,G);});return F;}};D.AccentFold=C;},"3.3.0pr1",{requires:["array-extras","unicode-data-accentfold"]});