(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function u(){this.subscriptions=new Map}u.prototype.subscribe=function(s,e,o){this.subscriptions.has(e)||this.subscriptions.set(e,[]),this.subscriptions.get(e).push(function(n){o.call(s,...n)})};u.prototype.dispatch=function(s,e){e=e||[],typeof this[s]=="function"&&this[s].call(this,...e),e.push(s),e.push(this);const o=this.subscriptions.get(s);o&&o.forEach(n=>{n(e)})};var d=new u;d.sponsoredRecommendations=[];d.setSponsoredRecommendations=function(s){this.sponsoredRecommendations.push(s)};d.removeItemSponsoredRecommendations=function(s,e){this.sponsoredRecommendations[0][e]=this.sponsoredRecommendations[0][e].filter(o=>o.id!==s)};const w=s=>new Promise((e,o)=>{var n=new Image;n.onload=function(){e(!0)},n.onerror=function(){e(!1)},n.src=s}),v=s=>new Promise(async(e,o)=>{const n={};try{for(const t of s)for(const r of t.categories)n[r]?n[r].push(t):n[r]=[t];e(n)}catch(t){o(t)}});async function R(s,e={}){try{return await(await fetch(s,e)).json()}catch(o){throw new Error(`Failed to fetch: ${o.message}`)}}const S={publisher_id:"taboola-templates",app_type:"desktop",app_apikey:"f9040ab1b9c802857aa783c469d0e0ff7e7366e4",source_id:""};async function h(s={}){const{publisher_id:e,app_type:o,app_apikey:n,source_id:t}={...S,...s},r=`http://api.taboola.com/1.0/json/${e}/recommendations.get?app.type=${o}&app.apikey=${n}&count=100&source.type=video&source.id=${t}`;try{const i=await R(r);if(i.list.length){console.log("Loading sponsored recommendations");const a=await v(i.list);d.dispatch("setSponsoredRecommendations",[a])}else console.log("Not found sponsored recommendations"),setTimeout(()=>{h()},1e3)}catch(i){console.error("Error fetching sponsored recommendations:",i)}}const y=document.createElement("template");y.innerHTML=`
    <style>
        :host {
            width: 100%;
        }
        .wrapper-img {
            overflow: hidden;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .img {
            object-fit: cover;
            width: 100%;
        }
        .title {
            font-size: 14px;
            padding: 0;
            margin: 0;
        }
        a {
            text-decoration: none;
            color: #fff;
        }
        .type {
            font-size: 12px;
        }
    </style>

    <div part="wrapper-banner-img" class="root">

        <a target="_blank" part="link-banner-img" class="link">
            <div part="wrapper-img" class="wrapper-img">
                <img part="img-banner-img" class="img"/>
            </div>
            <h1 part="title-banner-img" class="title"></h1>
        </a>
        <div class="type">
            <span part="branding-banner-img" class="branding"></span> | 
            <span part="origin-banner-img" class="origin"></span>
        </div>
 
    </div>
`;class A extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});let o=y.content.cloneNode(!0);e.append(o)}static get observedAttributes(){return["category"]}get category(){return this.getAttribute("category")}updateContent(){var c,l,p,m;const e=(l=(c=d.sponsoredRecommendations[0])==null?void 0:c[this.category])==null?void 0:l[0];if(!e){console.error(`No data available for category: ${this.category}`);return}const o=this.shadowRoot,n=o.querySelector(".title"),t=o.querySelector(".img"),r=o.querySelector(".link"),i=o.querySelector(".origin"),a=o.querySelector(".branding");n.textContent=e.name,t.setAttribute("src",((m=(p=e.thumbnail)==null?void 0:p[0])==null?void 0:m.url)||""),r.setAttribute("href",e.url||""),i.textContent=e.origin||"",a.textContent=e.branding||"",d.dispatch("removeItemSponsoredRecommendations",[e.id,this.category])}attributeChangedCallback(e,o,n){e.toLowerCase()==="category"&&this.updateContent()}}customElements.define("banner-img",A);const b=document.createElement("template");b.innerHTML=`
    <style>
        .slider {
            display: flex;
            gap: 10px;
        }
    </style>
    <div part="wrapper-slider-img" class="root">
        <slot name="credit"></slot>
        <div part="slider" class="slider"></div>
    </div>
`;class C extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(b.content.cloneNode(!0))}static get observedAttributes(){return["category","amount"]}get category(){return this.getAttribute("category")}attributeChangedCallback(e,o,n){if(e.toLowerCase()==="amount"){const r=this.shadowRoot.querySelector(".slider");for(let i=0;i<n&&d.sponsoredRecommendations[0][this.category].length;i++){let a=document.createElement("banner-img");a.setAttribute("category",this.category),r.appendChild(a)}}}}customElements.define("slider-img",C);const f=document.querySelectorAll('.rwt[type="sponsored"]');d.subscribe(f,"setSponsoredRecommendations",async function(s,e,o){var n;for(const t of f){const r=t.getAttribute("category"),i=t.getAttribute("component"),a=t.getAttribute("amount")||1,c=(n=o.sponsoredRecommendations[0])==null?void 0:n[r];if(!(c!=null&&c.length))continue;for(let p=0;p<c.length;p++){let m=c[p];const g=await w(m.thumbnail[0].url);if(g&&p===a)break;g||o.dispatch("removeItemSponsoredRecommendations",[m.id,r])}const l=document.createElement(i);l.setAttribute("category",r),l.setAttribute("amount",a),t.appendChild(l)}});document.addEventListener("DOMContentLoaded",function(){h()});
