(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{6170:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(6090)}])},6090:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>J});var r=n(4848);n(4472);var o=n(6540),[i,l]=function(e={}){let{strict:t=!0,errorMessage:n="useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",name:r}=e,i=o.createContext(void 0);return i.displayName=r,[i.Provider,function e(){var r;let l=o.useContext(i);if(!l&&t){let t=Error(n);throw t.name="ContextError",null==(r=Error.captureStackTrace)||r.call(Error,t,e),t}return l},i]}({name:"ProviderContext",strict:!1});let a=new Set(["Arab","Syrc","Samr","Mand","Thaa","Mend","Nkoo","Adlm","Rohg","Hebr"]),u=new Set(["ae","ar","arc","bcc","bqi","ckb","dv","fa","glk","he","ku","mzn","nqo","pnb","ps","sd","ug","ur","yi"]);function c(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize(),n="function"==typeof t.getTextInfo?t.getTextInfo():t.textInfo;if(n)return"rtl"===n.direction;if(t.script)return a.has(t.script)}let t=e.split("-")[0];return u.has(t)}let d={prefix:String(Math.round(1e10*Math.random())),current:0},s=(o.createContext(d),o.createContext(!1));function f(){return!1}function m(){return!0}function v(e){return()=>{}}"undefined"!=typeof window&&window.document&&window.document.createElement,new WeakMap,o.useId;let p=Symbol.for("react-aria.i18n.locale");function g(){let e="undefined"!=typeof window&&window[p]||"undefined"!=typeof navigator&&(navigator.language||navigator.userLanguage)||"en-US";try{Intl.DateTimeFormat.supportedLocalesOf([e])}catch{e="en-US"}return{locale:e,direction:c(e)?"rtl":"ltr"}}let h=g(),w=new Set;function y(){for(let e of(h=g(),w))e(h)}let x=o.createContext(null);function b(e){let{locale:t,children:n}=e,r=function(){let e="function"==typeof o.useSyncExternalStore?o.useSyncExternalStore(v,f,m):(0,o.useContext)(s),[t,n]=(0,o.useState)(h);return((0,o.useEffect)(()=>(0===w.size&&window.addEventListener("languagechange",y),w.add(n),()=>{w.delete(n),0===w.size&&window.removeEventListener("languagechange",y)}),[]),e)?{locale:"en-US",direction:"ltr"}:t}(),i=o.useMemo(()=>t?{locale:t,direction:c(t)?"rtl":"ltr"}:r,[r,t]);return o.createElement(x.Provider,{value:i},n)}let E=null;function S(e){var t;return"undefined"!=typeof window&&null!=window.navigator&&((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.brands.some(t=>e.test(t.brand)))||e.test(window.navigator.userAgent))}function A(e){var t;return"undefined"!=typeof window&&null!=window.navigator&&e.test((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.platform)||window.navigator.platform)}function C(e){let t=null;return()=>(null==t&&(t=e()),t)}let M=C(function(){return A(/^Mac/i)}),P=C(function(){return A(/^iPhone/i)}),K=C(function(){return A(/^iPad/i)||M()&&navigator.maxTouchPoints>1}),k=C(function(){return P()||K()});C(function(){return M()||k()});let T=C(function(){return S(/AppleWebKit/i)&&!L()}),L=C(function(){return S(/Chrome/i)});C(function(){return S(/Android/i)});let _=C(function(){return S(/Firefox/i)}),N=(0,o.createContext)({isNative:!0,open:function(e,t){I(e,e=>j(e,t))},useHref:e=>e});function H(e){let{children:t,navigate:n,useHref:r}=e,i=(0,o.useMemo)(()=>({isNative:!1,open:(e,t,r,o)=>{I(e,e=>{let i;(i=e.getAttribute("target"))&&"_self"!==i||e.origin!==location.origin||e.hasAttribute("download")||t.metaKey||t.ctrlKey||t.altKey||t.shiftKey?j(e,t):n(r,o)})},useHref:r||(e=>e)}),[n,r]);return o.createElement(N.Provider,{value:i},t)}function j(e,t,n=!0){var r,o;let{metaKey:i,ctrlKey:l,altKey:a,shiftKey:u}=t;_()&&(null===(o=window.event)||void 0===o?void 0:null===(r=o.type)||void 0===r?void 0:r.startsWith("key"))&&"_blank"===e.target&&(M()?i=!0:l=!0);let c=T()&&M()&&!K()?new KeyboardEvent("keydown",{keyIdentifier:"Enter",metaKey:i,ctrlKey:l,altKey:a,shiftKey:u}):new MouseEvent("click",{metaKey:i,ctrlKey:l,altKey:a,shiftKey:u,bubbles:!0,cancelable:!0});j.isOpening=n,function(e){if(function(){if(null==E){E=!1;try{document.createElement("div").focus({get preventScroll(){return E=!0,!0}})}catch{}}return E}())e.focus({preventScroll:!0});else{let t=function(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}(e);e.focus(),function(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}(t)}}(e),e.dispatchEvent(c),j.isOpening=!1}function I(e,t){if(e instanceof HTMLAnchorElement)t(e);else if(e.hasAttribute("data-href")){let n=document.createElement("a");n.href=e.getAttribute("data-href"),e.hasAttribute("data-target")&&(n.target=e.getAttribute("data-target")),e.hasAttribute("data-rel")&&(n.rel=e.getAttribute("data-rel")),e.hasAttribute("data-download")&&(n.download=e.getAttribute("data-download")),e.hasAttribute("data-ping")&&(n.ping=e.getAttribute("data-ping")),e.hasAttribute("data-referrer-policy")&&(n.referrerPolicy=e.getAttribute("data-referrer-policy")),e.appendChild(n),t(n),e.removeChild(n)}}j.isOpening=!1,n(961);let O=o.createContext(null);function D(e){let{children:t}=e,n=(0,o.useContext)(O),[r,i]=(0,o.useState)(0),l=(0,o.useMemo)(()=>({parent:n,modalCount:r,addModal(){i(e=>e+1),n&&n.addModal()},removeModal(){i(e=>e-1),n&&n.removeModal()}}),[n,r]);return o.createElement(O.Provider,{value:l},t)}function W(e){let t;let{modalProviderProps:n}={modalProviderProps:{"aria-hidden":!!(t=(0,o.useContext)(O))&&t.modalCount>0||void 0}};return o.createElement("div",{"data-overlay-container":!0,...e,...n})}function z(e){return o.createElement(D,null,o.createElement(W,e))}let U={skipAnimations:!1},q=(0,o.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});function F(e){}try{require("@emotion/is-prop-valid").default}catch(e){}function R({children:e,isValidProp:t,...n}){(n={...(0,o.useContext)(q),...n}).isStatic=function(e){let t=(0,o.useRef)(null);return null===t.current&&(t.current=e()),t.current}(()=>n.isStatic);let i=(0,o.useMemo)(()=>n,[JSON.stringify(n.transition),n.transformPagePoint,n.reducedMotion]);return(0,r.jsx)(q.Provider,{value:i,children:e})}var X=({children:e,navigate:t,disableAnimation:n,useHref:l,disableRipple:a=!1,skipFramerMotionAnimations:u=n,reducedMotion:c="never",validationBehavior:d,locale:s="en-US",defaultDates:f,createCalendar:m,...v})=>{let p=e;t&&(p=(0,r.jsx)(H,{navigate:t,useHref:l,children:p}));let g=(0,o.useMemo)(()=>(n&&u&&(U.skipAnimations=!0),{createCalendar:m,defaultDates:f,disableAnimation:n,disableRipple:a,validationBehavior:d}),[m,null==f?void 0:f.maxDate,null==f?void 0:f.minDate,n,a,d]);return(0,r.jsx)(i,{value:g,children:(0,r.jsx)(b,{locale:s,children:(0,r.jsx)(R,{reducedMotion:c,children:(0,r.jsx)(z,{...v,children:p})})})})};let J=function(e){let{Component:t,pageProps:n}=e;return(0,r.jsx)(X,{children:(0,r.jsx)(t,{...n})})}},4472:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[593,792],()=>(t(6170),t(8440))),_N_E=e.O()}]);