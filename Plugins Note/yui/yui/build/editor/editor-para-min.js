/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("editor-para",function(A){var D=function(){D.superclass.constructor.apply(this,arguments);},K="host",F="body",C="nodeChange",J="parentNode",B=F+" > p",H="p",G="<br>",I="firstChild",E="li";A.extend(D,A.Base,{_fixFirstPara:function(){var L=this.get(K),N=L.getInstance(),M;N.one("body").set("innerHTML","<"+H+">"+N.Selection.CURSOR+"</"+H+">");M=new N.Selection();M.focusCursor(true,false);},_onNodeChange:function(j){var Z=this.get(K),O=Z.getInstance(),T,Y,X,l,h,b=O.Selection.DEFAULT_BLOCK_TAG,U,M,Q,i,S,L,a,f,R,g,m,k,c,W,V;switch(j.changedType){case"enter":if(A.UA.webkit){if(j.changedEvent.shiftKey){Z.execCommand("insertbr");j.changedEvent.preventDefault();}}if(A.UA.gecko&&Z.get("defaultblock")!=="p"){X=j.changedNode;if(!X.test(E)&&!X.ancestor(E)){if(!X.test(b)){X=X.ancestor(b);}l=O.Node.create("<"+b+"></"+b+">");X.insert(l,"after");h=new O.Selection();if(h.anchorOffset){U=h.anchorNode.get("textContent");Y=O.one(O.config.doc.createTextNode(U.substr(0,h.anchorOffset)));M=O.one(O.config.doc.createTextNode(U.substr(h.anchorOffset)));i=h.anchorNode;i.setContent("");L=i.cloneNode();L.append(M);a=false;R=i;while(!a){R=R.get(J);if(R&&!R.test(b)){f=R.cloneNode();f.set("innerHTML","");f.append(L);Q=R.get("childNodes");var P=false;Q.each(function(d){if(P){f.append(d);}if(d===i){P=true;}});i=R;L=f;}else{a=true;}}M=L;h.anchorNode.append(Y);if(M){l.append(M);}}if(l.get(I)){l=l.get(I);}l.prepend(O.Selection.CURSOR);h.focusCursor(true,true);T=O.Selection.getText(l);if(T!==""){O.Selection.cleanCursor();}j.changedEvent.preventDefault();}}break;case"keydown":if(O.config.doc.childNodes.length<2){var N=O.config.doc.body.innerHTML;if(N&&N.length<5&&N.toLowerCase()==G){this._fixFirstPara();}}break;case"backspace-up":case"backspace-down":case"delete-up":if(!A.UA.ie){g=O.all(B);k=O.one(F);if(g.item(0)){k=g.item(0);}m=k.one("br");if(m){m.removeAttribute("id");m.removeAttribute("class");}Y=O.Selection.getText(k);Y=Y.replace(/ /g,"").replace(/\n/g,"");W=k.all("img");if(Y.length===0&&!W.size()){if(!k.test(H)){this._fixFirstPara();}c=null;if(j.changedNode&&j.changedNode.test(H)){c=j.changedNode;}if(!c&&Z._lastPara&&Z._lastPara.inDoc()){c=Z._lastPara;}if(c&&!c.test(H)){c=c.ancestor(H);}if(c){if(!c.previous()&&c.get(J)&&c.get(J).test(F)){j.changedEvent.frameEvent.halt();}}}if(A.UA.webkit){if(j.changedNode){k=j.changedNode;if(k.test("li")&&(!k.previous()&&!k.next())){T=k.get("innerHTML").replace(G,"");if(T===""){if(k.get(J)){k.get(J).replace(O.Node.create(G));j.changedEvent.frameEvent.halt();j.preventDefault();O.Selection.filterBlocks();}}}}}}if(A.UA.gecko){l=j.changedNode;V=O.config.doc.createTextNode(" ");l.appendChild(V);l.removeChild(V);}break;}},_afterEditorReady:function(){var M=this.get(K),N=M.getInstance(),L;if(N){N.Selection.filterBlocks();L=N.Selection.DEFAULT_BLOCK_TAG;B=F+" > "+L;H=L;}},_afterContentChange:function(){var L=this.get(K),M=L.getInstance();if(M&&M.Selection){M.Selection.filterBlocks();}},_afterPaste:function(){var L=this.get(K),N=L.getInstance(),M=new N.Selection();A.later(50,L,function(){N.Selection.filterBlocks();});},initializer:function(){var L=this.get(K);L.on(C,A.bind(this._onNodeChange,this));L.after("ready",A.bind(this._afterEditorReady,this));L.after("contentChange",A.bind(this._afterContentChange,this));if(A.Env.webkit){L.after("dom:paste",A.bind(this._afterPaste,this));}}},{NAME:"editorPara",NS:"editorPara",ATTRS:{host:{value:false}}});A.namespace("Plugin");A.Plugin.EditorPara=D;},"3.3.0pr1",{requires:["node"],skinnable:false});