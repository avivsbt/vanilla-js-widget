import { BannerImgComponent } from "./banner-img.component";

const template = document.createElement("template");

template.innerHTML = `
    <style>
        .slider {
            display: flex;
            gap: 5px;
        }
    </style>
    <div part="warpper-slider-img" class="root">
        <slot name="credit"></slot>
        <div part="slider" class="slider"></div>
    <div>
`;

export class SliderImgComponent extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        let clone = template.content.cloneNode(true);
        shadowRoot.append(clone)
    }

    static get observedAttributes() {
        return ['data', 'category'];
    }

    get category() {
        return this.getAttribute('category');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName.toLowerCase() === 'data') {
            for (const element of JSON.parse(newVal)) {
                
                const root = this.shadowRoot;

                let component = document.createElement('banner-img');
                component.setAttribute("category", this.category);
                component.setAttribute("data", JSON.stringify([element]));

                const slider = root.querySelector('.slider');
                slider.appendChild(component);
            }
        };
    }
}

customElements.define('slider-img', SliderImgComponent);