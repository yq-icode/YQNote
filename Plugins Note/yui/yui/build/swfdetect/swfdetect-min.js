/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("swfdetect",function(C){var J=0,H=C.UA,E=C.Lang,M="ShockwaveFlash",B,G,D,N,A;function L(O){return parseInt(O,10);}function F(O){if(E.isNumber(L(O[0]))){H.flashMajor=O[0];}if(E.isNumber(L(O[1]))){H.flashMinor=O[1];}if(E.isNumber(L(O[2]))){H.flashRev=O[2];}}if(H.gecko||H.webkit||H.opera){if((B=navigator.mimeTypes["application/x-shockwave-flash"])){if((G=B.enabledPlugin)){D=G.description.replace(/\s[rd]/g,".").replace(/[A-Za-z\s]+/g,"").split(".");F(D);}}}else{if(H.ie){try{N=new ActiveXObject(M+"."+M+".6");N.AllowScriptAccess="always";}catch(I){if(N!==null){J=6;}}if(J===0){try{A=new ActiveXObject(M+"."+M);D=A.GetVariable("$version").replace(/[A-Za-z\s]+/g,"").split(",");F(D);}catch(K){}}}}C.SWFDetect={getFlashVersion:function(){return(String(H.flashMajor)+"."+String(H.flashMinor)+"."+String(H.flashRev));},isFlashVersionAtLeast:function(R,T,S){var P=L(H.flashMajor),Q=L(H.flashMinor),O=L(H.flashRev);R=L(R||0);T=L(T||0);S=L(S||0);if(R===P){if(T===Q){return S<=O;}return T<Q;}return R<P;}};},"3.3.0pr1");