(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[18],{352:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,c=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(l){r=!0,c=l}finally{try{n||null==s.return||s.return()}finally{if(r)throw c}}return a}}(e,t)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(t,"a",(function(){return r}))},363:function(e,t,a){e.exports=a.p+"static/media/background.89443a23.jpg"},366:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(349);function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},380:function(e,t,a){e.exports=a.p+"static/media/icon.83fbbf96.jpg"},850:function(e,t,a){"use strict";a.r(t);var n=a(349),r=a(366),c=a(352),o=a(0),s=a.n(o),l=a(390),i=a(364),m=a(365),u=a(458),d=a(381),p=a(413),f=a(382),y=a(460),b=a(383),E=a(369),g=a(7),w=a(363),j=a.n(w),h=a(380),P=a.n(h),O=a(108);t.default=function(){var e=Object(o.useState)({telegram:"",password:"",confirmPassword:"",code:""}),t=Object(c.a)(e,2),a=t[0],w=t[1],h=Object(o.useState)({password:"",confirmPassword:""}),v=Object(c.a)(h,2),N=v[0],k=v[1],C=Object(o.useState)(""),x=Object(c.a)(C,2),S=x[0],T=x[1],I=Object(o.useState)(!1),A=Object(c.a)(I,2),B=A[0],D=A[1],R=Object(o.useState)(!1),q=Object(c.a)(R,2),J=q[0],z=q[1],U=Object(o.useState)(!1),_=Object(c.a)(U,2),L=_[0],M=_[1],W=Object(g.k)(),Y=function(e){var t=e.target,a=t.name,c=t.value;w((function(e){return Object(r.a)(Object(r.a)({},e),{},Object(n.a)({},a,c))})),$(e)},$=function(e){var t=e.target,c=t.name,o=t.value;k((function(e){var t=Object(r.a)(Object(r.a)({},e),{},Object(n.a)({},c,""));switch(c){case"password":o?a.confirmPassword&&o!==a.confirmPassword?t.confirmPassword="Password and Confirm Password does not match.":t.confirmPassword=a.confirmPassword?"":N.confirmPassword:t[c]="Please enter Password.";break;case"confirmPassword":o?a.password&&o!==a.password&&(t[c]="Password and Confirm Password does not match."):t[c]="Please enter Password."}return t}))};return s.a.createElement("div",{style:{backgroundImage:"url(".concat(j.a,")"),backgroundPosition:"right bottom",backgroundSize:"cover",backgroundRepeat:"no-repeat"}},s.a.createElement("div",{className:"app flex-row-reverse align-items-center"},s.a.createElement(l.a,null,s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement(m.a,{md:"14"},s.a.createElement(u.a,null,s.a.createElement(d.a,{className:"p-5",style:{width:380,height:600}},s.a.createElement(p.a,null,s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement("img",{src:P.a,style:{height:200,paddingBottom:10,marginTop:-10}})),s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement("p",{style:{backgroundPosition:"center",fontSize:18}}," ",s.a.createElement("strong",null," Reset Password ")," ")),""!==S?s.a.createElement("div",null,L?s.a.createElement("div",null,s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement("p",{className:"text-muted",style:{backgroundPosition:"center",textAlign:"center"}}," Reset your password ")),s.a.createElement(f.a,{className:"mb-3"},s.a.createElement(y.a,{addonType:"prepend"},s.a.createElement(b.a,null,s.a.createElement("i",{className:"icon-lock"}))),s.a.createElement(E.a,{type:B?"text":"password",name:"password",value:a.password||"",onChange:Y,placeholder:"Password",autoComplete:"telegram",required:!0}),s.a.createElement(y.a,{addonType:"prepend"},s.a.createElement(b.a,{style:{backgroundColor:"white"}},s.a.createElement("i",{className:"fa fa-eye",onClick:function(){D(!B)}})))),N.password&&s.a.createElement("span",{className:"err"}," ",N.confirmPassword," "),s.a.createElement(f.a,{className:"mb-3"},s.a.createElement(y.a,{addonType:"prepend"},s.a.createElement(b.a,null,s.a.createElement("i",{className:"icon-lock"}))),s.a.createElement(E.a,{type:J?"text":"password",name:"confirmPassword",value:a.confirmPassword||"",onChange:Y,onBlur:$,placeholder:"Confirm Password",autoComplete:"telegram",required:!0}),s.a.createElement(y.a,{addonType:"prepend"},s.a.createElement(b.a,{style:{backgroundColor:"white"}},s.a.createElement("i",{className:"fa fa-eye",onClick:function(){z(!J)}})))),N.confirmPassword&&s.a.createElement("span",{className:"err"}," ",N.confirmPassword," "),s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement(m.a,null,s.a.createElement(E.a,{type:"submit",value:"Reset Password",color:"primary",className:"px-6",name:"Reset Password",style:{width:243,marginBottom:10},onClick:function(){Object(O.a)("/reset_password","POST",{input:a}).then((function(e){200===e.status?W.push("/login"):alert("Error changing Password. Try again later.")}))}})))):s.a.createElement("div",null,s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement("p",{className:"text-muted",style:{backgroundPosition:"center",textAlign:"center"}}," Enter code sent to you. ")),s.a.createElement(f.a,{className:"mb-3"},s.a.createElement(E.a,{type:"text",name:"code",value:a.code||"",onChange:Y,placeholder:"Enter code",required:!0})),s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement(m.a,null,s.a.createElement(E.a,{type:"submit",value:"Enter",color:"primary",className:"px-6",name:"Enter",style:{width:243,marginBottom:10},onClick:function(){a.code===S?M(!0):(M(!1),alert("Incorrect Code!"))}}))))):s.a.createElement("div",null,s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement("p",{className:"text-muted",style:{backgroundPosition:"center",textAlign:"center"}},' Enter your Telegram Chat ID below and we"ll send you a link to reset your password. ')),s.a.createElement(f.a,{className:"mb-3"},s.a.createElement(E.a,{type:"text",name:"telegram",value:a.telegram||"",onChange:Y,placeholder:"Enter your Telegram Chat ID",autoComplete:"telegram",required:!0})),s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement(m.a,null,s.a.createElement(E.a,{type:"submit",value:"Enter",color:"primary",className:"px-6",name:"Enter",style:{width:243,marginBottom:10},onClick:function(){Object(O.a)("/user_telegram","POST",{input:a}).then((function(e){return 200===e.status&&e.text()})).then((function(e){e?T(e):alert("Incorrect Telegram Chat ID")}))}})))),s.a.createElement(i.a,{className:"justify-content-center",style:{backgroundPosition:"center",marginBottom:40}},s.a.createElement("a",{style:{cursor:"pointer"},onClick:function(){W.push("/login")}},s.a.createElement("u",null,"Log In")),"\xa0 OR \xa0",s.a.createElement("a",{style:{cursor:"pointer"},onClick:function(){W.push("/registration")}},s.a.createElement("u",null,"Sign Up"))),s.a.createElement(i.a,{className:"justify-content-center"},s.a.createElement("p",{className:"text-muted",style:{backgroundPosition:"center",fontPosition:"center",marginBottom:-50}}," Webpage solely built by YongJun. ")))))))),s.a.createElement(l.a,null),s.a.createElement(l.a,null),s.a.createElement(l.a,null)))}}}]);
//# sourceMappingURL=18.71392012.chunk.js.map