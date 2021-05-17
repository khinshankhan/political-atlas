(self.webpackChunkpolitical_atlas=self.webpackChunkpolitical_atlas||[]).push([[354],{5420:function(e,t,a){"use strict";var n=a(2122),o=a(1253),r=a(7294),i=a(5505),s=a(8063),c=a(4621),l=r.forwardRef((function(e,t){var a=e.classes,c=e.className,l=e.raised,m=void 0!==l&&l,u=(0,o.Z)(e,["classes","className","raised"]);return r.createElement(s.Z,(0,n.Z)({className:(0,i.Z)(a.root,c),elevation:m?8:1,ref:t},u))}));t.Z=(0,c.Z)({root:{overflow:"hidden"}},{name:"MuiCard"})(l)},6742:function(e,t,a){"use strict";var n=a(2122),o=a(1253),r=a(7294),i=a(5505),s=a(4621),c=a(8935),l=r.forwardRef((function(e,t){var a=e.children,s=e.classes,l=e.className,m=e.focusVisibleClassName,u=(0,o.Z)(e,["children","classes","className","focusVisibleClassName"]);return r.createElement(c.Z,(0,n.Z)({className:(0,i.Z)(s.root,l),focusVisibleClassName:(0,i.Z)(m,s.focusVisible),ref:t},u),a,r.createElement("span",{className:s.focusHighlight}))}));t.Z=(0,s.Z)((function(e){return{root:{display:"block",textAlign:"inherit",width:"100%","&:hover $focusHighlight":{opacity:e.palette.action.hoverOpacity},"&$focusVisible $focusHighlight":{opacity:.12}},focusVisible:{},focusHighlight:{overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:e.transitions.create("opacity",{duration:e.transitions.duration.short})}}}),{name:"MuiCardActionArea"})(l)},1186:function(e,t,a){"use strict";var n=a(2122),o=a(1253),r=a(7294),i=a(5505),s=a(4621),c=r.forwardRef((function(e,t){var a=e.disableSpacing,s=void 0!==a&&a,c=e.classes,l=e.className,m=(0,o.Z)(e,["disableSpacing","classes","className"]);return r.createElement("div",(0,n.Z)({className:(0,i.Z)(c.root,l,!s&&c.spacing),ref:t},m))}));t.Z=(0,s.Z)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(c)},7644:function(e,t,a){"use strict";var n=a(2122),o=a(1253),r=a(7294),i=a(5505),s=a(4621),c=r.forwardRef((function(e,t){var a=e.classes,s=e.className,c=e.component,l=void 0===c?"div":c,m=(0,o.Z)(e,["classes","className","component"]);return r.createElement(l,(0,n.Z)({className:(0,i.Z)(a.root,s),ref:t},m))}));t.Z=(0,s.Z)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(c)},493:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return A}});a(4944);var n=a(7294),o=a(453),r=a(8363),i=a(3997),s=a(1617),c=a(838),l=[{name:"Adeebur Rahman",link:"adeeburrahman",description:"bugs are just undocumented features"},{name:"Brian Cheung",link:"BrianCheung1",description:"I like code"},{name:"Khinshan Khan",link:"kkhan01",description:"Emoji are fun 🙂"},{name:"Talha Rahman",link:"TalhaR",description:"I like dinosaurs"}],m=a(920),u=a(5420),d=a(6742),h=a(1186),f=a(7644),g=a(2122),p=a(1253),b=a(5505),E=a(4621),Z=["video","audio","picture","iframe","img"],v=n.forwardRef((function(e,t){var a=e.children,o=e.classes,r=e.className,i=e.component,s=void 0===i?"div":i,c=e.image,l=e.src,m=e.style,u=(0,p.Z)(e,["children","classes","className","component","image","src","style"]),d=-1!==Z.indexOf(s),h=!d&&c?(0,g.Z)({backgroundImage:'url("'.concat(c,'")')},m):m;return n.createElement(s,(0,g.Z)({className:(0,b.Z)(o.root,r,d&&o.media,-1!=="picture img".indexOf(s)&&o.img),ref:t,style:h,src:d?c||l:void 0},u),a)})),y=(0,E.Z)({root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"},img:{objectFit:"cover"}},{name:"MuiCardMedia"})(v),k=a(3332),B=(0,m.Z)({center:{textAlign:"center"},actions:{justifyContent:"center"}}),w=function(e){var t=e.member,a=B(),r=t.name,i=t.link,s=t.description;return n.createElement(u.Z,{className:a.card},n.createElement(d.Z,{href:"https://github.com/"+i,target:"_blank"},n.createElement(y,{className:a.media,component:"img",alt:"Picture of "+r,image:"https://github.com/"+i+".png",title:"Picture of "+r}),n.createElement(f.Z,null,n.createElement(o.Z,{gutterBottom:!0,variant:"h5",align:"center"},r),n.createElement(o.Z,{variant:"body2",color:"textSecondary",component:"p",className:a.center},'"',s,'"'))),n.createElement(h.Z,{className:a.actions},n.createElement(k.Z,{size:"small",color:"primary",href:"https://github.com/"+i,target:"_blank"},"Github")))},N=function(){return n.createElement(n.Fragment,null,n.createElement(c.Z,{container:!0,spacing:3},l.map((function(e,t){return n.createElement(c.Z,{key:t,item:!0,xs:6,sm:3},n.createElement(w,{member:e}))}))))},A=function(){var e,t=((e=r.lz.map((function(e){return r.FE[e].ibm})).flat()).sort(),e),a=function(){var e=r.lz.map((function(e){return r.FE[e].da})).flat();return e.sort(),e}();return n.createElement(s.Z,null,n.createElement("br",null),n.createElement(o.Z,{variant:"h4",gutterBottom:!0},"About"),n.createElement(o.Z,{variant:"h5",gutterBottom:!0},"Goal"),n.createElement(o.Z,{variant:"body1",gutterBottom:!0},"Better the understanding of rhetoric used by politicians through a comprehensive analysis of the tones in their speeches."),n.createElement(o.Z,{variant:"h5",gutterBottom:!0},"What We Did"),n.createElement(o.Z,{variant:"body1",gutterBottom:!0},"We used the IBM API to analyze the transcript of speeches to detect emotions based off word choices and clustering. We also used the DeepAffects API to ananalyze inflections in the audio to determine emotions. We then compared the two outputs."),n.createElement(o.Z,{variant:"h5",gutterBottom:!0},"Emotion Key"),n.createElement(o.Z,{variant:"body1",gutterBottom:!0},"The IBM API would return ",n.createElement("i",null,t.join(", "))," and the DeepAffects API would return ",n.createElement("i",null,a.join(", ")),". Actually, the IBM API would return no emotions for a sentence it found neutral, but we decided to make that neutral in order to be able to analyze the sentence."),n.createElement(o.Z,{variant:"body1",gutterBottom:!0},"As is, the data is really incomparable, so we decided to transform the data such that uniform emotions are used. We created the keys"," ",n.createElement("i",null,r.lz.join(", ")),". This is how the emotions map over from each kind of API:"),r.lz.map((function(e,t){return n.createElement(o.Z,{key:t,variant:"body1",gutterBottom:!0},"- ",(0,i.kC)(e)," ",n.createElement("br",null),"IBM API: ",r.FE[e].ibm.join(", "),n.createElement("br",null),"DeepAffects API: ",r.FE[e].da.join(", "))})),n.createElement(o.Z,{variant:"body1",gutterBottom:!0},"We also associated colors with each emotion. We decided to associate the strength of the color sentences based on confidence of the emotions. It is as follows:"),r.lz.map((function(e,t){var a=r.FE[e].color,s=(0,r.By)(a,.25),c=s[0],l=s[1],m=(0,r.By)(a,.63),u=m[0],d=m[1],h=(0,r.By)(a,.87),f=h[0],g=h[1];return n.createElement(o.Z,{key:t,variant:"body1",gutterBottom:!0},"- ",(0,i.kC)(e)," ",n.createElement("br",null),n.createElement("span",{style:{backgroundColor:c,color:l}},"0 - 50")," ",n.createElement("span",{style:{backgroundColor:u,color:d}},"50 -75")," ",n.createElement("span",{style:{backgroundColor:f,color:g}},"75 - 100"))})),n.createElement(o.Z,{variant:"h5",gutterBottom:!0},"Background"),n.createElement(o.Z,{variant:"body1",gutterBottom:!0},"We are a group of 4 students at Hunter College that wanted to contribute positively to political discord. We noticed that as of late that political discussion was struggling. Many people are losing trust in our institutions and officials so we wanted to create a resource to help the American electorate."),n.createElement(o.Z,{variant:"h5",gutterBottom:!0},"Members"),n.createElement(N,null),n.createElement("br",null))}}}]);
//# sourceMappingURL=component---src-pages-about-jsx-1762b1ab1ad2761e4140.js.map