import { store } from "../../store";
import "../banner-img/banner-img.component";

const template = document.createElement("template");

template.innerHTML = `
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
`;

// SliderImgComponent is a custom web component for a slider of banner images, 
// where the number of images displayed is determined by the 'amount' attribute, 
// fetched from a store based on the 'category' attribute.

export class SliderImgComponent extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
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

            for (let i = 0; i < newVal; i++) {

                if (!store.sponsoredRecommendations[0][this.category].length) break;

                let component = document.createElement('banner-img');
                component.setAttribute("category", this.category);
                slider.appendChild(component);
            }
        };
    }
}

customElements.define('slider-img', SliderImgComponent);