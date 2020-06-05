(this.webpackJsonpsnake=this.webpackJsonpsnake||[]).push([[0],{31:function(e,t,n){e.exports=n.p+"static/media/snake.266d8a41.png"},37:function(e,t,n){e.exports=n(57)},46:function(e,t,n){},48:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(17),c=n.n(o),s=n(5),i=n(9),l=n(11),u=n(10),d=n(12),m=n(14),h=n(60),p=n(59),g=n(4),f=(n(46),n(31)),E=n.n(f),b=n(22),O=Object(b.mapValues)({LOGIN:"/api/token/",CREATE_USER:"/api/users/",AUTO_LOGIN:"/api/token/refresh/",GET_GAMEMODES:"/api/gamemodes",GET_SCOREBOARD:"/api/scores?id=",POST_SCORE:"/api/scores"},(function(e){return"https://snake-rest-api.herokuapp.com"+e})),v=function(e){return{type:"LOGIN_ERROR",error:e}},S=function(){return function(e){setTimeout((function(){e(y())}),1044e5)}},k=function(e,t,n){return function(a){fetch(O.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:t}).then((function(e){return e.json()})).then((function(t){var r,o;t.access&&t.refresh?(localStorage.setItem("username",e.username),localStorage.setItem("refresh",t.refresh),a((r=t,o=e.username,{type:"LOGIN_SUCCESS",access:r.access,refresh:r.refresh,username:o})),n.replace("/settings")):a(v(Object.entries(t).map((function(e){return e.join(": ")}))))}))}},y=function(e){return function(t){if(e.location)var n=e.location.pathname;e.replace("/");var a=localStorage.getItem("refresh");!a&&e?(t({type:"AUTO_LOGIN_FAIL"}),e.replace("/auth")):fetch(O.AUTO_LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refresh:a})}).then((function(e){return e.json()})).then((function(a){if("token_not_valid"===a.code&&e)t({type:"AUTO_LOGIN_FAIL"}),e.replace("/auth");else if(a.access){t({type:"AUTO_LOGIN_RESPONSE",access:a.access}),t(S());var r="/"===n||"/game"===n||"/auth"===n;e.location&&r?e.replace("/settings"):e.replace(n)}})).catch((function(){t({type:"AUTO_LOGIN_FAIL"}),e.replace("/auth")}))}},N=function(e){return{type:"CHANGE_MODE",newGameMode:e}},w=(n(48),{logout:function(e){return e.replace("/auth"),localStorage.removeItem("refresh"),{type:"LOGOUT"}}}),j=Object(m.f)(Object(g.b)((function(e){return{auth:e.auth,gameMode:e.game}}),w)((function(e){return r.a.createElement("div",{className:"TopBar"},r.a.createElement("div",null,e.auth.access?r.a.createElement(r.a.Fragment,null,e.auth.username+" | ",r.a.createElement("span",{className:"offline",onClick:function(){return e.logout(e.history)}},"LOGOUT")):r.a.createElement("span",{className:"login",onClick:function(){return e.logout(e.history)}},"LOGIN")))}))),L=(n(50),function(e){var t=Object.keys(e.options);return r.a.createElement("div",null,r.a.createElement("p",null,e.children),t.map((function(n){return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("input",{type:"radio",id:n,name:t.join(","),onChange:function(){e.change(e.options[n])},defaultChecked:(a=e.options[n],JSON.stringify(e.checkedValue)===JSON.stringify(a))}),r.a.createElement("label",{htmlFor:n}," ",n.toUpperCase()," "));var a})))}),T=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).render=function(){return r.a.createElement("div",{className:"flag"},r.a.createElement("div",{className:"Settings"},r.a.createElement(L,{options:{small:"20x15",medium:"30x23",large:"40x30"},checkedValue:n.props.board,change:function(e){return n.props.setSetting("board",e)}}," PICK BOARD SIZE: "),r.a.createElement(L,{options:{border:!0,standard:!1},checkedValue:n.props.border,change:function(e){return n.props.setSetting("border",e)}}," SELECT BORDER MODE: "),r.a.createElement(L,{options:{accelerating:!0,constant:!1},checkedValue:n.props.acceleration,change:function(e){return n.props.setSetting("acceleration",e)}}," SET SPEED MODE: "),r.a.createElement(L,{options:{slow:240,normal:160,fast:80},checkedValue:n.props.speed,change:function(e){return n.props.setSetting("speed",e)}}," CHOOSE SPEED: "),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(s.b,{to:"/game",className:"Button startButton"}," START "),n.props.auth?r.a.createElement(s.b,{to:"/scoreboard",className:"Button startButton"}," SCOREBOARD "):null))},n}return Object(d.a)(t,e),t}(a.Component),A={setSetting:function(e,t){return{type:"SET_SETTING",setting:e,value:t}}},M=Object(m.f)(Object(g.b)((function(e){return{acceleration:e.game.acceleration,board:e.game.board,border:e.game.border,speed:e.game.speed,auth:e.auth.access}}),A)(T)),C=n(35),I=n(28),G=n(6),_=(n(51),n(52),function(e){return r.a.createElement("div",{className:"shadow"},r.a.createElement("div",{className:"gameOver"},(e.auth?e.highscore:"Game Over!")||"Wait..."))}),R=(n(53),function(e){return r.a.createElement("div",{className:"controlPanel"},r.a.createElement("div",{className:"up arrow",onClick:function(){return e.controls("n")}}),r.a.createElement("div",{className:"arrow",onClick:function(){return e.controls("w")}}),r.a.createElement("div",{className:"right arrow",onClick:function(){return e.controls("e")}}),r.a.createElement("div",{className:"down arrow",onClick:function(){return e.controls("s")}}))}),D=function(e){function t(e){var n;Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={snake:{X:13,Y:10,snakeLength:2},tailPositions:["12,10","13,10"],pointPosition:null,gameOver:!1,highscoreResponse:null},n.componentDidMount=function(){window.addEventListener("keydown",n.controls),n.points(),setTimeout((function(){return n.timeoutID=setTimeout(n.actionFunc,n.speed)}),500)},n.componentDidUpdate=function(){return n.state.gameOver?clearTimeout(n.timeoutID):null},n.componentWillUnmount=function(){return clearTimeout(n.timeoutID)},n.actionFunc=function(){n.timeoutID=setTimeout(n.actionFunc,n.speed),n.move(n.state.snake,n.direction),n.game(n.state.snake,n.state.tailPositions),n.controlsLock=!1},n.move=function(e,t){var a=e.X,r=e.Y,o=e.snakeLength;"n"===t&&r--,"s"===t&&r++,"e"===t&&a++,"w"===t&&a--,n.border&&(a>=n.board.width||a<0||r>=n.board.height||r<0)?n.gameOver():(a<0&&(a=n.board.width-1),r<0&&(r=n.board.height-1),a>n.board.width-1&&(a=0),r>n.board.height-1&&(r=0)),n.setState((function(){return{snake:{X:a,Y:r,snakeLength:o}}}))},n.game=function(e,t){var a=e.X,r=e.Y,o=e.snakeLength;document.querySelectorAll(".arrow").forEach((function(e){return e.style.pointerEvents="auto"}));var c=a+","+r;t.push(c),t=t.slice(-o),n.setState((function(){return{tailPositions:t}}));for(var s=0;s<t.length-1;s++)c===t[s]&&n.gameOver();c===n.state.pointPosition&&(o+=1,n.setState((function(){return{snake:{X:a,Y:r,snakeLength:o}}})),n.acceleration&&n.speed>=16&&(n.speed-=2),n.points())},n.controls=function(e){n.controlsLock||(n.controlsLock=!0,document.querySelectorAll(".arrow").forEach((function(e){return e.style.pointerEvents="none"})),"w"!==e.key&&"W"!==e.key&&"ArrowUp"!==e.key&&"n"!==e||"s"===n.direction||(n.direction="n"),"s"!==e.key&&"S"!==e.key&&"ArrowDown"!==e.key&&"s"!==e||"n"===n.direction||(n.direction="s"),"d"!==e.key&&"D"!==e.key&&"ArrowRight"!==e.key&&"e"!==e||"w"===n.direction||(n.direction="e"),"a"!==e.key&&"A"!==e.key&&"ArrowLeft"!==e.key&&"w"!==e||"e"===n.direction||(n.direction="w"))},n.points=function(){var e=!1,t=Math.floor(Math.random()*n.board.width)+","+Math.floor(Math.random()*n.board.height);n.state.tailPositions.forEach((function(a){t===a&&(n.points(),e=!0)})),e||n.setState((function(){return{pointPosition:t}}))},n.gameOver=function(){n.setState((function(){return{gameOver:!0}})),n.props.auth.access&&fetch(O.POST_SCORE,{method:"POST",headers:{Authorization:"Bearer ".concat(n.props.auth.access),"Content-Type":"application/json"},body:JSON.stringify(Object(G.a)({score:n.state.snake.snakeLength-2},n.props.gameMode))}).then((function(e){return e.json()})).then((function(e){return n.setState({highscoreResponse:e})})).catch((function(e){return console.log(e)}))},n.render=function(){return r.a.createElement("div",{className:"flag"},r.a.createElement("div",{className:"holder"},r.a.createElement("div",{className:"Board"},r.a.createElement("div",{className:n.border?"border":"border-less"},Object(I.a)(Array(n.board.width)).map((function(e,t){return r.a.createElement("div",{className:"col",key:t},Object(I.a)(Array(n.board.height)).map((function(e,a){var o="tile",c=t+","+a;return n.state.tailPositions.forEach((function(e){e===c&&(o="snake tile")})),n.state.pointPosition===c&&(o="point tile"),r.a.createElement("div",{className:o,key:c})})))})),n.state.gameOver?r.a.createElement(_,{highscore:n.state.highscoreResponse,auth:n.props.auth.access}):null)),r.a.createElement("div",{className:"bottom"},r.a.createElement("span",null,"SCORE: ",n.state.snake.snakeLength-2),r.a.createElement(s.b,{to:"/settings",className:"Button reset"},"RESET"))),r.a.createElement(R,{controls:n.controls}))};var a=e.gameMode.board.split("x").map((function(e){return Number(e)})),o=Object(C.a)(a,2),c=o[0],d=o[1];return n.board={width:c,height:d},n.speed=e.gameMode.speed,n.acceleration=e.gameMode.acceleration,n.border=e.gameMode.border,n.timeoutID=0,n.controlsLock=!1,n.direction="e",n}return Object(d.a)(t,e),t}(a.Component),P=Object(m.f)(Object(g.b)((function(e){return{gameMode:e.game,auth:e.auth}}))(D)),U=n(18),B=(n(54),function(e){return Object.keys(e.authData).map((function(t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("input",{id:t,placeholder:t,value:e.authData[t],type:"password"===t?"password":"text",onChange:function(n){return e.change(n,t)},onKeyDown:function(t){return"Enter"===t.key&&e.login()}}),r.a.createElement("label",{htmlFor:t},t))}))}),F=(n(55),function(){return r.a.createElement("div",{className:"loader"})}),x=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={auth:{username:n.props.username||"",password:""},path:n.props.username?"verifyPassword":"signupNewUser"},n.componentDidMount=function(){n.props.username||n.refs.loginMode.classList.toggle("active")},n.inputChanged=function(e,t){return n.setState({auth:Object(G.a)({},n.state.auth,Object(U.a)({},t,e.target.value))})},n.changeLoginMode=function(e){n.setState({path:e}),n.refs.loginMode.classList.toggle("active")},n.login=function(){return n.props.login(n.state,n.props.history)},n.render=function(){return r.a.createElement("div",{className:"flag"},r.a.createElement("div",{className:"Auth"},r.a.createElement("div",{ref:"loginMode",className:"toggler"},r.a.createElement(L,{options:{signin:"verifyPassword",signup:"signupNewUser"},checkedValue:n.state.path,change:function(e){return n.changeLoginMode(e)}})),r.a.createElement(B,{authData:n.state.auth,change:n.inputChanged,login:n.login}),r.a.createElement("button",{onClick:n.login}," LOGIN "),r.a.createElement(s.b,{to:"/settings",className:"offline"}," OFFLINE "),n.props.loading?r.a.createElement(F,null):null),n.props.errors?r.a.createElement("div",{className:"error"}," Something went wrong!",n.props.errors.map((function(e){return r.a.createElement("div",{key:e},e)}))):null)},n}return Object(d.a)(t,e),t}(a.Component),W={login:function(e,t){var n=e.auth,a=e.path;return function(e){e({type:"START_AUTH"});var r=JSON.stringify(n);if("verifyPassword"===a)e(k(n,r,t));else if("signupNewUser"===a){var o=[];if(n.username.length<4?o.push("Nickname to short!"):n.username.length>14&&o.push("Nickname to long!"),/^[0-9a-zA-Z]+$/.test(n.username)||o.push("Invalid characters!"),o.length)return e(v(o));fetch(O.CREATE_USER,{method:"POST",headers:{"Content-Type":"application/json"},body:r}).then((function(e){return e.json()})).then((function(a){if(a.username===n.username)e(k(n,r,t));else{var o=Object.entries(a).map((function(e){return e.join(": ")}));e(v(o)),e(S())}}))}}}},V=Object(m.f)(Object(g.b)((function(e){return{username:e.auth.username,errors:e.auth.errors,loading:e.auth.loading}}),W)(x)),J=n(33),X=(n(56),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={activeGameMode:-1,scoreboard:[],allScoreboards:[],loading:!0},n.componentDidMount=function(){n.getAllScoreboards()},n.getScoreboard=function(e){return fetch(O.GET_SCOREBOARD+n.state.allScoreboards[e].id,{method:"GET",headers:{Authorization:"Bearer ".concat(n.props.auth.access),"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){return n.setState({scoreboard:t,loading:!1,activeGameMode:e})}))},n.getAllScoreboards=function(){return fetch(O.GET_GAMEMODES,{method:"GET",headers:{Authorization:"Bearer ".concat(n.props.auth.access),"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e=e.map((function(e){return{id:e.id,gameMode:Object(J.a)(e,["id"])}})),n.setState((function(){return{allScoreboards:e}}));var t=-1;e.forEach((function(e,a){return Object(b.isEqual)(e.gameMode,n.props.gameMode)?t=a:null})),-1===t?n.setState({loading:!1}):n.getScoreboard(t)}))},n.changeMode=function(e){var t=n.state.allScoreboards.length-1;if(t>0){n.setState({loading:!0});var a=n.state.activeGameMode+e;a<0&&(a=t),a>t&&(a=0),n.getScoreboard(a),n.props.changeMode(n.state.allScoreboards[a].gameMode)}},n.render=function(){return r.a.createElement("div",{className:"holder"},r.a.createElement("div",{className:"Scoreboard"},r.a.createElement("p",null,!n.state.loading&&-1!==n.state.activeGameMode&&"#"+n.state.allScoreboards[n.state.activeGameMode].id),r.a.createElement("div",{className:"scoreList"},n.state.loading?r.a.createElement(F,null):-1===n.state.activeGameMode?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Scoreboard does not exist yet!"),r.a.createElement("div",null,"Play game in this mode to create scoreboard!")):n.state.scoreboard.map((function(e,t){return r.a.createElement("div",{key:e.user,className:n.props.auth.username===e.user?"record userRecord":"record"},r.a.createElement("div",{className:"sides"},t+1+"."),r.a.createElement("div",{className:"nick"},e.user),r.a.createElement("div",{className:"sides"},e.score))})))),r.a.createElement("div",{className:"modeNavigation"},n.state.allScoreboards.length?r.a.createElement("div",{onClick:function(){return n.changeMode(-1)}}):null,r.a.createElement(s.b,{to:"/settings",className:"Button back"},"GAME MODES"),n.state.allScoreboards.length?r.a.createElement("div",{onClick:function(){return n.changeMode(1)}}):null))},n}return Object(d.a)(t,e),t}(a.Component)),H={changeMode:N},Y=Object(g.b)((function(e){return{auth:e.auth,gameMode:e.game}}),H)(X),z=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).componentDidMount=function(){n.bannerPosition(),n.props.autoLogin(n.props.history)},n.componentDidUpdate=function(){return n.bannerPosition()},n.bannerPosition=function(){"/auth"!==n.props.location.pathname&&n.refs.LogoImage.classList.remove("center"),"/game"===n.props.location.pathname?n.refs.LogoImage.classList.add("dock"):n.refs.LogoImage.classList.remove("dock")},n.render=function(){return r.a.createElement(r.a.Fragment,null,"/auth"!==n.props.location.pathname&&r.a.createElement(j,{auth:n.props.auth}),r.a.createElement("div",{ref:"LogoImage",className:"banner center"},r.a.createElement("h1",null,r.a.createElement("img",{alt:"snake",src:E.a}))),n.props.autoLoginLoading?r.a.createElement(F,null):r.a.createElement(h.a,{component:r.a.Fragment},r.a.createElement(p.a,{key:n.props.location.key,classNames:"route",timeout:{enter:600,exit:300}},r.a.createElement(m.c,{location:n.props.location},r.a.createElement(m.a,{path:"/game",component:P}),r.a.createElement(m.a,{path:"/scoreboard",component:Y}),r.a.createElement(m.a,{path:"/settings",component:M}),r.a.createElement(m.a,{path:"/auth",component:V})))))},n}return Object(d.a)(t,e),t}(a.Component),q={autoLogin:y,changeMode:N},K=Object(m.f)(Object(g.b)((function(e){return{autoLoginLoading:e.auth.autoLoginLoading}}),q)(z)),Z=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function $(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){return console.error("Error during service worker registration:",e)}))}var Q=n(15),ee=n(34),te={acceleration:!1,board:"30x23",border:!1,speed:160},ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SETTING":return Object(G.a)({},e,Object(U.a)({},t.setting,t.value));case"CHANGE_MODE":return Object(G.a)({},t.newGameMode);default:return e}},ae={access:null,refresh:localStorage.getItem("refresh"),username:localStorage.getItem("username"),errors:null,loading:!1,autoLoginLoading:!0},re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_AUTH":return Object(G.a)({},e,{loading:!0});case"LOGOUT":return Object(G.a)({},e,{access:null,refresh:null});case"AUTO_LOGIN_FAIL":return Object(G.a)({},e,{autoLoginLoading:!1});case"AUTO_LOGIN_RESPONSE":return Object(G.a)({},e,{autoLoginLoading:!1,access:t.access});case"LOGIN_ERROR":return Object(G.a)({},e,{loading:!1,errors:t.error});case"LOGIN_SUCCESS":return{access:t.access,refresh:t.refresh,username:t.username,errors:null,loading:!1};default:return e}},oe=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Q.d,ce=Object(Q.c)({game:ne,auth:re}),se=Object(Q.e)(ce,oe(Object(Q.a)(ee.a))),ie=r.a.createElement(g.a,{store:se},r.a.createElement(s.a,{basename:"/Snake"},r.a.createElement(K,null)));c.a.render(ie,document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/Snake",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/Snake","/service-worker.js");Z?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):$(e,t)})).catch((function(){return console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):$(t,e)}))}}()}},[[37,1,2]]]);
//# sourceMappingURL=main.9757fd2b.chunk.js.map