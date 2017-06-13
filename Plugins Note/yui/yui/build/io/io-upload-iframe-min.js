/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("io-upload-iframe",function(c){var m=c.config.win,i=c.config.doc,h=(i.documentMode&&i.documentMode>=8);function f(t,r){var u=[],d=r.split("="),q,p;for(q=0,p=d.length-1;q<p;q++){u[q]=i.createElement("input");u[q].type="hidden";u[q].name=d[q].substring(d[q].lastIndexOf("&")+1);u[q].value=(q+1===p)?d[q+1]:d[q+1].substring(0,(d[q+1].lastIndexOf("&")));t.appendChild(u[q]);}return u;}function j(q,r){var p,d;for(p=0,d=r.length;p<d;p++){q.removeChild(r[p]);}}function g(p,q,d){p.setAttribute("action",d);p.setAttribute("method","POST");p.setAttribute("target","ioupload"+q);p.setAttribute(c.UA.ie&&!h?"encoding":"enctype","multipart/form-data");}function o(q,d){var r;for(r in d){if(d.hasOwnProperty(d,r)){if(d[r]){q.setAttribute(r,q[r]);}else{q.removeAttribute(r);}}}}function e(d,p){c.io._timeout[d.id]=m.setTimeout(function(){var q={id:d.id,status:"timeout"};c.io.complete(q,p);c.io.end(q,p);},p.timeout);}function l(d){m.clearTimeout(c.io._timeout[d]);delete c.io._timeout[d];}function k(d){c.Event.purgeElement("#ioupload"+d,false);c.one("body").removeChild(c.one("#ioupload"+d));}function a(t,u){var s=c.one("#ioupload"+t.id).get("contentWindow.document"),q=s.one("body"),r;if(u.timeout){l(t.id);}if(q){r=q.query("pre:first-child");t.c.responseText=r?r.get("text"):q.get("text");}else{t.c.responseXML=s._node;}c.io.complete(t,u);c.io.end(t,u);m.setTimeout(function(){k(t.id);},0);}function n(p,q){var d=c.Node.create('<iframe id="ioupload'+p.id+'" name="ioupload'+p.id+'" />');d._node.style.position="absolute";d._node.style.top="-1000px";d._node.style.left="-1000px";c.one("body").appendChild(d);c.on("load",function(){a(p,q);},"#ioupload"+p.id);}function b(s,q,t){var r=(typeof t.form.id==="string")?i.getElementById(t.form.id):t.form.id,p,d={action:r.getAttribute("action"),target:r.getAttribute("target")};g(r,s.id,q);if(t.data){p=f(r,t.data);}if(t.timeout){e(s,t);}r.submit();c.io.start(s.id,t);if(t.data){j(r,p);}o(r,d);return{id:s.id,abort:function(){var u={id:s.id,status:"abort"};if(c.one("#ioupload"+s.id)){k(s.id);c.io.complete(u,t);c.io.end(u,t);}else{return false;}},isInProgress:function(){return c.one("#ioupload"+s.id)?true:false;}};}c.mix(c.io,{upload:function(p,d,q){n(p,q);return b(p,d,q);}});},"3.3.0pr1",{requires:["io-base","node-base"]});