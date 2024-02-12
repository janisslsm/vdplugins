(function(I,f,e,A,o,te,c,w,g,ae){"use strict";var T={Failed:c.getAssetIDByName("Small"),Delete:c.getAssetIDByName("ic_message_delete"),Copy:c.getAssetIDByName("toast_copy_link"),Open:c.getAssetIDByName("ic_leave_stage"),Clipboard:c.getAssetIDByName("pending-alert"),Clock:c.getAssetIDByName("clock"),Pronoun:c.getAssetIDByName("ic_accessibility_24px"),Settings:{Toasts:{Settings:c.getAssetIDByName("ic_selection_checked_24px"),Failed:c.getAssetIDByName("ic_close_circle_24px")},Initial:c.getAssetIDByName("coffee"),Update:c.getAssetIDByName("discover"),Locale:c.getAssetIDByName("ic_locale_24px"),External:c.getAssetIDByName("ic_raised_hand_list"),Edit:c.getAssetIDByName("ic_edit_24px")}},b={shadow:function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:.1;return{shadowColor:"#000",shadowOffset:{width:1,height:4},shadowOpacity:a,shadowRadius:4.65,elevation:8}},displayToast:function(a,t){e.toasts.open({content:t=="clipboard"?`Copied ${a} to clipboard.`:a,source:t=="clipboard"?T.Clipboard:T.Settings.Initial})}};function M(a,t,r,i,s){try{return a(...t)}catch(n){console.warn(`[${r}] The following error happened when trying to ${i} ${s??"unspecificied label"}: ${n}`);return}}const F=function(a,t,r,i){return M(function(){if(a){a.length++,r++;for(let s=a.length-1;s>=r;s--)a[s]=a[s-1];return a[r-1]=t,a.length}},[a,t,r],o.manifest.name,"insert an item at",i)};var k={mapItem:function(a,t,r){return M(function(){let i=[];for(let s=0;s<a.length;s++)F(i,t(a[s],s,a),i.length);return i},[a,t],o.manifest.name,"map an array at",r)},insertItem:F},u={map:{},queue:[],fetching:!1,referenceMap:{hh:"he/him",hi:"he/it",hs:"he/she",ht:"he/they",ih:"it/him",ii:"it/its",is:"it/she",it:"it/they",shh:"she/he",sh:"she/her",si:"she/it",st:"she/they",th:"they/he",ti:"they/it",ts:"they/she",tt:"they/them",any:"any",other:"other",ask:"ask",avoid:"avoid, use name",unspecified:"unspecified"},async updateQueuedPronouns(){var a=this;if(this.queue.length<=0||this.fetching)return;const t=this.queue.splice(0,49),r=function(n){return a.queue.length<=0?n:a.map[n]?r(a.queue.shift()):n};for(const n of t)this.map[n]&&(t[n]=r(n));this.fetching=!0;const i=await(await fetch(`https://pronoundb.org/api/v1/lookup-bulk?platform=discord&ids=${t.join(",")}`,{method:"GET",headers:{Accept:"application/json","X-PronounDB-Source":"Vendetta"}})).json(),s=Object.fromEntries(Object.entries(i).filter(function(n){let[d,v]=n;return!isNaN(+d)}));Object.assign(this.map,s),this.fetching=!1,this.queue.length>0&&this.updateQueuedPronouns()}},P={plugin:{source:"https://github.com/acquitelol/vd-pronoun-db",pronoundb:"https://pronoundb.org/"},author:{profile:{"Rosie<3":"https://github.com/acquitelol"}}};const{View:V,Text:G,TouchableOpacity:ne}=w.General,{useThemeContext:re}=f.findByProps("useThemeContext"),{meta:{resolveSemanticColor:ie}}=f.findByProps("colors","meta"),se=f.findByName("UserProfileSection"),{UserProfileGradientCard:oe}=f.findByProps("UserProfileGradientCard"),Y=f.findByProps("triggerHaptic"),x=e.stylesheet.createThemedStyleSheet({container:{alignSelf:"flex-start",padding:1,borderRadius:9,width:"100%",marginTop:-4,marginRight:-12},innerContainer:{paddingHorizontal:6,paddingVertical:8,overflow:"hidden",flexDirection:"row",justifyContent:"center",alignItems:"center"},circle:{width:10,height:10,borderRadius:10/2,marginRight:6},fallback:{color:g.semanticColors.BACKGROUND_SECONDARY_ALT},text:{fontFamily:e.constants.Fonts.DISPLAY_NORMAL}});function le(a){let{pronoun:t}=a;const r=re(),i=ie(r.theme,g.semanticColors.TEXT_NORMAL);return e.React.createElement(se,{title:"Pronouns"},e.React.createElement(ne,{onPress:function(){e.toasts.open({content:t,source:T.Pronoun}),Y&&Y.triggerHaptic()},style:o.storage.isRole?{justifyContent:"center",alignItems:"center"}:{}},o.storage.isRole?e.React.createElement(oe,{style:x.container,fallbackBackground:x.fallback.color},e.React.createElement(V,{style:x.innerContainer},e.React.createElement(V,{style:[x.circle,{backgroundColor:i}]}),e.React.createElement(G,{style:[x.text,{color:i}]},t))):e.React.createElement(G,{style:[x.text,{fontSize:16,color:i}]},t)))}const{TouchableOpacity:B,View:N,Image:ce,Text:_,Animated:S}=w.General,H=f.findByProps("transitionToGuild","openURL"),$=f.findByStoreName("UserStore"),ue=f.findByProps("showUserProfile"),E=e.stylesheet.createThemedStyleSheet({container:{marginTop:25,marginLeft:"5%",marginBottom:-15,flexDirection:"row"},textContainer:{paddingLeft:15,paddingTop:5,flexDirection:"column",flexWrap:"wrap",...b.shadow()},image:{width:75,height:75,borderRadius:10,...b.shadow()},mainText:{opacity:.975,letterSpacing:.25},header:{color:g.semanticColors.HEADER_PRIMARY,fontFamily:e.constants.Fonts.DISPLAY_BOLD,fontSize:25,letterSpacing:.25},subHeader:{color:g.semanticColors.HEADER_SECONDARY,fontSize:12.75}});function de(a){let{name:t,authors:r}=a;var i,s;const n=e.React.useRef(new S.Value(1)).current,d=function(){return S.spring(n,{toValue:1.1,duration:10,useNativeDriver:!0}).start()},v=function(){return S.spring(n,{toValue:1,duration:250,useNativeDriver:!0}).start()},m=function(){return ue.showUserProfile({userId:$.getCurrentUser().id})},l={transform:[{scale:n}]};return e.React.createElement(e.React.Fragment,null,e.React.createElement(N,{style:E.container},e.React.createElement(B,{onPress:m,onPressIn:d,onPressOut:v},e.React.createElement(S.View,{style:l},e.React.createElement(ce,{style:[E.image],source:{uri:$==null||(s=$.getCurrentUser())===null||s===void 0||(i=s.getAvatarURL())===null||i===void 0?void 0:i.replace("webp","png")}}))),e.React.createElement(N,{style:E.textContainer},e.React.createElement(B,{onPress:function(){return H.openURL(P.plugin.source)}},e.React.createElement(_,{style:[E.mainText,E.header]},t)),e.React.createElement(N,{style:{flexDirection:"row"}},e.React.createElement(_,{style:[E.mainText,E.subHeader]},"A project by"),k.mapItem(r,function(h,p,D){return e.React.createElement(B,{onPress:function(){return H.openURL(P.author.profile[h.name]??"https://github.com/")}},e.React.createElement(_,{style:[E.mainText,E.subHeader,{paddingLeft:4,fontFamily:e.constants.Fonts.DISPLAY_BOLD,flexDirection:"row"}]},h.name,p<D.length-1?",":null))})))))}const{View:he,Text:pe}=w.General,q=e.stylesheet.createThemedStyleSheet({text:{color:g.semanticColors.HEADER_SECONDARY,paddingLeft:"5.5%",paddingRight:10,marginBottom:10,letterSpacing:.25,fontFamily:e.constants.Fonts.PRIMARY_BOLD,fontSize:12}});function O(a){let{label:t,children:r}=a;return e.React.createElement(he,{style:{marginTop:10}},e.React.createElement(pe,{style:[q.text,q.optionText]},t.toUpperCase()),r)}var L;const{Image:j}=w.General,fe=(L=e.ReactNative.Dimensions)===null||L===void 0?void 0:L.get("window").width;function z(a){let{style:t,source:r}=a;const[i,s]=e.React.useState({width:0,height:0}),[n,d]=e.React.useState(0),v=function(){const m=function(p){return typeof p=="string"?parseInt(p.replace("%",""))*fe/100:p},l=m(t.width);if(!t.maxWidth)return l;const h=m(t.maxWidth);return l>h?h:l};return e.React.useEffect(function(){j.getSize(r,function(m,l){s({width:m,height:l})},function(m){console.error(`[${o.manifest.name}] ${m} when fetching ${r}`)}),d(v())},[]),e.React.createElement(j,{style:[...Array.isArray(t)?t:[t],{height:n*(i.height/i.width)}],source:{uri:r},resizeMode:"stretch"})}const{FormRow:R,FormSwitch:W,FormDivider:K}=w.Forms,{ScrollView:ge,View:C,Text:ye}=w.General,Q=f.findByProps("transitionToGuild","openURL"),y=e.stylesheet.createThemedStyleSheet({icon:{color:g.semanticColors.INTERACTIVE_NORMAL},item:{color:g.semanticColors.TEXT_MUTED,fontFamily:e.constants.Fonts.PRIMARY_MEDIUM},container:{width:"90%",marginLeft:"5%",borderRadius:10,backgroundColor:g.semanticColors.BACKGROUND_MOBILE_SECONDARY,...b.shadow()},subheaderText:{color:g.semanticColors.HEADER_SECONDARY,textAlign:"center",margin:10,marginBottom:50,letterSpacing:.25,fontFamily:e.constants.Fonts.PRIMARY_BOLD,fontSize:14},image:{width:"100%",maxWidth:350,borderRadius:10}});function Re(){ae.useProxy(o.storage);const[a,t]=e.React.useState(o.storage.isTimestamp),[r,i]=e.React.useState(o.storage.isRole);return e.React.createElement(ge,null,e.React.createElement(de,{name:o.manifest.name,authors:o.manifest.authors}),e.React.createElement(C,{style:{marginTop:20}},e.React.createElement(O,{label:"Preferences"},e.React.createElement(C,{style:[y.container]},e.React.createElement(R,{label:"Timestamps",subLabel:"Use Timestamps instead of OP Tag for the pronoun in the chat area.",onLongPress:function(){return b.displayToast(`By default, ${o.manifest.name} will use the OP tag to display pronouns. Toggling this option will always use Timestamps instead of OP tag for pronouns.`,"tooltip")},leading:e.React.createElement(R.Icon,{style:y.icon,source:T.Settings.Locale}),trailing:e.React.createElement(W,{value:o.storage.isTimestamp,onValueChange:function(){o.storage.isTimestamp=!o.storage.isTimestamp,t(o.storage.isTimestamp)}})}),e.React.createElement(K,null),e.React.createElement(R,{label:"Roles",subLabel:"Show the pronoun styled as a role instead of plain text inside of profiles.",onLongPress:function(){return b.displayToast(`With this option enabled, ${o.manifest.name} will style pronouns as roles in profiles. Otherwise, it will style them as plain text.`,"tooltip")},leading:e.React.createElement(R.Icon,{style:y.icon,source:T.Settings.Edit}),trailing:e.React.createElement(W,{value:o.storage.isRole,onValueChange:function(){o.storage.isRole=!o.storage.isRole,i(o.storage.isRole)}})}))),e.React.createElement(O,{label:"Previews"},e.React.createElement(C,{style:{...y.container,maxWidth:350}},e.React.createElement(z,{style:y.image,source:`https://cdn.discordapp.com/attachments/${a?"1011346757214543875/1075007230337896448/pronoun-timestamp.png":"1011346757214543875/1075007230107193374/pronoun-tag.png"}`})),e.React.createElement(C,{style:{...y.container,marginTop:10,maxWidth:350}},e.React.createElement(z,{style:y.image,source:`https://cdn.discordapp.com/attachments/${r?"1011346757214543875/1075007778399199282/profile-role.png":"1011346757214543875/1075007778067841044/profile-plain.png"}`}))),e.React.createElement(O,{label:"Source"},e.React.createElement(C,{style:y.container},e.React.createElement(R,{label:"Source",subLabel:`Open the repository of ${o.manifest.name} externally.`,onLongPress:function(){return b.displayToast(`Opens the repository of ${o.manifest.name} on GitHub in an external page to view any source code of the plugin.`,"tooltip")},leading:e.React.createElement(R.Icon,{style:y.icon,source:T.Open}),trailing:function(){return e.React.createElement(R.Arrow,null)},onPress:function(){Q.openURL(P.plugin.source)}}),e.React.createElement(K,null),e.React.createElement(R,{label:"PronounDB",subLabel:`Open the ${o.manifest.name} website externally at \`https://pronoundb.org\`.`,onLongPress:function(){return b.displayToast("Opens the PronounDB website in an external page which allows you to link your Discord account to PronounDB.","tooltip")},leading:e.React.createElement(R.Icon,{style:y.icon,source:T.Settings.External}),trailing:function(){return e.React.createElement(R.Arrow,null)},onPress:function(){Q.openURL(P.plugin.pronoundb)}})))),e.React.createElement(ye,{style:y.subheaderText},`Build: (${o.manifest.hash.substring(0,8)})`))}const me=f.find(function(a){var t;return(a==null||(t=a.type)===null||t===void 0?void 0:t.name)=="UserProfile"}),Ee=f.findByStoreName("UserStore"),{DCDChatManager:ve}=e.ReactNative.NativeModules,X=e.stylesheet.createThemedStyleSheet({opTagBackgroundColor:{color:g.semanticColors.HEADER_PRIMARY},opTagTextColor:{color:g.semanticColors.BACKGROUND_PRIMARY}});let J,Z,ee;var Te={onLoad:function(){J=A.before("getUser",Ee,function(a){const t=a[0];u.map[t]||k.insertItem(u.queue,t,u.queue.length,"user id pronoun queue"),u.updateQueuedPronouns()}),Z=A.after("type",me,function(a,t){var r,i,s,n;const d=(i=te.findInReactTree(t,function(l){var h,p;return(l==null||(h=l.type)===null||h===void 0?void 0:h.displayName)==="View"&&(l==null||(p=l.props)===null||p===void 0?void 0:p.children.findIndex(function(D){var U;return(D==null||(U=D.type)===null||U===void 0?void 0:U.name)==="UserProfileBio"}))!==-1}))===null||i===void 0||(r=i.props)===null||r===void 0?void 0:r.children;if(!d)return t;const{userId:v}=(d==null||(n=d.find(function(l){var h,p;return typeof(l==null||(p=l.props)===null||p===void 0||(h=p.displayProfile)===null||h===void 0?void 0:h.userId)=="string"}))===null||n===void 0||(s=n.props)===null||s===void 0?void 0:s.displayProfile)??{};if(!v||!u.map[v]||u.referenceMap[u.map[v]]==="unspecified")return t;const m=u.referenceMap[u.map[v]];d.unshift(React.createElement(le,{pronoun:m}))}),ee=A.before("updateRows",ve,function(a){const t=JSON.parse(a[1]);for(const n of t){var r,i,s;if(n.type!==1||!(!(n==null||(r=n.message)===null||r===void 0)&&r.authorId)||!u.map[n==null||(i=n.message)===null||i===void 0?void 0:i.authorId]||u.referenceMap[u.map[n==null||(s=n.message)===null||s===void 0?void 0:s.authorId]]==="unspecified")continue;const d=u.referenceMap[u.map[n.message.authorId]];if(o.storage.isTimestamp&&n.message.timestamp){n.message.timestamp+=" \u2022 "+d;continue}n.message.opTagText&&(n.message.tagText=n.message.tagText?n.message.tagText+" \u2022 ":""+n.message.opTagText),n.message.opTagText=d,n.message.opTagTextColor=e.ReactNative.processColor(X.opTagTextColor.color),n.message.opTagBackgroundColor=e.ReactNative.processColor(X.opTagBackgroundColor.color)}a[1]=JSON.stringify(t)})},onUnload:function(){J?.(),Z?.(),ee?.()},settings:Re};return I.default=Te,Object.defineProperty(I,"__esModule",{value:!0}),I})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.plugin,vendetta.utils,vendetta.ui.assets,vendetta.ui.components,vendetta.ui,vendetta.storage);