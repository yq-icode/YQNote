/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("dom-style-ie",function(a){(function(d){var y="hasLayout",l="px",m="filter",b="filters",v="opacity",o="auto",h="borderWidth",k="borderTopWidth",s="borderRightWidth",x="borderBottomWidth",i="borderLeftWidth",j="width",q="height",t="transparent",u="visible",c="getComputedStyle",A=undefined,z=d.config.doc.documentElement,r=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,n=(d.UA.ie>=8),f=function(e){return e.currentStyle||e.style;},p={CUSTOM_STYLES:{},get:function(e,C){var B="",D;if(e){D=f(e)[C];if(C===v&&d.DOM.CUSTOM_STYLES[v]){B=d.DOM.CUSTOM_STYLES[v].get(e);}else{if(!D||(D.indexOf&&D.indexOf(l)>-1)){B=D;}else{if(d.DOM.IE.COMPUTED[C]){B=d.DOM.IE.COMPUTED[C](e,C);}else{if(r.test(D)){B=p.getPixel(e,C)+l;}else{B=D;}}}}}return B;},sizeOffsets:{width:["Left","Right"],height:["Top","Bottom"],top:["Top"],bottom:["Bottom"]},getOffset:function(C,e){var G=f(C)[e],H=e.charAt(0).toUpperCase()+e.substr(1),D="offset"+H,B="pixel"+H,F=p.sizeOffsets[e],E=C.ownerDocument.compatMode,I="";if(G===o||G.indexOf("%")>-1){I=C["offset"+H];if(E!=="BackCompat"){if(F[0]){I-=p.getPixel(C,"padding"+F[0]);I-=p.getBorderWidth(C,"border"+F[0]+"Width",1);}if(F[1]){I-=p.getPixel(C,"padding"+F[1]);I-=p.getBorderWidth(C,"border"+F[1]+"Width",1);}}}else{if(!C.style[B]&&!C.style[e]){C.style[e]=G;}I=C.style[B];}return I+l;},borderMap:{thin:(n)?"1px":"2px",medium:(n)?"3px":"4px",thick:(n)?"5px":"6px"},getBorderWidth:function(B,D,e){var C=e?"":l,E=B.currentStyle[D];if(E.indexOf(l)<0){if(p.borderMap[E]&&B.currentStyle.borderStyle!=="none"){E=p.borderMap[E];}else{E=0;}}return(e)?parseFloat(E):E;},getPixel:function(C,e){var E=null,B=f(C),F=B.right,D=B[e];C.style.right=D;E=C.style.pixelRight;C.style.right=F;return E;},getMargin:function(C,e){var D,B=f(C);if(B[e]==o){D=0;}else{D=p.getPixel(C,e);}return D+l;},getVisibility:function(B,e){var C;while((C=B.currentStyle)&&C[e]=="inherit"){B=B.parentNode;}return(C)?C[e]:u;},getColor:function(B,e){var C=f(B)[e];if(!C||C===t){d.DOM.elementByAxis(B,"parentNode",null,function(D){C=f(D)[e];if(C&&C!==t){B=D;return true;}});}return d.Color.toRGB(C);},getBorderColor:function(B,e){var C=f(B),D=C[e]||C.color;return d.Color.toRGB(d.Color.toHex(D));}},g={};if(d.UA.ie&&d.UA.ie<9){d.DOM.CUSTOM_STYLES[v]={get:function(C){var E=100;try{E=C[b]["DXImageTransform.Microsoft.Alpha"][v];}catch(D){try{E=C[b]("alpha")[v];}catch(B){}}return E/100;},set:function(B,E,e){var D,C;if(E===""){C=f(B);D=(v in C)?C[v]:1;E=D;}if(typeof e[m]=="string"){e[m]="alpha("+v+"="+E*100+")";if(!B.currentStyle||!B.currentStyle[y]){e.zoom=1;}}}};}try{d.config.doc.createElement("div").style.height="-1px";}catch(w){d.DOM.CUSTOM_STYLES.height={set:function(C,D,B){var e=parseFloat(D);if(isNaN(e)||e>=0){B.height=D;}else{}}};d.DOM.CUSTOM_STYLES.width={set:function(C,D,B){var e=parseFloat(D);if(isNaN(e)||e>=0){B.width=D;}else{}}};}g[j]=g[q]=p.getOffset;g.color=g.backgroundColor=p.getColor;g[h]=g[k]=g[s]=g[x]=g[i]=p.getBorderWidth;g.marginTop=g.marginRight=g.marginBottom=g.marginLeft=p.getMargin;g.visibility=p.getVisibility;g.borderColor=g.borderTopColor=g.borderRightColor=g.borderBottomColor=g.borderLeftColor=p.getBorderColor;if(!d.config.win[c]){d.DOM[c]=p.get;}d.namespace("DOM.IE");d.DOM.IE.COMPUTED=g;d.DOM.IE.ComputedStyle=p;})(a);},"3.3.0pr1",{requires:["dom-style"]});