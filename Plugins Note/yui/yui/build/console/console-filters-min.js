/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("console-filters",function(C){var P=C.ClassNameManager.getClassName,G="console",B="filters",K="filter",F="category",D="source",E="category.",L="source.",O="host",Q="checked",N="defaultVisibility",M=".",S="",R=M+C.Console.CHROME_CLASSES.console_bd_class,H=M+C.Console.CHROME_CLASSES.console_ft_class,A="input[type=checkbox].",I=C.Lang.isString;function J(){J.superclass.constructor.apply(this,arguments);}C.namespace("Plugin").ConsoleFilters=C.extend(J,C.Plugin.Base,{_entries:null,_cacheLimit:Number.POSITIVE_INFINITY,_categories:null,_sources:null,initializer:function(){this._entries=[];this.get(O).on("entry",this._onEntry,this);this.doAfter("renderUI",this.renderUI);this.doAfter("syncUI",this.syncUI);this.doAfter("bindUI",this.bindUI);this.doAfter("clearConsole",this._afterClearConsole);if(this.get(O).get("rendered")){this.renderUI();this.syncUI();this.bindUI();}this.after("cacheLimitChange",this._afterCacheLimitChange);},destructor:function(){this._entries=[];if(this._categories){this._categories.remove();}if(this._sources){this._sources.remove();}},renderUI:function(){var U=this.get(O).get("contentBox").one(H),T;if(U){T=C.substitute(J.CATEGORIES_TEMPLATE,J.CHROME_CLASSES);this._categories=U.appendChild(C.Node.create(T));T=C.substitute(J.SOURCES_TEMPLATE,J.CHROME_CLASSES);this._sources=U.appendChild(C.Node.create(T));}},bindUI:function(){this._categories.on("click",C.bind(this._onCategoryCheckboxClick,this));this._sources.on("click",C.bind(this._onSourceCheckboxClick,this));this.after("categoryChange",this._afterCategoryChange);this.after("sourceChange",this._afterSourceChange);},syncUI:function(){C.each(this.get(F),function(U,T){this._uiSetCheckbox(F,T,U);},this);C.each(this.get(D),function(U,T){this._uiSetCheckbox(D,T,U);},this);this.refreshConsole();},_onEntry:function(W){this._entries.push(W.message);var T=E+W.message.category,Y=L+W.message.source,U=this.get(T),Z=this.get(Y),V=this._entries.length-this._cacheLimit,X;if(V>0){this._entries.splice(0,V);}if(U===undefined){X=this.get(N);this.set(T,X);U=X;}if(Z===undefined){X=this.get(N);this.set(Y,X);Z=X;}if(!U||!Z){W.preventDefault();}},_afterClearConsole:function(){this._entries=[];},_afterCategoryChange:function(V){var T=V.subAttrName.replace(/category\./,S),U=V.prevVal,W=V.newVal;if(!T||U[T]!==undefined){this.refreshConsole();this._filterBuffer();}if(T&&!V.fromUI){this._uiSetCheckbox(F,T,W[T]);}},_afterSourceChange:function(U){var W=U.subAttrName.replace(/source\./,S),T=U.prevVal,V=U.newVal;if(!W||T[W]!==undefined){this.refreshConsole();this._filterBuffer();}if(W&&!U.fromUI){this._uiSetCheckbox(D,W,V[W]);}},_filterBuffer:function(){var U=this.get(F),W=this.get(D),T=this.get(O).buffer,X=null,V;for(V=T.length-1;V>=0;--V){if(!U[T[V].category]||!W[T[V].source]){X=X||V;}else{if(X){T.splice(V,(X-V));X=null;}}}if(X){T.splice(0,X+1);}},_afterCacheLimitChange:function(T){if(isFinite(T.newVal)){var U=this._entries.length-T.newVal;if(U>0){this._entries.splice(0,U);}}},refreshConsole:function(){var X=this._entries,b=this.get(O),Y=b.get("contentBox").one(R),U=b.get("consoleLimit"),a=this.get(F),T=this.get(D),V=[],W,Z;if(Y){b._cancelPrintLoop();for(W=X.length-1;W>=0&&U>=0;--W){Z=X[W];if(a[Z.category]&&T[Z.source]){V.unshift(Z);--U;}}Y.setContent(S);b.buffer=V;b.printBuffer();}},_uiSetCheckbox:function(U,X,W){if(U&&X){var T=U===F?this._categories:this._sources,Z=A+P(G,K,X),Y=T.one(Z),V;if(!Y){V=this.get(O);this._createCheckbox(T,X);Y=T.one(Z);V._uiSetHeight(V.get("height"));}Y.set(Q,W);}},_onCategoryCheckboxClick:function(V){var U=V.target,T;if(U.hasClass(J.CHROME_CLASSES.filter)){T=U.get("value");if(T&&T in this.get(F)){this.set(E+T,U.get(Q),{fromUI:true});}}},_onSourceCheckboxClick:function(U){var T=U.target,V;if(T.hasClass(J.CHROME_CLASSES.filter)){V=T.get("value");if(V&&V in this.get(D)){this.set(L+V,T.get(Q),{fromUI:true});}}},hideCategory:function(U,T){if(I(T)){C.Array.each(arguments,this.hideCategory,this);}else{this.set(E+U,false);}},showCategory:function(U,T){if(I(T)){C.Array.each(arguments,this.showCategory,this);}else{this.set(E+U,true);}},hideSource:function(U,T){if(I(T)){C.Array.each(arguments,this.hideSource,this);}else{this.set(L+U,false);}},showSource:function(U,T){if(I(T)){C.Array.each(arguments,this.showSource,this);}else{this.set(L+U,true);}},_createCheckbox:function(T,U){var W=C.merge(J.CHROME_CLASSES,{filter_name:U,filter_class:P(G,K,U)}),V=C.Node.create(C.substitute(J.FILTER_TEMPLATE,W));T.appendChild(V);},_validateCategory:function(T,U){return C.Lang.isObject(U,true)&&T.split(/\./).length<3;},_validateSource:function(U,T){return C.Lang.isObject(T,true)&&U.split(/\./).length<3;},_setCacheLimit:function(T){if(C.Lang.isNumber(T)){this._cacheLimit=T;return T;}else{return C.Attribute.INVALID_VALUE;}}},{NAME:"consoleFilters",NS:K,CATEGORIES_TEMPLATE:'<div class="{categories}"></div>',SOURCES_TEMPLATE:'<div class="{sources}"></div>',FILTER_TEMPLATE:'<label class="{filter_label}">'+'<input type="checkbox" value="{filter_name}" '+'class="{filter} {filter_class}"> {filter_name}'+"</label>&#8201;",CHROME_CLASSES:{categories:P(G,B,"categories"),sources:P(G,B,"sources"),category:P(G,K,F),source:P(G,K,D),filter:P(G,K),filter_label:P(G,K,"label")},ATTRS:{defaultVisibility:{value:true,validator:C.Lang.isBoolean},category:{value:{},validator:function(U,T){return this._validateCategory(T,U);}},source:{value:{},validator:function(U,T){return this._validateSource(T,U);}},cacheLimit:{value:Number.POSITIVE_INFINITY,setter:function(T){return this._setCacheLimit(T);}}}});},"3.3.0pr1",{requires:["console","plugin"]});