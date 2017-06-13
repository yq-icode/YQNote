/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("event-custom-complex",function(f){var b,e,d={},a=f.CustomEvent.prototype,c=f.EventTarget.prototype;f.EventFacade=function(h,g){h=h||d;this._event=h;this.details=h.details;this.type=h.type;this._type=h.type;this.target=h.target;this.currentTarget=g;this.relatedTarget=h.relatedTarget;};f.extend(f.EventFacade,Object,{stopPropagation:function(){this._event.stopPropagation();this.stopped=1;},stopImmediatePropagation:function(){this._event.stopImmediatePropagation();this.stopped=2;},preventDefault:function(){this._event.preventDefault();this.prevented=1;},halt:function(g){this._event.halt(g);this.prevented=1;this.stopped=(g)?2:1;}});a.fireComplex=function(o){var p=f.Env._eventstack,k,g,m,h,n,t,i,s=this,r=s.host||s,l,j;if(p){if(s.queuable&&s.type!=p.next.type){s.log("queue "+s.type);p.queue.push([s,o]);return true;}}else{f.Env._eventstack={id:s.id,next:s,silent:s.silent,stopped:0,prevented:0,bubbling:null,type:s.type,afterQueue:new f.Queue(),defaultTargetOnly:s.defaultTargetOnly,queue:[]};p=f.Env._eventstack;}i=s.getSubs();s.stopped=(s.type!==p.type)?0:p.stopped;s.prevented=(s.type!==p.type)?0:p.prevented;s.target=s.target||r;t=new f.EventTarget({fireOnce:true,context:r});s.events=t;if(s.preventedFn){t.on("prevented",s.preventedFn);}if(s.stoppedFn){t.on("stopped",s.stoppedFn);}s.currentTarget=r;s.details=o.slice();s.log("Firing "+s.type);s._facade=null;k=s._getFacade(o);if(f.Lang.isObject(o[0])){o[0]=k;}else{o.unshift(k);}if(i[0]){s._procSubs(i[0],o,k);}if(s.bubbles&&r.bubble&&!s.stopped){j=p.bubbling;p.bubbling=s.type;if(p.type!=s.type){p.stopped=0;p.prevented=0;}n=r.bubble(s);s.stopped=Math.max(s.stopped,p.stopped);s.prevented=Math.max(s.prevented,p.prevented);p.bubbling=j;}if(s.defaultFn&&!s.prevented&&((!s.defaultTargetOnly&&!p.defaultTargetOnly)||r===k.target)){s.defaultFn.apply(r,o);}s._broadcast(o);if(i[1]&&!s.prevented&&s.stopped<2){if(p.id===s.id||s.type!=r._yuievt.bubbling){s._procSubs(i[1],o,k);while((l=p.afterQueue.last())){l();}}else{p.afterQueue.add(function(){s._procSubs(i[1],o,k);});}}s.target=null;if(p.id===s.id){m=p.queue;while(m.length){g=m.pop();h=g[0];p.next=h;h.fire.apply(h,g[1]);}f.Env._eventstack=null;}n=!(s.stopped);if(s.type!=r._yuievt.bubbling){p.stopped=0;p.prevented=0;s.stopped=0;s.prevented=0;}return n;};a._getFacade=function(){var g=this._facade,j,i,h=this.details;if(!g){g=new f.EventFacade(this,this.currentTarget);}j=h&&h[0];if(f.Lang.isObject(j,true)){i={};f.mix(i,g,true,e);f.mix(g,j,true);f.mix(g,i,true,e);g.type=j.type||g.type;}g.details=this.details;g.target=this.originalTarget||this.target;g.currentTarget=this.currentTarget;g.stopped=0;g.prevented=0;this._facade=g;return this._facade;};a.stopPropagation=function(){this.stopped=1;f.Env._eventstack.stopped=1;this.events.fire("stopped",this);};a.stopImmediatePropagation=function(){this.stopped=2;f.Env._eventstack.stopped=2;this.events.fire("stopped",this);};a.preventDefault=function(){if(this.preventable){this.prevented=1;f.Env._eventstack.prevented=1;this.events.fire("prevented",this);}};a.halt=function(g){if(g){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};c.addTarget=function(g){this._yuievt.targets[f.stamp(g)]=g;this._yuievt.hasTargets=true;};c.getTargets=function(){return f.Object.values(this._yuievt.targets);};c.removeTarget=function(g){delete this._yuievt.targets[f.stamp(g)];};c.bubble=function(u,q,o){var m=this._yuievt.targets,p=true,v,r=u&&u.type,h,l,n,j,g=o||(u&&u.target)||this,s=f.Env._eventstack,k;if(!u||((!u.stopped)&&m)){for(l in m){if(m.hasOwnProperty(l)){v=m[l];h=v.getEvent(r,true);j=v.getSibling(r,h);if(j&&!h){h=v.publish(r);}k=v._yuievt.bubbling;v._yuievt.bubbling=r;if(!h){if(v._yuievt.hasTargets){v.bubble(u,q,g);}}else{h.sibling=j;h.target=g;h.originalTarget=g;h.currentTarget=v;n=h.broadcast;h.broadcast=false;h.emitFacade=true;p=p&&h.fire.apply(h,q||u.details||[]);h.broadcast=n;h.originalTarget=null;if(h.stopped){break;}}v._yuievt.bubbling=k;}}}return p;};b=new f.EventFacade();e=f.Object.keys(b);},"3.3.0pr1",{requires:["event-custom-base"]});