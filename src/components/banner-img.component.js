import { store } from "../store";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host{
            width: 100%;
        }
        .img{
            width: 100%;
            aspect-ratio: 16 / 9;
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

    <div part="warpper-banner-img" class="root">

        <a part="link-banner-img" class="link">
            
            <img part="img-banner-img" class="img"/>

            <h1 part="title-banner-img" class="title"></h1>
        <a>
        <div class="type">
            <span part="branding-banner-img" class="branding"></span> | 
            <span part="origin-banner-img" class="origin"></span>
        </div>
 
    </div>
`;

export class BannerImgComponent extends HTMLElement {
    constructor() {
        super();
        const root = this.attachShadow({ mode: 'open' });
        let clone = template.content.cloneNode(true);
        root.append(clone);
    }

    static get observedAttributes() {
        return ['category'];
    }

    get category() {
        return this.getAttribute('category');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName.toLowerCase() === 'category') {

            const data = store.sponsoredRecommendations[0][this.category][0];

            const root = this.shadowRoot;
            const title = root.querySelector('.title');
            const img = root.querySelector('.img');
            const link = root.querySelector('.link');
            const origin = root.querySelector('.origin');
            const branding = root.querySelector('.branding');

            title.textContent = data.name;
            img.setAttribute('src', data.thumbnail[0].url);
            link.setAttribute('href', data.url);
            origin.textContent = data.origin;
            branding.textContent = data.branding;

            store.dispatch("removeItemSponsoredRecommendations", [data.id, this.category]);

        };
    }
}


customElements.define('banner-img', BannerImgComponent);
