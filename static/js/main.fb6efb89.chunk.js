(this["webpackJsonpgude-tunes"]=this["webpackJsonpgude-tunes"]||[]).push([[0],{16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var o,c=n(2),s=n.n(c),a=n(7),i=n.n(a),r=n(10),u=n(4),l=n(8),f=n(9),h=n(1),d=!1,y={"dgude31@gmail.com":1,"emtemple211@gmail.com":7},p=function(t,e){return{selfPlaylist:t,otherUserId:e}},S={1:p("5zWTsTMwKffVVwnB3V04cW",7),7:p("5gR6gvNGivsJJA5bMwolTU",1)},m=["user-read-private","user-read-email","user-modify-playback-state","playlist-modify-public","playlist-modify-private","playlist-read-private"],b={SUCCESS:"SUCCESS",ERROR:"ERROR",INFO:"INFO",WARNING:"WARNING"},O=function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return{text:t,name:e,function:n(e),classNames:o}},g={SHUFFLE:"SHUFFLE",SATURDAY:"SATURDAY",WBAB:"WBAB",MYSTERY_DUCK:"MYSTERY_DUCK",CANDLES:"CANDLES",BOSTON:"BOSTON",SYNC_PLAYLISTS:"SYNC_PLAYLISTS"},j=(o={},Object(h.a)(o,g.SHUFFLE,O("Activate Shuffle","Shuffle",(function(t){return function(e,n){return T("me/player/shuffle?state=true","PUT",e,{body:""}).then((function(e){if(204!==e.status)throw e;n({type:b.SUCCESS,source:t,text:"Your playback has been shuffled."})})).catch(R(n,t))}}))),Object(h.a)(o,g.SATURDAY,O("Is it Saturday?","Saturday",(function(t){return function(e,n){switch((new Date).getDay()){case 1:n({type:b.INFO,source:t,text:"It is not Satuday. It is Monday, slow down."});break;case 3:n({type:b.INFO,source:t,text:"It is not Satuday. It is Wednesday, not a sound."});break;case 5:n({type:b.INFO,source:t,text:"It is not Satuday. It is Friday, might get loud."});break;case 6:n({type:b.INFO,source:t,text:"It is Satuday. We paint the town!"}),d=!0;break;default:d||n({type:b.INFO,source:t,text:"It is not Satuday. Have you lost your sense of time or two?"})}d&&T("me/player/play","PUT",e,{body:JSON.stringify({context_uri:"spotify:album:0Q5XBpCYFgUWiG9DUWyAmJ",offset:{position:4}})}).then((function(e){if(204!==e.status)throw e;n({type:b.SUCCESS,source:t,text:"Life moves slow on the ocean floor (feeling great)"})})).catch(R(n,t)),d=!0}}))),Object(h.a)(o,"MYSTERY_DUCK",O("Mystery \ud83e\udd86","Mystery Love",(function(t){return function(e,n,o){var c=S[o].selfPlaylist;T("playlists/".concat(c),"GET",e).then((function(t){return t.json()})).then((function(o){var c=o.tracks,s=c.total,a=c.items[Date.now()%s].track.uri;T("me/player/queue","POST",e,void 0,{uri:a}).then((function(e){if(204!==e.status)throw e;n({type:b.SUCCESS,source:t,text:"A random song from our friends has been added to the queue. <3"})})).catch(R(n,t))})).catch(R(n,t))}}))),Object(h.a)(o,g.CANDLES,O("Don't light candles","Candles",(function(t){return function(e,n){var o=v.start,c=v.end;T("me/player/play","PUT",e,{body:JSON.stringify({context_uri:"spotify:album:3QrkHSj8pBzE1Kwhpnktkw",offset:{position:4},position_ms:o})}).then((function(s){if(204!==s.status)throw s;n({type:b.SUCCESS,source:t,text:"Burning sage is cool."}),setTimeout((function(){T("me/player/pause","PUT",e,{body:""}).then((function(e){if(204!==e.status)throw e;n({type:b.INFO,source:t,text:"Don't set off the fire alarm."})})).catch((function(e){n({type:b.WARNING,source:t,text:"The song should've been paused here."})}))}),c-o)})).catch(R(n,t))}}))),Object(h.a)(o,g.BOSTON,O("Boston Bound","Boston Bound",(function(t){return function(e,n){T("me/player/queue","POST",e,void 0,{uri:"spotify:track:7rSERmjAT38lC5QhJ8hnQc"}).then((function(o){204===o.status&&T("me/player/next","POST",e,{body:""}).then((function(e){if(204!==e.status)throw e;n({type:b.SUCCESS,source:t,text:"Safe travels."})}))})).catch(R(n,t))}}))),Object(h.a)(o,g.SYNC_PLAYLISTS,O("Sync Playlists","Sync Playlists",(function(t){return function(e,n,o){var c=S[o],s=c.selfPlaylist,a=c.otherUserId,i=S[a].selfPlaylist;Promise.all([U(s,e),U(i,e)]).then((function(o){var c=Object(u.a)(o,2),a=c[0],i=c[1].filter((function(t){return!a.includes(t)}));0===i.length?n({type:b.INFO,source:t,text:"Our playlists are already synced."}):T("playlists/".concat(s,"/tracks"),"POST",e,{body:JSON.stringify({uris:i})}).then((function(e){if(201!==e.status)throw e;n({type:b.SUCCESS,source:t,text:"Our playlists have been synced. :)"})})).catch(R(n,t))})).catch(R(n,t))}}),["sync-playlist-btn"])),Object(h.a)(o,g.WBAB,O("Play from WBAB","WBAB",(function(t){return function(e,n,o){var c="6E1FWxZoNQelXt3EAQ4Xe6";T("playlists/".concat(c),"GET",e).then((function(t){return t.json()})).then((function(o){var s=o.tracks,a=s.total,i=s.items,r=Date.now()%a,u=i[r].track.duration_ms,l=Date.now()%u;T("me/player/play","PUT",e,{body:JSON.stringify({context_uri:"spotify:playlist:".concat(c),offset:{position:r},position_ms:l})}).then((function(e){if(204!==e.status)throw e;n({type:b.SUCCESS,source:t,text:"You are listeing to WBAB 102.3 Long Island's only classic rock"})})).catch(R(n,t))})).catch(R(n,t))}}))),o),v={start:13930,end:21200},w="service_sbv0ia4",C="template_fe1e5ws",x="user_2K4sBJkaEW2m7T8CPrYhp",N=n(0),E=function(){var t=encodeURIComponent(window.location.href),e=m.join("%20");window.location.href="https://accounts.spotify.com/authorize?client_id=125aeb2f61c242c68fe33802c481bb08&redirect_uri=".concat(t,"&scope=").concat(e,"&response_type=token&state=202102121300")},T=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2?arguments[2]:void 0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return fetch("https://api.spotify.com/v1/".concat(t).concat(c&&Object.keys(c).reduce((function(t,e,n){return"".concat(t).concat(0===n?"?":"&").concat(e,"=").concat(c[e])}),"")),Object(l.a)({method:e,headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(n)}},o))},A=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=arguments.length>3?arguments[3]:void 0;return function(){j[t].function(e,n,o)}},k=function(t){var e=t.displayName,n=t.email;return"mailto:dgude31@outlook.com?subject=Gude%20Tunes%20Access&body=Hello%2C%0D%0A%0D%0AI%20would%20like%20to%20have%20access%20to%20the%20Gude%20Tunes%20website%20functionality%2C%20but%20the%20request%20button%20did%20not%20work.%20My%20name%20is%2C%20".concat(e,"%2C%20and%20my%20email%20is%2C%20").concat(n,".%0D%0A%0D%0AThhank%20you!")},I=function(t,e){return function(){var n="Request Access",o=w,c=C,s=x;f.a.send(o,c,e,s).then((function(e){t({type:b.SUCCESS,source:n,text:"The request was put through. You should recieve a confirmation email shortly (be sure to check your junk folder)."},1e4)}),(function(o){t({type:b.ERROR,source:n,text:Object(N.jsxs)("span",{children:["The request was unsuccessful. You can reach out to\xa0",Object(N.jsx)("a",{href:k(e),children:"dgude31@outlook.com"}),"\xa0directly."]})})}))}},U=function(t,e){return T("playlists/".concat(t),"GET",e).then((function(t){if(200!==t.status)throw t;return t.json()})).then((function(t){return t.tracks.items.map((function(t){return t.track.uri}))}))},R=function(t,e){return function(n){t({type:b.ERROR,source:e,text:n.message||"It looks like something went awry."})}};var B=function(){var t=function(){var t={code:null,hashItems:{},message:""},e=new URLSearchParams(window.location.search),n=Object.fromEntries(e.entries());if(n.hasOwnProperty("error"))t.code=-1,t.message=n.error;else if(window.location.hash){var o=window.location.hash.substr(1).split("&").reduce((function(t,e){var n=e.split("=");return t[n[0]]=n[1],t}),{});o.hasOwnProperty("access_token")?(t.code=1,t.hashItems=o):(t.code=-1,t.message="Hash does not include access_token")}else t.code=0,t.message="Missing hash in the url";return t}(),e=t.code,n=t.message,o=t.hashItems.access_token,s=Object(c.useState)([]),a=Object(u.a)(s,2),i=a[0],l=a[1],f=Object(c.useState)(),h=Object(u.a)(f,2),d=h[0],p=h[1],S=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6001;l((function(e){return e.concat(t)})),setTimeout((function(){l((function(t){return t.slice(1)}))}),e)};return Object(c.useEffect)((function(){var t=-1===e?{type:b.ERROR,text:n}:1===e?{type:b.SUCCESS,text:"Login succesfull!"}:{type:b.INFO,source:"Welcome",text:"Please login below to use the app."};S(t)}),[e,n]),Object(c.useEffect)((function(){o&&(console.log(o),T("me","GET",o).then((function(t){return 401===t.status&&(window.location.href="".concat(window.location.origin).concat(window.location.pathname)),t.json()})).then((function(t){var e=t.email,n=t.display_name,o=!Object.keys(y).includes(e);o&&S({type:b.INFO,source:"Application",text:"Sorry ".concat(n,", Only designated Spotify accounts can use the application. Click below to request access.")},12e3),p({isNew:o,info:{email:e,displayName:n}})})).catch((function(t){S({type:b.WARNING,source:"Application",text:"Something isn't right, the app may be currently unavailable."}),console.error(t)})))}),[o]),Object(N.jsxs)("div",{children:[Object(N.jsx)("div",{children:i.map((function(t,e){var n=t.type,o=t.text,c=t.source,s=void 0===c?"":c;return Object(N.jsxs)("div",{className:"message msg-".concat(n),children:[s&&Object(N.jsxs)("strong",{children:[s,": "]}),o]},"msg-".concat(e))}))}),d?d.isNew?Object(N.jsx)("button",{className:"utility-btn new-user-btn",onClick:I(S,d.info),children:"Request Access"},"NEWUSER"):1===e?function(t){var e=Object.keys(g);switch(y[t]){case 1:case 7:return e;default:return e.filter((function(t){return![g.SYNC_PLAYLISTS,g.MYSTERY_DUCK,g.CANDLES,g.WBAB].includes(t)}))}}(d.info.email).map((function(t){var e=j[t],n=e.text,c=e.classNames;return Object(N.jsx)("button",{className:["utility-btn"].concat(Object(r.a)(c)).join(" "),onClick:A(t,o,S,y[d.info.email]),children:n},t)})):void 0:Object(N.jsx)("button",{className:"loginButton",onClick:E,children:"Login"})]})};n(16);i.a.render(Object(N.jsxs)(s.a.StrictMode,{children:[Object(N.jsx)("h1",{id:"title",children:"Gude Tunes"}),Object(N.jsx)("h3",{id:"subtitle",children:"Utilities to enhance your Spotify\u200e\xa0experience"}),Object(N.jsx)("h5",{id:"help-text",children:"Be sure to have Spotify recently paused or playing for most utilities."}),Object(N.jsx)(B,{})]}),document.getElementById("root")),console.log("Git hash: ".concat("0c0660824f6dbbcfe0acb69c01d1684fd1810b3a"))}},[[17,1,2]]]);
//# sourceMappingURL=main.fb6efb89.chunk.js.map