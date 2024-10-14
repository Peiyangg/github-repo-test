var N=Object.defineProperty;var k=(e,t,n)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var _=(e,t,n)=>k(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function f(){}function v(e){return e()}function b(){return Object.create(null)}function p(e){e.forEach(v)}function O(e){return typeof e=="function"}function S(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function A(e){return Object.keys(e).length===0}function P(e,t,n){e.insertBefore(t,n||null)}function E(e){e.parentNode&&e.parentNode.removeChild(e)}function j(e){return document.createElement(e)}function I(e){return Array.from(e.childNodes)}let y;function d(e){y=e}const a=[],w=[];let u=[];const x=[];function g(e){u.push(e)}const m=new Set;let l=0;function M(){if(l!==0)return;const e=y;do{try{for(;l<a.length;){const t=a[l];l++,d(t),B(t.$$)}}catch(t){throw a.length=0,l=0,t}for(d(null),a.length=0,l=0;w.length;)w.pop()();for(let t=0;t<u.length;t+=1){const n=u[t];m.has(n)||(m.add(n),n())}u.length=0}while(a.length);for(;x.length;)x.pop()();m.clear(),d(e)}function B(e){if(e.fragment!==null){e.update(),p(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(g)}}function C(e){const t=[],n=[];u.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),u=t}const T=new Set;function q(e,t){e&&e.i&&(T.delete(e),e.i(t))}function D(e,t,n){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),g(()=>{const i=e.$$.on_mount.map(v).filter(O);e.$$.on_destroy?e.$$.on_destroy.push(...i):p(i),e.$$.on_mount=[]}),r.forEach(g)}function z(e,t){const n=e.$$;n.fragment!==null&&(C(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function F(e,t,n,o,r,i,s=null,L=[-1]){const h=y;d(e);const c=e.$$={fragment:null,ctx:[],props:i,update:f,not_equal:r,bound:b(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(h?h.$$.context:[])),callbacks:b(),dirty:L,skip_bound:!1,root:t.target||h.$$.root};if(s&&s(c.root),c.ctx=[],c.update(),p(c.before_update),c.fragment=o?o(c.ctx):!1,t.target){if(t.hydrate){const $=I(t.target);c.fragment&&c.fragment.l($),$.forEach(E)}else c.fragment&&c.fragment.c();t.intro&&q(e.$$.fragment),D(e,t.target,t.anchor),M()}d(h)}class H{constructor(){_(this,"$$");_(this,"$$set")}$destroy(){z(this,1),this.$destroy=f}$on(t,n){if(!O(n))return f;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!A(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const K="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(K);function R(e){let t;return{c(){t=j("main"),t.innerHTML='<h1>Modelling visualizaiton by Latent Dirichlet Allocation (LDA)</h1> <nav><ul><li><a href="/9topics">9 Topics</a></li> <li><a href="/10topics">10 Topics</a></li> <li><a href="/test">test</a></li></ul></nav>'},m(n,o){P(n,t,o)},p:f,i:f,o:f,d(n){n&&E(t)}}}class U extends H{constructor(t){super(),F(this,t,null,R,S,{})}}new U({target:document.getElementById("app")});