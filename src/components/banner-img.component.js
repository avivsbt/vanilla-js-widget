const template = document.createElement("template");

template.innerHTML = `
    <div class="root">
        <h1 class="title">Hello</h1>
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
        return ['data'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        const data = JSON.parse(newVal);

        if (attrName.toLowerCase() === 'data') {
            for (const item of data) {
                console.log(item);
                if (!item.isViewed) {
                    const root = this.shadowRoot;
                    const dataPlaceholder = root.querySelector('.title');
                    dataPlaceholder.textContent = item.name;
                    break
                }
            };
        }

    }
}

customElements.define('banner-img', BannerImgComponent);
