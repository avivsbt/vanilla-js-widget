import { store } from "../store";

const template = document.createElement("template");

template.innerHTML = `
    <div class="root">
        <a class="link">
            <img class="img"/>
            <h1 class="title"></h1>
        <a>
        <slot name="credit"></slot>
    <div>
`;

export class BannerImgComponent extends HTMLElement {
    constructor() {
        super();
        const root = this.attachShadow({ mode: 'open' });
        let clone = template.content.cloneNode(true);
        root.append(clone);
    }

    static get observedAttributes() {
        return ['data', 'category'];
    }

    get category() {
        return this.getAttribute('category');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName.toLowerCase() === 'data') {
            
            const data = JSON.parse(newVal);

            const root = this.shadowRoot;
            const title = root.querySelector('.title');
            const img = root.querySelector('.img');
            const link = root.querySelector('.link');

            title.textContent = data.name;
            img.setAttribute('src', data.thumbnail[0].url);
            link.setAttribute('href', data.url);
            
            store.dispatch("updateSponsoredRecommendations", [data, this.category]);
        };
    }

}


customElements.define('banner-img', BannerImgComponent);
