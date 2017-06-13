/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0pr1
build: 10
*/
YUI.add("recordset-sort, arraysort",function(C){var A=C.ArraySort.compare;function B(D,E,F){B.superclass.constructor.apply(this,arguments);}C.mix(B,{NS:"sort",NAME:"recordsetSort",ATTRS:{dt:{},defaultSorter:{value:function(F,D,G,H){var E=A(F.getValue(G),D.getValue(G),H);if(E===0){return A(F.get("id"),D.get("id"),H);}else{return E;}}}}});C.extend(B,C.Plugin.Base,{initializer:function(D){this.addTarget(this.get("dt"));this.publish("sort",{defaultFn:C.bind("_defSortFn",this)});},destructor:function(D){},_defSortFn:function(D){this.get("host").get("records").sort(function(F,E){return(D.sorter)(F,E,D.field,D.desc);});},sort:function(D,E,F){this.fire("sort",{field:D,desc:E,sorter:F||this.get("defaultSorter")});},custom:function(){alert("sort custom");},asc:function(){alert("sort asc");},desc:function(){alert("sort desc");},reverse:function(){alert("sort reverse");}});C.namespace("Plugin").RecordsetSort=B;},"3.3.0pr1",{requires:["recordset-base"]});