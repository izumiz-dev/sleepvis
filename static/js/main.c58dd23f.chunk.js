(this.webpackJsonpsleepvis=this.webpackJsonpsleepvis||[]).push([[0],{20:function(e,n,t){},24:function(e,n,t){"use strict";t.r(n);var r,i,a,c,d,s,o,u=t(0),l=t.n(u),f=t(12),j=t.n(f),p=(t(20),t(2)),b=t(10),m=t(3),x=t(1),O=function(e){var n=e.duration;return Object(x.jsx)(g,{duration:n,children:n})},g=m.a.div(r||(r=Object(p.a)(["\n  display: flex;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  border-radius: 4px;\n  height: ",";\n  width: 60px;\n  margin: 4px;\n  color: white;\n  background: ",";\n"])),(function(e){return h(e.duration)}),(function(e){return y(e.duration)})),y=function(e){var n=parseInt(e,10);return n>=8?"#43a2e2dd":n>=6?"#54c454dd":n>=4?"#c47636dd":n>=2?"#DD0000dd":"#000000dd"},h=function(e){var n=parseInt(e,10);return"".concat(1.5*n+20,"px")},v=function(e){var n=e.setInputFile,t=Object(u.useCallback)((function(e){null!==e.currentTarget.files&&n(e.currentTarget.files[0])}),[n]);return Object(x.jsx)("div",{style:{background:"#FFFFFFDD",padding:"4px",margin:"8px"},children:Object(x.jsx)("input",{type:"file",accept:"text",onChange:t})})},T=t(5),F=t(8),w=t(9),k=function(){var e=Object(u.useState)(),n=Object(b.a)(e,2),t=n[0],r=n[1],i=Object(u.useState)(""),a=Object(b.a)(i,2),c=a[0],d=a[1];Object(u.useEffect)((function(){if(t){var e=new FileReader;e.onload=function(){return d(e.result)},e.readAsText(t,"UTF-8")}}),[t]);var s=function(e){if(""===e)return!1;var n=e.split("\r\n");n.pop();for(var t=n.map((function(e){var n=e.split(",");return{startTime:w.DateTime.fromFormat(n[0],"yyyy-MM-dd HH:mm:ss"),endTime:w.DateTime.fromFormat(n[1],"yyyy-MM-dd HH:mm:ss"),duration:n[2],sleepTime:n[3],wakingInBed:n[4],timeToSleep:n[5],goodQuality:n[6],deepSleep:n[7],heartRate:n[8],tag:n[9],annotation:n[10]}})).slice(1),r=t.reduce((function(e,n){return Object(F.a)(Object(F.a)({},e),{},Object(T.a)({},n.endTime.toFormat("yyyy-MM-dd-EEE"),n))}),{}),i=7!==t[0].endTime.weekday?t[0].endTime.startOf("week").minus({days:1}):t[0].endTime.startOf("day"),a=t[t.length-1].endTime.endOf("week").startOf("day").diff(i,"days").days,c=[],d=0,s=0;s<a;s++){var o=i.plus({days:s}).toFormat("yyyy-MM-dd-EEE");d===c.length&&c.push([]),c[d].push(r[o]?r[o]:o),s%7===6&&d++}return c}(c);return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(M,{children:[Object(x.jsx)(S,{children:"Sleepvis"}),Object(x.jsxs)(D,{children:["Autosleep\u30a2\u30d7\u30ea\u306eCSV\u3092\u53ef\u8996\u5316\u3059\u308bWeb\u30a2\u30d7\u30ea\u3067\u3059\uff0e",Object(x.jsx)("br",{}),"\u968f\u6642\u6a5f\u80fd\u8ffd\u52a0\u4e2d\u3067\u3059\uff0e\u73fe\u72b6\u306f\uff0c\u7761\u7720\u6642\u9593\u306e\u8868\u793a\u6a5f\u80fd\u306e\u307f\u306b\u306a\u308a\u307e\u3059\uff0e",Object(x.jsx)("br",{}),"\u4e0b\u306e\u30d5\u30a1\u30a4\u30eb\u3092\u9078\u629e\u30dc\u30bf\u30f3\u304b\u3089\u30a8\u30af\u30b9\u30dd\u30fc\u30c8\u3057\u305fCSV\u30d5\u30a1\u30a4\u30eb\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\uff0e"]}),Object(x.jsx)(v,{setInputFile:r}),Object(x.jsx)(I,{children:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((function(e){return Object(x.jsx)(C,{children:Object(x.jsx)(O,{duration:e})})}))}),s&&Object(x.jsx)(I,{children:s.flat().map((function(e){return console.log(e),"string"!==typeof e&&void 0!==e.endTime?Object(x.jsxs)(C,{children:[Object(x.jsx)(E,{children:e.endTime.setLocale("jp").toFormat("MM/dd")}),Object(x.jsx)(O,{duration:e.sleepTime})]}):Object(x.jsxs)(C,{children:[Object(x.jsx)(E,{children:"".concat(e.toString().substring(5,10).replace("-","/"))}),Object(x.jsx)(O,{duration:"NoData"})]})}))})]})})},M=m.a.div(i||(i=Object(p.a)(["\n  margin-top: 2em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: column;\n"]))),S=m.a.h1(a||(a=Object(p.a)(["\n  color: #ffffff;\n"]))),D=m.a.div(c||(c=Object(p.a)(["\n  color: #ffffff;\n"]))),E=m.a.div(d||(d=Object(p.a)(["\n  color: white;\n  margin-top: 2px;\n"]))),C=m.a.div(s||(s=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-flow: column;\n  height: 80px;\n  border: 1px ridge #ffffff99;\n  /* border-radius: 4px; */\n  background: linear-gradient(#08176d99, #01010799);\n  margin: 1px;\n"]))),I=m.a.div(o||(o=Object(p.a)(["\n  width: calc(74px * 7);\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-end;\n"]))),H=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,25)).then((function(n){var t=n.getCLS,r=n.getFID,i=n.getFCP,a=n.getLCP,c=n.getTTFB;t(e),r(e),i(e),a(e),c(e)}))};j.a.render(Object(x.jsx)(l.a.StrictMode,{children:Object(x.jsx)(k,{})}),document.getElementById("root")),H()}},[[24,1,2]]]);
//# sourceMappingURL=main.c58dd23f.chunk.js.map