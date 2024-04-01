(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function m(){this.subscriptions=new Map}m.prototype.subscribe=function(s,e,n){this.subscriptions.has(e)||this.subscriptions.set(e,[]),this.subscriptions.get(e).push(function(t){n.call(s,...t)})};m.prototype.dispatch=function(s,e){e=e||[],typeof this[s]=="function"&&this[s].call(this,...e),e.push(s),e.push(this);const n=this.subscriptions.get(s);n&&n.forEach(t=>{t(e)})};var c=new m;c.sponsoredRecommendations=[];c.setSponsoredRecommendations=function(s){this.sponsoredRecommendations.push(s)};c.removeItemSponsoredRecommendations=function(s,e){this.sponsoredRecommendations[0][e]=this.sponsoredRecommendations[0][e].filter(n=>n.id!==s)};const b=s=>new Promise((e,n)=>{var t=new Image;t.onload=function(){e(!0)},t.onerror=function(){e(!1)},t.src=s}),w=s=>new Promise(async(e,n)=>{const t={};try{for(const o of s)for(const r of o.categories)await b(o.thumbnail[0].url)&&(t[r]?t[r].push(o):t[r]=[o]);e(t)}catch(o){n(o)}});async function S(s,e={}){try{return await(await fetch(s,e)).json()}catch(n){throw new Error(`Failed to fetch: ${n.message}`)}}const v={publisher_id:"taboola-templates",app_type:"desktop",app_apikey:"f9040ab1b9c802857aa783c469d0e0ff7e7366e4",source_id:""};async function f(s={}){const{publisher_id:e,app_type:n,app_apikey:t,source_id:o}={...v,...s},r=`http://api.taboola.com/1.0/json/${e}/recommendations.get?app.type=${n}&app.apikey=${t}&count=100&source.type=video&source.id=${o}`;try{const i=await S(r);if(i.list.length){const a=await w(i.list);c.dispatch("setSponsoredRecommendations",[a])}else console.log("Not found sponsored recommendations"),f()}catch(i){console.error("Error fetching sponsored recommendations:",i)}}const h=document.createElement("template");h.innerHTML=`
    <style>
        :host {
            width: 100%;
        }
        .wrapper-img {
            overflow: hidden;
            aspect-ratio: 16 / 9;
        }
        .img {
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
`;class C extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});let n=h.content.cloneNode(!0);e.append(n)}static get observedAttributes(){return["category"]}get category(){return this.getAttribute("category")}updateContent(){var d,l,p,u;const e=(l=(d=c.sponsoredRecommendations[0])==null?void 0:d[this.category])==null?void 0:l[0];if(!e){console.error(`No data available for category: ${this.category}`);return}const n=this.shadowRoot,t=n.querySelector(".title"),o=n.querySelector(".img"),r=n.querySelector(".link"),i=n.querySelector(".origin"),a=n.querySelector(".branding");t.textContent=e.name,o.setAttribute("src",((u=(p=e.thumbnail)==null?void 0:p[0])==null?void 0:u.url)||""),r.setAttribute("href",e.url||""),i.textContent=e.origin||"",a.textContent=e.branding||"",c.dispatch("removeItemSponsoredRecommendations",[e.id,this.category])}attributeChangedCallback(e,n,t){e.toLowerCase()==="category"&&this.updateContent()}}customElements.define("banner-img",C);const y=document.createElement("template");y.innerHTML=`
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
`;class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(y.content.cloneNode(!0))}static get observedAttributes(){return["category","amount"]}get category(){return this.getAttribute("category")}attributeChangedCallback(e,n,t){if(e.toLowerCase()==="amount"){const r=this.shadowRoot.querySelector(".slider");for(let i=0;i<t&&c.sponsoredRecommendations[0][this.category].length;i++){let a=document.createElement("banner-img");a.setAttribute("category",this.category),r.appendChild(a)}}}}customElements.define("slider-img",R);const g=document.querySelectorAll('.rwt[type="sponsored"]');c.subscribe(g,"setSponsoredRecommendations",function(s,e,n){for(const t of g){const o=t.getAttribute("category"),r=t.getAttribute("component"),i=t.getAttribute("amount")||1,a=t.getAttribute("credit")||!1,d=document.createElement(r);if(d.setAttribute("category",o),d.setAttribute("amount",i),a){const l=document.createElement("small");l.innerText="Created by Taboola",d.shadowRoot.querySelector('slot[name="credit"]').appendChild(l)}t.appendChild(d)}});document.addEventListener("DOMContentLoaded",function(){f()});
