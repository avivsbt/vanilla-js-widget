import { store } from "../../store";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        :host {
            width: 100%;
        }
        .img {
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

    <div part="wrapper-banner-img" class="root">

        <a target="_blank" part="link-banner-img" class="link">
            <img part="img-banner-img" class="img"/>
            <h1 part="title-banner-img" class="title"></h1>
        </a>
        <div class="type">
            <span part="branding-banner-img" class="branding"></span> | 
            <span part="origin-banner-img" class="origin"></span>
        </div>
 
    </div>
`;

// BannerImgComponent is a custom web component that displays banner images and
// associated information fetched from a store,
//  updating dynamically based on the specified category attribute.

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

    connectedCallback() {
        this.updateContent();
    }

    updateContent() {
        const data = store.sponsoredRecommendations[0]?.[this.category]?.[0];
        if (!data) {
            console.error(`No data available for category: ${this.category}`);
            return;
        }

        const root = this.shadowRoot;
        const title = root.querySelector('.title');
        const img = root.querySelector('.img');
        const link = root.querySelector('.link');
        const origin = root.querySelector('.origin');
        const branding = root.querySelector('.branding');

        title.textContent = data.name;
        img.setAttribute('src', data.thumbnail?.[0]?.url || '');
        link.setAttribute('href', data.url || '');
        origin.textContent = data.origin || '';
        branding.textContent = data.branding || '';

        store.dispatch("removeItemSponsoredRecommendations", [data.id, this.category]);
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName.toLowerCase() === 'category') {
            this.updateContent();
        }
    }
}

customElements.define('banner-img', BannerImgComponent);
