/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("recordset-filter",function(D){var C=D.Array,B=D.Lang;function A(E){A.superclass.constructor.apply(this,arguments);}D.mix(A,{NS:"filter",NAME:"recordsetFilter",ATTRS:{}});D.extend(A,D.Plugin.Base,{initializer:function(E){},destructor:function(E){},filter:function(J,F){var I=this.get("host").get("records"),E=I.length,G=0,K=[],H=J;if(B.isString(J)&&B.isValue(F)){H=function(L){if(L.getValue(J)===F){return true;}else{return false;}};}K=C.filter(I,H);return new D.Recordset({records:K});},reject:function(E){return new D.Recordset({records:C.reject(this.get("host").get("records"),E)});},grep:function(E){return new D.Recordset({records:C.grep(this.get("host").get("records"),E)});}});D.namespace("Plugin").RecordsetFilter=A;},"3.3.0pr1",{requires:["recordset-base","plugin","array-extras"]});