(function(e,i){typeof exports=="object"&&typeof module<"u"?module.exports=i(require("vue"),require("lkt-data-state"),require("lkt-http-client")):typeof define=="function"&&define.amd?define(["vue","lkt-data-state","lkt-http-client"],i):(e=typeof globalThis<"u"?globalThis:e||self,e.LktPaginator=i(e.Vue,e.lktDataState,e.LktHttpClient))})(this,function(e,i,p){"use strict";var w=Object.defineProperty;var D=(e,i,p)=>i in e?w(e,i,{enumerable:!0,configurable:!0,writable:!0,value:p}):e[i]=p;var f=(e,i,p)=>(D(e,typeof i!="symbol"?i+"":i,p),p);class d{}f(d,"FIRST_BUTTON_NAME","First"),f(d,"PREV_BUTTON_NAME","Prev"),f(d,"NEXT_BUTTON_NAME","Next"),f(d,"LATEST_BUTTON_NAME","Latest");const y={name:"LktPaginator",inheritAttrs:!1},_=e.defineComponent({...y,props:{modelValue:{type:Number,default:1},resource:{type:String,default:""},palette:{type:String,default:""},readOnly:{type:Boolean,default:!1},filters:{type:Object,default(){return{}}}},emits:["update:modelValue","loading","results","error"],setup(c,{emit:r}){const N=r,s=c,l=e.ref(s.modelValue),u=e.ref(1),h=e.computed(()=>d.FIRST_BUTTON_NAME),V=e.computed(()=>d.PREV_BUTTON_NAME),O=e.computed(()=>d.NEXT_BUTTON_NAME),x=e.computed(()=>d.LATEST_BUTTON_NAME),C=e.computed(()=>{let t=[],o=l.value-1,a=o-5;a<0&&(a=0);for(let n=o;n>a;--n)t.push(n);return t=t.reverse(),t}),S=e.computed(()=>{let t=[],o=l.value+5;o>u.value&&(o=u.value);for(let a=l.value+1;a<=o;++a)t.push(a);return t}),T=e.computed(()=>l.value>=u.value),B=e.computed(()=>l.value<=1),A=e.computed(()=>{const t=["lkt-paginator"];return s.palette&&t.push(`lkt-paginator--${s.palette}`),s.readOnly&&t.push("lkt-paginator--read-only"),t.push(!!s.modelValue&&s.modelValue>0?"is-filled":"is-empty"),t.join(" ")}),g=(t,o)=>{let a={};typeof t=="object"&&Object.keys(t).length>0&&(a=JSON.parse(JSON.stringify(t)));for(let n in a)(Array.isArray(a[n])||typeof a[n]=="object")&&(a[n]=JSON.stringify(a[n]));return a.page=o,a};let m=new i.DataState(g(s.filters,0));l.value>0&&m.increment({page:l.value});const k=()=>{if(s.readOnly||!m.changed())return;let t=m.getData();N("loading"),p.httpCall(s.resource,t).then(o=>{let a=o.maxPage;a>-1&&(u.value=a),m.turnStoredIntoOriginal(),N("results",o.data)}).catch(o=>{N("error",o)})},b=()=>++l.value,P=()=>l.value=u.value,M=()=>--l.value,U=()=>l.value=1,E=t=>l.value=t;return e.watch(()=>s.modelValue,t=>{l.value=parseInt(t)}),e.watch(l,t=>{m.increment({page:t}),N("update:modelValue",l.value),k()}),e.watch(()=>s.filters,t=>{m.store(g(t,l.value)),k()}),s.readOnly||k(),(t,o)=>{const a=e.resolveComponent("lkt-button");return u.value>1?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass(A.value)},[e.createVNode(a,{onClick:U,disabled:B.value,"data-role":"first",palette:c.palette},{default:e.withCtx(()=>[e.createElementVNode("span",null,e.toDisplayString(h.value),1)]),_:1},8,["disabled","palette"]),e.createVNode(a,{onClick:M,disabled:B.value,"data-role":"prev",palette:c.palette},{default:e.withCtx(()=>[e.createElementVNode("span",null,e.toDisplayString(V.value),1)]),_:1},8,["disabled","palette"]),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(C.value,n=>(e.openBlock(),e.createBlock(a,{key:n,onClick:()=>{E(n)},"data-role":"page",palette:c.palette},{default:e.withCtx(()=>[e.createElementVNode("span",null,e.toDisplayString(n),1)]),_:2},1032,["onClick","palette"]))),128)),e.createVNode(a,{disabled:"","data-role":"page",palette:c.palette},{default:e.withCtx(()=>[e.createElementVNode("span",null,e.toDisplayString(l.value),1)]),_:1},8,["palette"]),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(S.value,n=>(e.openBlock(),e.createBlock(a,{key:n,onClick:()=>{E(n)},"data-role":"page",palette:c.palette},{default:e.withCtx(()=>[e.createElementVNode("span",null,e.toDisplayString(n),1)]),_:2},1032,["onClick","palette"]))),128)),e.createVNode(a,{onClick:b,disabled:T.value,"data-role":"next",palette:c.palette},{default:e.withCtx(()=>[e.createElementVNode("span",null,e.toDisplayString(O.value),1)]),_:1},8,["disabled","palette"]),e.createVNode(a,{onClick:P,disabled:T.value,"data-role":"latest",palette:c.palette},{default:e.withCtx(()=>[e.createElementVNode("span",null,e.toDisplayString(x.value),1)]),_:1},8,["disabled","palette"])],2)):e.createCommentVNode("",!0)}}});return{install:(c,r)=>{c.component("lkt-paginator",_),r&&r.firstButtonName&&(d.FIRST_BUTTON_NAME=r.firstButtonName),r&&r.prevButtonName&&(d.PREV_BUTTON_NAME=r.prevButtonName),r&&r.nextButtonName&&(d.NEXT_BUTTON_NAME=r.nextButtonName),r&&r.latestButtonName&&(d.LATEST_BUTTON_NAME=r.latestButtonName)}}});
