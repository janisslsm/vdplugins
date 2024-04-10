(function(b,C,y,c,e,z,G,U){"use strict";const{FormSection:_,FormDivider:M,FormIcon:H,FormSwitchRow:h}=G.Forms;function x(){return U.useProxy(e.storage),React.createElement(z.ReactNative.ScrollView,null,React.createElement(_,{title:"User Profile",titleStyleType:"no_border"},React.createElement(h,{label:"Hide call button",leading:React.createElement(H,{source:c.getAssetIDByName("ic_audio")}),onValueChange:function(d){e.storage.upHideVoiceButton=d},value:e.storage.upHideVoiceButton}),React.createElement(M,null),React.createElement(h,{label:"Hide video button",leading:React.createElement(H,{source:c.getAssetIDByName("ic_video")}),onValueChange:function(d){e.storage.upHideVideoButton=d},value:e.storage.upHideVideoButton})),React.createElement(_,{title:"DMs",titleStyleType:"no_border"},React.createElement(h,{label:"Hide call button",leading:React.createElement(H,{source:c.getAssetIDByName("ic_audio")}),onValueChange:function(d){e.storage.dmHideCallButton=d},value:e.storage.dmHideCallButton}),React.createElement(M,null),React.createElement(h,{label:"Hide video button",leading:React.createElement(H,{source:c.getAssetIDByName("ic_video")}),onValueChange:function(d){e.storage.dmHideVideoButton=d},value:e.storage.dmHideVideoButton})),React.createElement(_,{title:"Other",titleStyleType:"no_border"},React.createElement(h,{label:"Hide video button in VC",leading:React.createElement(H,{source:c.getAssetIDByName("video")}),onValueChange:function(d){return e.storage.hideVCVideoButton=d},value:e.storage.hideVCVideoButton})))}let g=[];var J={onLoad:function(){e.storage.upHideVoiceButton??=!0,e.storage.upHideVideoButton??=!0,e.storage.dmHideCallButton??=!1,e.storage.dmHideVideoButton??=!1,e.storage.hideVCVideoButton??=!1;let d=c.getAssetIDByName("ic_video"),R=c.getAssetIDByName("ic_audio");const T=c.getAssetIDByName("video"),j=c.getAssetIDByName("nav_header_connect"),L=c.getAssetIDByName("VideoIcon"),O=c.getAssetIDByName("PhoneCallIcon");d===void 0&&(d=L),R===void 0&&(R=O);const K=C.findByName("UserProfileActions",!1),Q=C.find(function(p){var t;return(p==null||(t=p.type)===null||t===void 0?void 0:t.name)=="PrivateChannelButtons"}),W=C.findByProps("ChannelButtons"),X=C.findByProps("VideoButton");g.push(y.after("default",K,function(p,t){var i,l,u,r,a,o,B,v,f,V;if(!e.storage.upHideVideoButton&&!e.storage.upHideVoiceButton)return;let n=t==null||(a=t.props)===null||a===void 0||(r=a.children)===null||r===void 0||(u=r.props)===null||u===void 0||(l=u.children[1])===null||l===void 0||(i=l.props)===null||i===void 0?void 0:i.children;if(n===void 0&&(n=t==null||(v=t.props)===null||v===void 0||(B=v.children[1])===null||B===void 0||(o=B.props)===null||o===void 0?void 0:o.children),(n==null||(f=n.props)===null||f===void 0?void 0:f.children)!==void 0&&(n=n==null||(V=n.props)===null||V===void 0?void 0:V.children),n!==void 0)for(var s in n){var I,D,N,A,m=n[s];if((m==null||(I=m.props)===null||I===void 0?void 0:I.children)!==void 0){var S,F=m==null||(S=m.props)===null||S===void 0?void 0:S.children;for(var k in F){var P,w,E=F[k];((E==null||(P=E.props)===null||P===void 0?void 0:P.icon)===R&&e.storage.upHideVoiceButton||(E==null||(w=E.props)===null||w===void 0?void 0:w.icon)===d&&e.storage.upHideVideoButton)&&delete F[k]}}(m==null||(D=m.props)===null||D===void 0?void 0:D.IconComponent)!==void 0&&(e.storage.upHideVoiceButton&&delete n[1],e.storage.upHideVideoButton&&delete n[2]),((m==null||(N=m.props)===null||N===void 0?void 0:N.icon)===R&&e.storage.upHideVoiceButton||(m==null||(A=m.props)===null||A===void 0?void 0:A.icon)===d&&e.storage.upHideVideoButton)&&delete n[s]}})),g.push(y.after("default",X,function(p,t){var i,l,u,r,a;if(!e.storage.hideVCVideoButton)return;const o=t==null||(a=t.props)===null||a===void 0||(r=a.children)===null||r===void 0||(u=r.props)===null||u===void 0||(l=u.children)===null||l===void 0||(i=l.props)===null||i===void 0?void 0:i.children;o!==void 0&&delete o[0]})),g.push(y.after("type",Q,function(p,t){var i,l,u,r,a;if(!e.storage.dmHideCallButton&&!e.storage.dmHideVideoButton)return;let o=t==null||(i=t.props)===null||i===void 0?void 0:i.children;if(o!==void 0&&(((u=o[0])===null||u===void 0||(l=u.props)===null||l===void 0?void 0:l.source)===void 0&&(o=(a=o[0])===null||a===void 0||(r=a.props)===null||r===void 0?void 0:r.children),o!==void 0))for(var B in o){var v,f,V,n,s=o[B];((s==null||(v=s.props)===null||v===void 0?void 0:v.source)===j&&e.storage.dmHideCallButton||(s==null||(f=s.props)===null||f===void 0?void 0:f.source)===T&&e.storage.dmHideVideoButton||(s==null||(V=s.props)===null||V===void 0?void 0:V.source)===O&&e.storage.dmHideCallButton||(s==null||(n=s.props)===null||n===void 0?void 0:n.source)===L&&e.storage.dmHideVideoButton)&&delete o[B]}})),g.push(y.after("ChannelButtons",W,function(p,t){var i;if(!e.storage.dmHideCallButton&&!e.storage.dmHideVideoButton)return;const l=t==null||(i=t.props)===null||i===void 0?void 0:i.children;if(l!==void 0)for(var u in l){var r,a,o,B,v=(a=l[u])===null||a===void 0||(r=a.props)===null||r===void 0?void 0:r.children[0];v!==void 0&&((v==null||(o=v.props)===null||o===void 0?void 0:o.source)===j&&e.storage.dmHideCallButton||(v==null||(B=v.props)===null||B===void 0?void 0:B.source)===T&&e.storage.dmHideVideoButton)&&delete l[u]}}))},onUnload:function(){for(const d of g)d()},settings:x};return b.default=J,Object.defineProperty(b,"__esModule",{value:!0}),b})({},vendetta.metro,vendetta.patcher,vendetta.ui.assets,vendetta.plugin,vendetta.metro.common,vendetta.ui.components,vendetta.storage);
