(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[16],{343:function(e,t){e.exports=function(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}},352:function(e,t,n){"use strict";function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,a=!1,r=void 0;try{for(var s,l=e[Symbol.iterator]();!(o=(s=l.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(c){a=!0,r=c}finally{try{o||null==l.return||l.return()}finally{if(a)throw r}}return n}}(e,t)||function(e,t){if(e){if("string"===typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.d(t,"a",(function(){return a}))},359:function(e,t,n){"use strict";var o=n(8),a=n(36),r=n(14),s=n(340),l=n(0),c=n.n(l),i=n(47),u=n.n(i),b=n(326),f=n.n(b),d=n(330),p={active:u.a.bool,"aria-label":u.a.string,block:u.a.bool,color:u.a.string,disabled:u.a.bool,outline:u.a.bool,tag:d.m,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),onClick:u.a.func,size:u.a.string,children:u.a.node,className:u.a.string,cssModule:u.a.object,close:u.a.bool},g=function(e){function t(t){var n;return(n=e.call(this,t)||this).onClick=n.onClick.bind(Object(s.a)(Object(s.a)(n))),n}Object(r.a)(t,e);var n=t.prototype;return n.onClick=function(e){this.props.disabled?e.preventDefault():this.props.onClick&&this.props.onClick(e)},n.render=function(){var e=this.props,t=e.active,n=e["aria-label"],r=e.block,s=e.className,l=e.close,i=e.cssModule,u=e.color,b=e.outline,p=e.size,g=e.tag,h=e.innerRef,m=Object(a.a)(e,["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"]);l&&"undefined"===typeof m.children&&(m.children=c.a.createElement("span",{"aria-hidden":!0},"\xd7"));var v="btn"+(b?"-outline":"")+"-"+u,y=Object(d.i)(f()(s,{close:l},l||"btn",l||v,!!p&&"btn-"+p,!!r&&"btn-block",{active:t,disabled:this.props.disabled}),i);m.href&&"button"===g&&(g="a");var j=l?"Close":null;return c.a.createElement(g,Object(o.a)({type:"button"===g&&m.onClick?"button":void 0},m,{className:y,ref:h,onClick:this.onClick,"aria-label":n||j}))},t}(c.a.Component);g.propTypes=p,g.defaultProps={color:"secondary",tag:"button"},t.a=g},364:function(e,t,n){"use strict";var o=n(8),a=n(36),r=n(0),s=n.n(r),l=n(47),c=n.n(l),i=n(326),u=n.n(i),b=n(330),f={tag:b.m,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool},d=function(e){var t=e.className,n=e.cssModule,r=e.noGutters,l=e.tag,c=e.form,i=Object(a.a)(e,["className","cssModule","noGutters","tag","form"]),f=Object(b.i)(u()(t,r?"no-gutters":null,c?"form-row":"row"),n);return s.a.createElement(l,Object(o.a)({},i,{className:f}))};d.propTypes=f,d.defaultProps={tag:"div"},t.a=d},365:function(e,t,n){"use strict";var o=n(8),a=n(36),r=n(343),s=n.n(r),l=n(0),c=n.n(l),i=n(47),u=n.n(i),b=n(326),f=n.n(b),d=n(330),p=u.a.oneOfType([u.a.number,u.a.string]),g=u.a.oneOfType([u.a.bool,u.a.number,u.a.string,u.a.shape({size:u.a.oneOfType([u.a.bool,u.a.number,u.a.string]),push:Object(d.e)(p,'Please use the prop "order"'),pull:Object(d.e)(p,'Please use the prop "order"'),order:p,offset:p})]),h={tag:d.m,xs:g,sm:g,md:g,lg:g,xl:g,className:u.a.string,cssModule:u.a.object,widths:u.a.array},m={tag:"div",widths:["xs","sm","md","lg","xl"]},v=function(e,t,n){return!0===n||""===n?e?"col":"col-"+t:"auto"===n?e?"col-auto":"col-"+t+"-auto":e?"col-"+n:"col-"+t+"-"+n},y=function(e){var t=e.className,n=e.cssModule,r=e.widths,l=e.tag,i=Object(a.a)(e,["className","cssModule","widths","tag"]),u=[];r.forEach((function(t,o){var a=e[t];if(delete i[t],a||""===a){var r=!o;if(s()(a)){var l,c=r?"-":"-"+t+"-",b=v(r,t,a.size);u.push(Object(d.i)(f()(((l={})[b]=a.size||""===a.size,l["order"+c+a.order]=a.order||0===a.order,l["offset"+c+a.offset]=a.offset||0===a.offset,l)),n))}else{var p=v(r,t,a);u.push(p)}}})),u.length||u.push("col");var b=Object(d.i)(f()(t,u),n);return c.a.createElement(l,Object(o.a)({},i,{className:b}))};y.propTypes=h,y.defaultProps=m,t.a=y},381:function(e,t,n){"use strict";var o=n(8),a=n(36),r=n(0),s=n.n(r),l=n(47),c=n.n(l),i=n(326),u=n.n(i),b=n(330),f={tag:b.m,inverse:c.a.bool,color:c.a.string,block:Object(b.e)(c.a.bool,'Please use the props "body"'),body:c.a.bool,outline:c.a.bool,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},d=function(e){var t=e.className,n=e.cssModule,r=e.color,l=e.block,c=e.body,i=e.inverse,f=e.outline,d=e.tag,p=e.innerRef,g=Object(a.a)(e,["className","cssModule","color","block","body","inverse","outline","tag","innerRef"]),h=Object(b.i)(u()(t,"card",!!i&&"text-white",!(!l&&!c)&&"card-body",!!r&&(f?"border":"bg")+"-"+r),n);return s.a.createElement(d,Object(o.a)({},g,{className:h,ref:p}))};d.propTypes=f,d.defaultProps={tag:"div"},t.a=d},859:function(e,t,n){"use strict";n.r(t);var o=n(352),a=n(0),r=n.n(a),s=n(7),l=n(381),c=n(364),i=n(365),u=n(359),b=n(108);t.default=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],f=t[1],d=Object(a.useState)(""),p=Object(o.a)(d,2),g=p[0],h=p[1],m=Object(a.useState)(null),v=Object(o.a)(m,2),y=v[0],j=v[1],O=Object(a.useState)(null),x=Object(o.a)(O,2),E=x[0],w=x[1],k=Object(s.k)();Object(a.useEffect)((function(){Object(b.a)("/admin_level","GET").then((function(e){return e.json()})).then((function(e){w(e.admin_level)}))}),[]),Object(a.useEffect)((function(){console.log(E);var e=[];Object(b.a)("/suggestions","GET").then((function(e){return 200===e.status&&e.json()})).then((function(t){for(var n=function(n){var o=t[n][3].match(/\d+/g),a=o[0],s=o[2],c=o[1],i="";"01"===c&&(i="January"),"02"===c&&(i="February"),"03"===c&&(i="March"),"04"===c&&(i="April"),"05"===c&&(i="May"),"06"===c&&(i="June"),"07"===c&&(i="July"),"08"===c&&(i="August"),"09"===c&&(i="September"),"10"===c&&(i="October"),"11"===c&&(i="November"),"12"===c&&(i="December"),e.push(r.a.createElement(l.a,{style:S.text},"0"!==E?r.a.createElement("button",{style:{borderWidth:0,backgroundColor:"white",width:25,float:"right",position:"absolute",top:0,right:5},onClick:function(){return function(e,t){window.confirm('Are you sure to delete "'.concat(e,'"'))&&Object(b.a)("/deleteSuggestion","POST",{id:t}).then((function(e){return 200===e.status})).then((function(t){t?k.push("/suggestion"):alert('Error deleting "'.concat(e,'"'))}))}(t[n][2],t[n][0])}},"\u2715"):"",r.a.createElement("span",null,t[n][2]),r.a.createElement("span",{style:S.author},"By ",t[n][1],", ",s," ",i," ",a)))},o=0;o<t.length;o++)n(o);j(e)}))}),[E]);var S={suggestionBox:{border:"1px solid #000000",borderRadius:5,padding:5,minHeight:100,maxHeight:700,width:"100%",fontSize:20,overflow:"auto"},text:{textIndent:"5px",marginBottom:"5px"},author:{float:"right",fontStyle:"italic",fontSize:14},textBox:{border:"1px solid #000000",borderRadius:5,padding:10,minHeight:150,width:"100%",fontSize:20},wordCount:{float:"right",margin:"0px 5px 5px"},button:{width:"100%"}};return r.a.createElement("div",null,r.a.createElement(c.a,null,r.a.createElement(i.a,{style:S.suggestionBox},y),console.log(E),"0"===E?r.a.createElement(i.a,null,r.a.createElement("div",null,r.a.createElement("textarea",{onChange:function(e){var t=e.target.value;h(t),f(t.length);for(var o=0;o<t.length;o++){" "===t.length[o]&&f(n+=1)}0===t.length&&f(0)},type:"text",placeHolder:"Type Your Suggestion Here...",maxLength:"500",style:S.textBox,required:!0}),r.a.createElement("span",{style:S.wordCount},n,"/500"),r.a.createElement(u.a,{style:S.button,onClick:function(){Object(b.a)("/suggestion","POST",{suggestion:g}).then((function(e){return 200===e.status})).then((function(e){e&&k.push("/suggestion")}))}},"Done"))):""))}}}]);
//# sourceMappingURL=16.d6b6fc1d.chunk.js.map