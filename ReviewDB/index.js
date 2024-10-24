(function(R,a,o,E,t,O,M,v,S,m,d,b,z){"use strict";const C="915703782174752809",p="https://manti.vendicated.dev",h=p+"/api/reviewdb";var j=Object.freeze({__proto__:null,API_URL:h,BASE_URL:p,CLIENT_ID:C});const{getCurrentUser:I}=o.findByStoreName("UserStore"),V=o.find(function(e){return e.default?.internal?.resolveSemanticColor})?.default.internal.resolveSemanticColor??o.find(function(e){return e.meta?.resolveSemanticColor})?.meta.resolveSemanticColor??function(){},{useThemeContext:J}=o.findByProps("useThemeContext"),A=function(e){return e.sender.discordID===I()?.id||T.includes(I()?.id)};async function c(e,n){const r=await(await fetch(e,{headers:{"content-type":"application/json",accept:"application/json"},...n})).json();if(r.success===!1)throw new Error(r.message);return r}const w=function(e){return V(J()?.theme??"dark",E.semanticColors[e])};var X=Object.freeze({__proto__:null,canDeleteReview:A,jsonFetch:c,useThemedColor:w});const N=async function(e){return(await c(h+`/users/${e}/reviews`)).reviews},D=async function(){return await c(p+"/admins")},_=async function(e,n){return await c(h+`/users/${e}/reviews`,{method:"PUT",body:JSON.stringify({comment:n,token:a.storage.authToken})})},P=async function(e,n){return await c(h+`/users/${e}/reviews`,{method:"DELETE",body:JSON.stringify({reviewid:n,token:a.storage.authToken})})},B=async function(e){return await c(h+"/reports",{method:"PUT",body:JSON.stringify({reviewid:e,token:a.storage.authToken})})};var Y=Object.freeze({__proto__:null,addReview:_,deleteReview:P,getAdmins:D,getCurrentUser:async function(){return await c(h+"/users",{method:"POST",body:JSON.stringify({token:a.storage.authToken})})},getReviews:N,reportReview:B});const{hideActionSheet:H}=o.findByProps("openLazy","hideActionSheet"),{showSimpleActionSheet:G}=o.findByProps("showSimpleActionSheet");function x(e){return G({key:"ReviewOverflow",header:{title:e.type!==3?`Review by ${e.sender.username}`:"ReviewDB System Message",onClose:function(){return H()}},options:[{label:"Copy Text",onPress:function(){t.clipboard.setString(e.comment),m.showToast("Copied Review Text",d.getAssetIDByName("ic_message_copy"))}},...a.storage.authToken&&e.type!==3?[...A(e)?[{label:"Delete Review",isDestructive:!0,onPress:function(){return S.showConfirmationAlert({title:"Delete Review",content:"Are you sure you want to delete this review?",confirmText:"Yes",cancelText:"No",confirmColor:"red",onConfirm:function(){return P(e.sender.discordID,e.id)}})}}]:[],{label:"Report Review",isDestructive:!0,onPress:function(){return S.showConfirmationAlert({title:"Report Review",content:"Are you sure you want to report this review?",confirmText:"Yes",cancelText:"No",confirmColor:"red",onConfirm:function(){return B(e.id)}})}}]:[]]})}function W(e){let{badge:n}=e;return React.createElement(t.ReactNative.Pressable,{style:{marginLeft:4},onPress:function(){m.showToast(n.name,{uri:n.icon})}},React.createElement(t.ReactNative.Image,{source:{uri:n.icon,width:16,height:16}}))}const k=t.stylesheet.createThemedStyleSheet({row:{flexDirection:"row",alignItems:"center"}}),{FormLabel:q}=v.Forms;function K(e){let{username:n,badges:r}=e;return React.createElement(t.ReactNative.View,{style:k.row},React.createElement(q,{text:n,style:{color:w("TEXT_NORMAL")}}),React.createElement(t.ReactNative.View,{style:k.row},r.map(function(s){return React.createElement(W,{badge:s})})))}const Q=t.stylesheet.createThemedStyleSheet({avatar:{height:36,width:36,borderRadius:18}}),{FormRow:Z,FormSubLabel:ee}=v.Forms;function te(e){let{review:n}=e;return React.createElement(Z,{label:React.createElement(K,{username:n.sender.username,badges:n.sender.badges}),subLabel:React.createElement(ee,{text:n.comment,style:{color:w("TEXT_NORMAL")}}),leading:React.createElement(t.ReactNative.Image,{style:Q.avatar,source:{uri:n.sender.profilePhoto}}),onLongPress:function(){return x(n)}})}const g=t.stylesheet.createThemedStyleSheet({container:{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",paddingHorizontal:8,paddingVertical:4},textInput:{flex:1,flexGrow:1,fontSize:16,fontFamily:t.constants.Fonts.DISPLAY_MEDIUM},sendButton:{flexShrink:1,flexDirection:"row",alignItems:"center",justifyContent:"center",minHeight:40,minWidth:40,borderRadius:999}}),{useThemeContext:ne}=o.findByProps("useThemeContext");function re(e){let{userId:n,shouldEdit:r,refetch:s}=e;b.useProxy(a.storage);const[i,l]=t.React.useState(""),u=!a.storage.authToken,F=!a.storage.authToken||i.length===0;return t.React.createElement(t.ReactNative.View,{style:g.container},t.React.createElement(t.ReactNative.TextInput,{style:{...g.textInput,color:w("TEXT_NORMAL")},editable:!u,placeholder:u?"You must be authenticated to add a review.":`Tap to ${r?"edit your":"add a"} review`,placeholderTextColor:w("INPUT_PLACEHOLDER_TEXT"),value:i,onChangeText:function(y){return l(y)}}),t.React.createElement(t.ReactNative.Pressable,{style:{...g.sendButton,backgroundColor:a.storage.useThemedSend&&ne().primaryColor||E.rawColors.BRAND_500,opacity:F?.25:1},disabled:F,onPress:function(){_(n,i).then(function(y){l(""),s(),m.showToast(y.message,d.getAssetIDByName("Check"))}).catch(function(y){return m.showToast(y.message,d.getAssetIDByName("Small"))})}},t.React.createElement(t.ReactNative.Image,{style:{tintColor:"#fff"},source:d.getAssetIDByName("ic_send")})))}const{getCurrentUser:ae}=o.findByStoreName("UserStore"),oe=o.findByName("UserProfileSection");function ie(e){let{userId:n}=e;const[r,s]=t.React.useState([]),i=function(){N(n).then(function(u){return s(u)})};t.React.useEffect(i,[]);const l=r.filter(function(u){return u.sender.discordID===ae()?.id}).length!==0;return t.React.createElement(v.ErrorBoundary,null,t.React.createElement(oe,{title:"Reviews",showContainer:!0},t.React.createElement(t.ReactNative.View,{style:{flex:1}},r.map(function(u){return t.React.createElement(te,{review:u})})),t.React.createElement(re,{userId:n,refetch:i,shouldEdit:l})))}const se=o.findByTypeName("UserProfile");function ce(){return O.after("type",se,function(e,n){const r=M.findInReactTree(n,function(i){return i?.type?.displayName==="View"&&i?.props?.children.findIndex(function(l){return l?.type?.name==="UserProfileBio"})!==-1})?.props?.children,s=e[0]?.userId;r?.push(t.React.createElement(ie,{userId:s}))})}const{pushModal:le,popModal:U}=o.findByProps("pushModal"),ue=o.findByName("OAuth2AuthorizeModal");function L(){return le({key:"oauth2-authorize",modal:{key:"oauth2-authorize",modal:ue,animation:"slide-up",shouldPersistUnderModals:!1,props:{clientId:C,redirectUri:h+"/auth",scopes:["identify"],responseType:"code",permissions:0n,cancelCompletesFlow:!1,callback:async function(e){let{location:n}=e;try{const r=new URL(n);r.searchParams.append("returnType","json"),r.searchParams.append("clientMod","vendetta");const{token:s,success:i,message:l}=await c(r,{headers:{accept:"application/json"}});if(i)a.storage.authToken=s;else throw U("oauth2-authorize"),new Error(l)}catch(r){z.logger.error("Authorization failed!",r)}},dismissOAuthModal:function(){return U("oauth2-authorize")}},closable:!0}})}function de(){return globalThis.vendettaRDB={api:Y,utils:{...X,showAuthModal:L,showReviewActionSheet:x},constants:j},function(){return delete globalThis.vendettaRDB}}const{FormSection:$,FormRow:f,FormSwitchRow:he,FormDivider:fe}=v.Forms;function we(){return b.useProxy(a.storage),React.createElement(t.ReactNative.ScrollView,{style:{flex:1},contentContainerStyle:{paddingBottom:38}},React.createElement($,{title:"Authentication",titleStyleType:"no_border"},React.createElement(f,{label:"Authenticate with ReviewDB",leading:React.createElement(f.Icon,{source:d.getAssetIDByName("copy")}),trailing:f.Arrow,onPress:L}),React.createElement(fe,null),React.createElement(f,{label:"Log out of ReviewDB",subLabel:"Note that this does not remove ReviewDB from your Authorized Apps page in Discord.",leading:React.createElement(f.Icon,{source:d.getAssetIDByName("ic_logout_24px")}),disabled:a.storage.authToken.length===0,onPress:function(){return a.storage.authToken=""}})),React.createElement($,{title:"Settings"},React.createElement(he,{label:"Use profile-themed send button",subLabel:"Controls whether the review send button should attempt to match the user's profile colors.",leading:React.createElement(f.Icon,{source:d.getAssetIDByName("ic_paint_brush")}),value:a.storage.useThemedSend,onValueChange:function(e){return a.storage.useThemedSend=e}})))}a.storage.authToken??="",a.storage.useThemedSend??=!0;const ye=[de(),ce()],T=[];D().then(function(e){return T.push(...e)});const Re=function(){return ye.forEach(function(e){return e()})};return R.admins=T,R.onUnload=Re,R.settings=we,R})({},vendetta.plugin,vendetta.metro,vendetta.ui,vendetta.metro.common,vendetta.patcher,vendetta.utils,vendetta.ui.components,vendetta.ui.alerts,vendetta.ui.toasts,vendetta.ui.assets,vendetta.storage,vendetta);