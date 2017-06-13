/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("dataschema-xml",function(C){var B=C.Lang,A={apply:function(F,G){var D=G,E={results:[],meta:{}};if(D&&D.nodeType&&(9===D.nodeType||1===D.nodeType||11===D.nodeType)&&F){E=A._parseResults.call(this,F,D,E);E=A._parseMeta.call(this,F.metaFields,D,E);}else{E.error=new Error("XML schema parse failure");}return E;},_getLocationValue:function(K,H){var F=K.locator||K.key||K,E=H.ownerDocument||H,D,G,I=null;try{D=A._getXPathResult(F,H,E);while(G=D.iterateNext()){I=G.textContent||G.value||G.text||G.innerHTML||null;}return C.DataSchema.Base.parse.call(this,I,K);}catch(J){}return null;},_getXPathResult:function(I,E,O){if(!B.isUndefined(O.evaluate)){return O.evaluate(I,E,O.createNSResolver(E.ownerDocument?E.ownerDocument.documentElement:E.documentElement),0,null);}else{var L=[],N=I.split(/\b\/\b/),H=0,G=N.length,K,D,F,M;try{O.setProperty("SelectionLanguage","XPath");L=E.selectNodes(I);}catch(J){for(;H<G&&E;H++){K=N[H];if((K.indexOf("[")>-1)&&(K.indexOf("]")>-1)){D=K.slice(K.indexOf("[")+1,K.indexOf("]"));D--;E=E.children[D];M=true;}else{if(K.indexOf("@")>-1){D=K.substr(K.indexOf("@"));E=D?E.getAttribute(D.replace("@","")):E;}else{if(-1<K.indexOf("//")){D=E.getElementsByTagName(K.substr(2));E=D.length?D[D.length-1]:null;}else{if(G!=H+1){for(F=E.childNodes.length-1;0<=F;F-=1){if(K===E.childNodes[F].tagName){E=E.childNodes[F];F=-1;}}}}}}}if(E){if(B.isString(E)){L[0]={value:E};}else{if(M){L[0]={value:E.innerHTML};}else{L=C.Array(E.childNodes,0,true);}}}}return{index:0,iterateNext:function(){if(this.index>=this.values.length){return undefined;}var P=this.values[this.index];this.index+=1;return P;},values:L};}},_parseField:function(F,D,E){if(F.schema){D[F.key]=A._parseResults.call(this,F.schema,E,{results:[],meta:{}}).results;}else{D[F.key||F]=A._getLocationValue.call(this,F,E);}},_parseMeta:function(H,G,F){if(B.isObject(H)){var E,D=G.ownerDocument||G;for(E in H){if(H.hasOwnProperty(E)){F.meta[E]=A._getLocationValue.call(this,H[E],D);}}}return F;},_parseResult:function(E,G){var D={},F;for(F=E.length-1;0<=F;F--){A._parseField.call(this,E[F],D,G);}return D;},_parseResults:function(G,D,H){if(G.resultListLocator&&B.isArray(G.resultFields)){var L=D.ownerDocument||D,K=G.resultFields,J=[],E,M,F,I=0;if(G.resultListLocator.match(/^[:\-\w]+$/)){F=D.getElementsByTagName(G.resultListLocator);for(I=F.length-1;0<=I;I--){J[I]=A._parseResult.call(this,K,F[I]);}}else{F=A._getXPathResult(G.resultListLocator,D,L);while(E=F.iterateNext()){J[I]=A._parseResult.call(this,K,E);I+=1;}}if(J.length){H.results=J;}else{H.error=new Error("XML schema result nodes retrieval failure");}}return H;}};C.DataSchema.XML=C.mix(A,C.DataSchema.Base);},"3.3.0pr1",{requires:["dataschema-base"]});