"use strict";var __extends=this&&this.__extends||function(){var _extendStatics=function extendStatics(d,b){_extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;}||function(d,b){for(var p in b){if(b.hasOwnProperty(p))d[p]=b[p];}};return _extendStatics(d,b);};return function(d,b){_extendStatics(d,b);function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};}();var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=this&&this.__generator||function(thisArg,body){var _={label:0,sent:function sent(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_){try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};exports.__esModule=true;var client_ws_1=require("@harmonyhub/client-ws");var discover_1=require("@harmonyhub/discover");var EE=require("wolfy87-eventemitter");var HarmonyHub=function(_super){__extends(HarmonyHub,_super);function HarmonyHub(){var _this=_super.call(this)||this;_this.hubConnections=new Map();_this.run().then()["catch"](function(e){return console.log(e);});return _this;}HarmonyHub.prototype.run=function(){return __awaiter(this,void 0,void 0,function(){var explorer;var _this=this;return __generator(this,function(_a){explorer=new discover_1.Explorer();explorer.on(discover_1.Explorer.Events.ONLINE,function(data){console.log("reachable ",data.fullHubInfo);_this.connectToHub(data);});explorer.on(discover_1.Explorer.Events.UPDATE,function(data){console.log("update ",data);});explorer.on(discover_1.Explorer.Events.OFFLINE,function(data){console.log("not reachable ",data);});explorer.start();return[2];});});};HarmonyHub.prototype.connectToHub=function(data){return __awaiter(this,void 0,void 0,function(){var hubclient,start;var _this=this;return __generator(this,function(_a){switch(_a.label){case 0:if(!(this.hubConnections.get(data.uuid)===undefined))return[3,2];return[4,client_ws_1.getHarmonyClient(data.ip,{port:parseInt(data.fullHubInfo.port,10),remoteId:data.fullHubInfo.remoteId})];case 1:hubclient=_a.sent();hubclient.on(client_ws_1.HarmonyClient.Events.DISCONNECTED,function(){_this.hubConnections.set(data.uuid,undefined);console.log("client got disconnected, now #"+_this.hubConnections.size+" active clients");});this.hubConnections.set(data.uuid,hubclient);start=Date.now();try{}catch(error){console.error("Error",error.message);}return[3,3];case 2:console.log("already connected to this hub");_a.label=3;case 3:console.log("connected to #"+this.hubConnections.size+" clients");return[2];}});});};return HarmonyHub;}(EE);exports["default"]=HarmonyHub;