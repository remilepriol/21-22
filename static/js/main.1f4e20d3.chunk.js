(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e){e.exports=[{src:"./thumbs/clients/Auremi|cap",width:1500,height:1125,category:"clients",filter:"clients",name:"Aure\u0301mi|cap"},{src:"./thumbs/clients/Auremi|plage",width:1500,height:1125,category:"clients",filter:"clients",name:"Aure\u0301mi|plage"},{src:"./thumbs/redirections/soleil_marin",width:1500,height:1125,category:"redirections",filter:"redirections",name:"soleil marin"},{src:"./thumbs/redirections/crique",width:1125,height:1500,category:"redirections",filter:"redirections",name:"crique"},{src:"./thumbs/outils/Fresque_du_Climat",width:1500,height:1125,category:"outils",filter:"outils",name:"Fresque du Climat"},{src:"./thumbs/raison/La_courbe_est_raide",width:1500,height:1440,category:"raison",filter:"raison",name:"La courbe est raide"},{src:"./thumbs/raison/Notre_nom",width:1500,height:1061,category:"raison",filter:"raison",name:"Notre nom"},{src:"./thumbs/blog/Changer_de_cap",width:1500,height:1125,category:"blog",filter:"blog",name:"Changer de cap"},{src:"./thumbs/blog/Paris_-_New_York",width:1500,height:1157,category:"blog",filter:"blog",name:"Paris - New York"},{src:"./thumbs/equipe/Equipe",width:1500,height:1127,category:"equipe",filter:"equipe",name:"E\u0301quipe"}]},34:function(e,t,n){e.exports=n(42)},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(10),a=n(27),i=n(7),c=n(28),o=n(0),l=n.n(o),u=n(11),s=n(33),m=n(44),h=n(45),f=n(46),d=n(29),g=n.n(d);function b(e,t,n){return{top:n,bottom:n+e.height,left:t,right:t+e.width}}function p(e,t,n,r,a,i,c){var o=b(e,t,n),l=b(r,a,i);return o.left-c<l.right&&o.right+c>l.left&&o.top-c<l.bottom&&o.bottom+c>l.top}function v(e,t){return(e%t+t)%t}n(40);function w(e){var t=e.name,n=e.title;return l.a.createElement("img",{src:"./icons/".concat(t,".svg"),className:"picto",alt:n})}function E(e){var t=e.onHomeClick,n=e.onZoomClick,r=e.onShuffleClick;e.onLanguageClick;return l.a.createElement("div",{className:"chrome zoom"},l.a.createElement("div",{className:"chrome-button zoom-home",onClick:t},l.a.createElement(w,{name:"home",title:"home"})),l.a.createElement("div",{className:"chrome-button zoom-plus",onClick:n.bind(null,1)},"+"),l.a.createElement("div",{className:"chrome-button zoom-minus",onClick:n.bind(null,-1)},"-"),l.a.createElement("div",{className:"chrome-button zoom-shuffle",onClick:r},l.a.createElement(w,{name:"shuffle",title:"shuffle"})))}function y(e){var t=e.onClick;return l.a.createElement("div",{className:"chrome arrow"},l.a.createElement("div",{className:"chrome-button arrow-left",onClick:t.bind(null,-1)},l.a.createElement(w,{name:"f-gauche",title:"left"})),l.a.createElement("div",{className:"chrome-button arrow-right",onClick:t.bind(null,1)},l.a.createElement(w,{name:"f-droite",title:"right"})))}function j(e){var t=e.filters,n=e.name,r=e.label,a=e.onChange;return l.a.createElement("div",{className:"menu-filters-option",onClick:a.bind(null,n)},l.a.createElement(w,{name:t[n]?"carre-plein":"carre-vide"})," ",r)}function O(e){var t=e.filters,n=e.filtersNames,r=e.onFilterClick,a=e.isMobile,c=Object(o.useState)(!a),s=Object(i.a)(c,2),m=s[0],h=s[1],f=Object(u.b)({from:{height:0},height:m?260:0,angle:m?1:0,config:{duration:200}}),d=f.height,g=f.angle,b=[];for(var p in t)b.push(l.a.createElement(j,{filters:t,name:p,key:p,label:n[p],onChange:r}));return l.a.createElement("div",{className:"chrome menu"},l.a.createElement("img",{src:"./icons/2122-Logo_Cercle.jpg",className:"logo",alt:"logo cercle"}),l.a.createElement(u.a.div,{style:{height:d.interpolate(function(e){return"".concat(e,"px")}),overflow:"hidden"}},l.a.createElement("div",{className:"menu-section menu-contact"},l.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"mailto:contact@21-22.com"},"contact@21-22.com")),l.a.createElement("div",{className:"menu-section menu-filters"},b)),l.a.createElement("div",{className:"menu-collapse"}),l.a.createElement(u.a.div,{className:"close-button",onClick:function(){return h(!m)},style:{transform:g.interpolate(function(e){return"rotate(".concat(180*e,"deg)")})}},l.a.createElement(w,{name:"f-basse"})))}n(41);var k=n(30),x=Object(m.a)(k),C=.2,N={raison:!0,equipe:!0,outils:!0,clients:!0,redirections:!0,blog:!0},M={blog:"Blog",clients:"Clients",equipe:"\xc9quipe",outils:"Outils",raison:"Raison d'\xcatre",redirections:"Redirections"},_={x:0,y:0},q=300,S=400,z=1.7,A=.04,D=.1,H=1.3,I=20;function L(e,t){var n=[];return e.forEach(function(r){if(t[r.filter]){for(var a=Object(h.a)(-50,50)*S,i=Object(h.a)(-50,50)*S,c=0,o=0,l=!0;l;){l=!1,(c+=Object(h.a)(10,25)/180*Math.PI)>2*Math.PI&&(o+=50),a=Math.floor(Math.cos(c)*o),i=Math.floor(Math.sin(c)*o);for(var u=0;u<n.length;u++){var s=n[u];l=l||p(r,a,i,e[u],s[0],s[1],q)}}n.push([a,i])}else n.push([0,0])}),n}function P(e,t,n,r){var a=window.innerWidth/2,i=window.innerHeight/2;return function(c){return{xys:[a+(e.current[c][0]+t.current.x)*n.current,i+(e.current[c][1]+t.current.y)*n.current,n.current],display:r[x[c].filter]?"block":"none"}}}function R(e){var t=e.xys,n=e.cutoff,r=e.text;return l.a.createElement(u.a.span,{style:{display:t.interpolate(function(e,t,r){return r>n?"inline":"none"})}}," | ",r)}var F=new g.a(window.navigator.userAgent).mobile();document.getElementById("root").addEventListener("wheel",function(e){e.preventDefault()}),Object(c.render)(l.a.createElement(function(){var e=Object(o.useRef)(C),t=Object(o.useRef)(_),n=Object(o.useState)(N),c=Object(i.a)(n,2),m=c[0],h=c[1],d=Object(o.useRef)(L(x,m)),g=Object(o.useState)(null),b=Object(i.a)(g,2),p=b[0],w=b[1],j=Object(u.c)(x.length,P(d,t,e,m)),k=Object(i.a)(j,2),q=k[0],S=k[1],W=Object(s.a)({onDrag:function(n){var r=Object(i.a)(n.vxvy,2),a=r[0],c=r[1];document.body.style.cursor="url('./icons/carre-fleche.svg'), move",t.current={x:a*I/e.current+t.current.x,y:c*I/e.current+t.current.y},S(P(d,t,e,m))},onDragEnd:function(){document.body.style.cursor="default"},onPinch:function(n){var r=Object(i.a)(n.previous,2),a=r[0],c=(r[1],Object(i.a)(n.da,2)),o=c[0];if(c[1],F){var l=Math.pow(o/a,2);e.current=Object(f.a)(e.current*l,A,H),S(P(d,t,e,m))}},onWheel:function(n){var r=Object(i.a)(n.delta,2),a=(r[0],r[1]);if(!F){var c=1-a*(H-A)/1e4;e.current=Object(f.a)(e.current*c,A,H),S(P(d,t,e,m))}}}),B=function(n){e.current=Object(f.a)(n>0?z*e.current:e.current/z,A,H),S(P(d,t,e,m))},J=function(n){var r=d.current[n],a=x[n];w(n),e.current=Math.min(window.innerWidth/(a.width+20),window.innerHeight/(a.height+20)),t.current={x:-r[0]-a.width/2,y:-r[1]-a.height/2},S(P(d,t,e,m))},Y=!1;return l.a.createElement("div",Object.assign({},W(),{id:"container",onDoubleClick:B.bind(null,1)}),l.a.createElement(E,{onHomeClick:function(){e.current=C,t.current=_,h(N),d.current=L(x,N),S(P(d,t,e,m))},onZoomClick:B,onShuffleClick:function(){d.current=L(x,m),S(P(d,t,e,m))}}),l.a.createElement(y,{onClick:function(e){var t=null===p?0:v(p+e,x.length-1);for(console.log(t);!m[x[t].filter];)t=v(t+e,x.length-1);J(t)}}),l.a.createElement(O,{filters:m,filtersNames:M,onFilterClick:function(n){var i=Object(a.a)({},m,Object(r.a)({},n,!m[n]));h(i),w(0),e.current=C,d.current=L(x,i),S(P(d,t,e,i))},isMobile:F}),l.a.createElement(u.a.div,{id:"map"},q.map(function(n,r){var a=n.xys,i=n.display;return l.a.createElement(u.a.div,{className:"image-container",key:r,style:{display:a.interpolate(function(e,n,a){return function(e,t,n,r,a){return!(e>window.innerWidth+50)&&!(t>window.innerHeight+50)&&!(e+r.width*n+50<0)&&!(t+r.height*n+50<0)}(e,n,a,x[r],t.current)?i.value:"none"}),transform:a.interpolate(function(e,t,n){return"translate3d(".concat(e,"px,").concat(t,"px,0)")}),width:x[r].width*e.current,height:x[r].height*e.current+30}},l.a.createElement(u.a.div,{className:"image",style:{width:"".concat(x[r].width,"px"),height:"".concat(x[r].height,"px"),transform:a.interpolate(function(e,t,n){return"scale(".concat(n,")")}),transformOrigin:"0 0",backgroundImage:a.interpolate(function(e,t,n){return function(e,t){var n;return n=e>1?"@4x":e>.4?"@3x":e>.1?"@2x":"@1x",'url("'.concat(t.src).concat(n,'.jpg")')}(n,x[r])}),opacity:a.interpolate(function(e,t,n){return n>D?1:n/(D-A)-1}),boxShadow:a.interpolate(function(e,t,n){return"0 4px ".concat(14/n,"px 0px rgb(208, 208, 208)")})},onMouseDown:function(){Y=!1},onMouseMove:function(){Y=!0},onMouseUp:function(){Y||J(r)}}),l.a.createElement(u.a.div,{className:"legend",style:{position:"absolute",top:a.interpolate(function(e,t,n){return"".concat(x[r].height*n,"px")}),width:a.interpolate(function(e,t,n){return"".concat(n>D?x[r].width*n:1e3,"px")})}},x[r].name,l.a.createElement(R,{xys:a,cutoff:.1,text:M[x[r].category]})))})))},null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.1f4e20d3.chunk.js.map