/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("resize-proxy",function(C){var N="activeHandleNode",I="cursor",G="dragCursor",L="host",K="parentNode",F="proxy",D="proxyNode",B="resize",A="resize-proxy",J="wrapper",E=C.ClassNameManager.getClassName,M=E(B,F);function H(){H.superclass.constructor.apply(this,arguments);}C.mix(H,{NAME:A,NS:F,ATTRS:{proxyNode:{setter:C.one,valueFn:function(){return C.Node.create(this.PROXY_TEMPLATE);}}}});C.extend(H,C.Plugin.Base,{PROXY_TEMPLATE:'<div class="'+M+'"></div>',initializer:function(){var O=this;O.afterHostEvent("resize:start",O._afterResizeStart);O.beforeHostMethod("_resize",O._beforeHostResize);O.afterHostMethod("_resizeEnd",O._afterHostResizeEnd);},destructor:function(){var O=this;O.get(D).remove(true);},_afterHostResizeEnd:function(Q){var O=this,P=Q.dragEvent.target;P.actXY=[];O._syncProxyUI();O.get(D).hide();},_afterResizeStart:function(P){var O=this;O._renderProxy();},_beforeHostResize:function(Q){var O=this,P=this.get(L);P._handleResizeAlignEvent(Q.dragEvent);O._syncProxyUI();return new C.Do.Prevent();},_renderProxy:function(){var O=this,Q=this.get(L),P=O.get(D);if(!P.inDoc()){Q.get(J).get(K).append(P.hide());}},_syncProxyUI:function(){var O=this,Q=this.get(L),S=Q.info,R=Q.get(N),P=O.get(D),T=R.getStyle(I);P.show().setStyle(I,T);Q.delegate.dd.set(G,T);Q._setOffset(P,S.offsetWidth,S.offsetHeight);P.setXY([S.left,S.top]);}});C.namespace("Plugin");C.Plugin.ResizeProxy=H;},"3.3.0pr1",{requires:["resize-base","plugin"],skinnable:false});