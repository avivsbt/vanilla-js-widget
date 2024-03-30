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
        return ['category', 'amount'];
    }

    get category() {
        return this.getAttribute('category');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName.toLowerCase() === 'amount') {

            const root = this.shadowRoot;
            const slider = root.querySelector('.slider');

            Array.from({ length: newVal }).forEach(__ => {
                let component = document.createElement('banner-img');
                component.setAttribute("category", this.category);
                slider.appendChild(component);
            });
        };
    }
}

customElements.define('slider-img', SliderImgComponent);