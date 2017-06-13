/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
(function(){var b,f=YUI.Env,d=YUI.config,g=d.doc,c=g&&g.documentElement,e="onreadystatechange",a=d.pollInterval||40;if(c.doScroll&&!f._ieready){f._ieready=function(){f._ready();};
/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(self!==self.top){b=function(){if(g.readyState=="complete"){f.Env.remove(g,e,b);f.ieready();}};f.Env.add(g,e,b);}else{f._dri=setInterval(function(){try{c.doScroll("left");clearInterval(f._dri);f._dri=null;f._ieready();}catch(h){}},a);}}})();YUI.add("event-base-ie",function(b){var a=function(){b.DOM2EventFacade.apply(this,arguments);};b.extend(a,b.DOM2EventFacade,{init:function(){a.superclass.init.apply(this,arguments);var i=this._event,h=b.DOM2EventFacade.resolve,f,l,j,c,k,g;this.target=h(i.srcElement);if(("clientX" in i)&&(!f)&&(0!==f)){f=i.clientX;l=i.clientY;j=b.config.doc;c=j.body;k=j.documentElement;f+=(k.scrollLeft||(c&&c.scrollLeft)||0);l+=(k.scrollTop||(c&&c.scrollTop)||0);this.pageX=f;this.pageY=l;}if(i.type=="mouseout"){g=i.toElement;}else{if(i.type=="mouseover"){g=i.fromElement;}}this.relatedTarget=h(g);if(i.button){switch(i.button){case 2:this.which=3;break;case 4:this.which=2;break;default:this.which=i.button;}this.button=this.which;}},stopPropagation:function(){var c=this._event;c.cancelBubble=true;this._wrapper.stopped=1;this.stopped=1;},stopImmediatePropagation:function(){this.stopPropagation();this._wrapper.stopped=2;this.stopped=2;},preventDefault:function(c){this._event.returnValue=c||false;this._wrapper.prevented=1;this.prevented=1;}});if(b.UA.ie){b.DOMEventFacade=a;}},"3.3.0pr1");