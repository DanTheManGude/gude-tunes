(this["webpackJsonpgude-tunes"]=this["webpackJsonpgude-tunes"]||[]).push([[0],{15:function(e,t,o){},16:function(e,t,o){"use strict";o.r(t);var n=o(1),s=o.n(n),c=o(6),a=o.n(c),i=o(8),u=o(5),r=o(9),l=o(7),d=["dgude31@gmail.com","emtemple211@gmail.com"],h=["user-read-private","user-read-email","user-modify-playback-state"],f="SUCCESS",p="ERROR",y="INFO",m="WARNING",b=["SHUFFLE","SATURDAY","CANDLES","BOSTON"],g={SHUFFLE:{text:"Activate Shuffle",name:"Shuffle"},SATURDAY:{text:"Is it Saturday?",name:"Saturday"},CANDLES:{text:"Don't light candles",name:"Candles"},BOSTON:{text:"Boston Bound",name:"Boston"}},w=13930,x=21200,v=function(){var e=encodeURIComponent(window.location.href),t=h.join("%20");window.location.href="https://accounts.spotify.com/authorize?client_id=125aeb2f61c242c68fe33802c481bb08&redirect_uri=".concat(e,"&scope=").concat(t,"&response_type=token&state=202102121300")},j=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",o=arguments.length>2?arguments[2]:void 0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return fetch("https://api.spotify.com/v1/".concat(e).concat(s&&Object.keys(s).reduce((function(e,t,o){return"".concat(e).concat(0===o?"?":"&").concat(t,"=").concat(s[t])}),"")),Object(r.a)({method:t,headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(o)}},n))},S=!1,O={SHUFFLE:function(e,t,o){return j("me/player/shuffle?state=true","PUT",e,{body:""}).then((function(e){if(204!==e.status)throw e;t({type:f,source:o,text:"Your playback has been shuffled."})})).catch((function(e){t({type:p,source:o,text:"That didn't work; your playback was unchanged."})}))},SATURDAY:function(e,t,o){switch((new Date).getDay()){case 1:t({type:y,source:o,text:"It is not Satuday. It is Monday, slow down."});break;case 3:t({type:y,source:o,text:"It is not Satuday. It is Wednesday, not a sound."});break;case 5:t({type:y,source:o,text:"It is not Satuday. It is Friday, might get loud."});break;case 6:t({type:y,source:o,text:"It is Satuday. We paint the town!"}),S=!0;break;default:t({type:y,source:o,text:"It is not Satuday. Have you lost your sense of time or two?"})}S&&j("me/player/play","PUT",e,{body:JSON.stringify({context_uri:"spotify:playlist:5gR6gvNGivsJJA5bMwolTU",offset:{position:4}})}).then((function(e){if(204!==e.status)throw e;t({type:f,source:o,text:"Life moves slow on the ocean floor (feeling great)"})})).catch((function(e){t({type:p,source:o,text:e.message||"It looks like something went awry."})})),S=!0},CANDLES:function(e,t,o){var n=w,s=x;j("me/player/play","PUT",e,{body:JSON.stringify({context_uri:"spotify:album:3QrkHSj8pBzE1Kwhpnktkw",offset:{position:4},position_ms:n})}).then((function(c){if(204!==c.status)throw c;t({type:f,source:o,text:"Burning sage is cool."}),setTimeout((function(){j("me/player/pause","PUT",e,{body:""}).then((function(e){if(204!==e.status)throw e;t({type:y,source:o,text:"Don't set off the fire alarm."})})).catch((function(e){t({type:m,source:o,text:"The song should've been paused here."})}))}),s-n)})).catch((function(e){t({type:p,source:o,text:e.message||"It looks like something went awry."})}))},BOSTON:function(e,t,o){j("me/player/queue","POST",e,void 0,{uri:"spotify:track:7rSERmjAT38lC5QhJ8hnQc"}).then((function(n){204===n.status&&j("me/player/next","POST",e,{body:""}).then((function(e){if(204!==e.status)throw e;t({type:f,source:o,text:"Safe travels."})}))})).catch((function(e){t({type:p,source:o,text:e.message||"It looks like your package is delayed."})}))}},k=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return function(){return O[e](t,o,n)}},T=function(e){var t=e.displayName,o=e.email;return"mailto:dgude31@outlook.com?subject=Gude%20Tunes%20Access&body=Hello%2C%0D%0A%0D%0AI%20would%20like%20to%20have%20access%20to%20the%20Gude%20Tunes%20website%20functionality%2C%20but%20the%20request%20button%20did%20not%20work.%20My%20name%20is%2C".concat(t,"%2C%20and%20my%20email%20is%2C").concat(o,".%0D%0A%0D%0AThhank%20you!")},A=function(e,t){var o="Request Access";l.a.send("service_sbv0ia4","template_fe1e5ws",t).then((function(t){e({type:f,source:o,text:"The request was put through. You should recieve a confirmation email shortly."})}),(function(n){e({type:p,source:o,text:'The request was unsuccessful. You can reach out to <a href="mailto:'.concat(T(t),'">dgude31@outlook.com</a> directly.')})}))},I=o(0);var N=function(){var e=function(){var e={code:null,hashItems:{},message:""},t=new URLSearchParams(window.location.search),o=Object.fromEntries(t.entries());if(o.hasOwnProperty("error"))e.code=-1,e.message=o.error;else if(window.location.hash){var n=window.location.hash.substr(1).split("&").reduce((function(e,t){var o=t.split("=");return e[o[0]]=o[1],e}),{});n.hasOwnProperty("access_token")?(e.code=1,e.hashItems=n):(e.code=-1,e.message="Hash does not include access_token")}else e.code=0,e.message="Missing hash in the url";return e}(),t=e.code,o=e.message,s=e.hashItems.access_token,c=Object(n.useState)([]),a=Object(u.a)(c,2),r=a[0],l=a[1],h=Object(n.useState)({is:!1}),m=Object(u.a)(h,2),w=m[0],x=m[1],S=function(e){l((function(t){return t.concat(e)})),setTimeout((function(){l((function(e){return e.slice(1)}))}),6001)};return Object(n.useEffect)((function(){S(-1===t?{type:p,text:o}:1===t?{type:f,text:"Login succesfull!"}:{type:y,source:"Welcome",text:"Please login below to use the app."})}),[t,o]),Object(n.useEffect)((function(){s&&(console.log(s),j("/me","GET",s).then((function(e){if(200!==e.status)throw e;var t=e.email,o=e.display_name;d.includes("email")||(S({type:y,source:"Application",text:"Only designated Spotify accounts can use the application. Click below to request access."}),x({is:!0,info:{email:t,displayName:o}}))})).catch((function(e){console.error(e)})))}),[s]),Object(I.jsxs)("div",{children:[r.map((function(e,t){var o=e.type,n=e.text,s=e.source,c=void 0===s?"":s;return Object(I.jsxs)("div",{className:"message msg-".concat(o),children:[c&&Object(I.jsxs)("strong",{children:[c,": "]}),n]},"msg-".concat(t))})),w.is&&Object(I.jsx)("button",{className:"utility-btn new-user-btn",onClick:A(S,w.info),children:"Request Access"},"NEWUSER"),1===t?b.map((function(e){var t=g[e],o=t.text,n=t.classNames,c=void 0===n?"":n,a=t.name;return Object(I.jsx)("button",{className:["utility-btn"].concat(Object(i.a)(c)).join(" "),onClick:k(e,s,S,a),children:o},e)})):Object(I.jsx)("button",{className:"loginButton",onClick:v,children:"Login"})]})};o(15);a.a.render(Object(I.jsxs)(s.a.StrictMode,{children:[Object(I.jsx)("h1",{id:"title",children:"Gude Tunes"}),Object(I.jsx)("h3",{id:"subtitle",children:"Utilities to enhance your Spotify\u200e\xa0experience"}),Object(I.jsx)("h5",{id:"help-text",children:"Be sure to have Spotify recently paused or playing for most utilities."}),Object(I.jsx)(N,{})]}),document.getElementById("root")),console.log("Git hash: ".concat("3e026477a1d9a87a2d36d90bc119831abe765956"))}},[[16,1,2]]]);
//# sourceMappingURL=main.8e4f68e9.chunk.js.map