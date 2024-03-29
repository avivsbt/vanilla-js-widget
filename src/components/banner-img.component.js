const template = document.createElement("template");

template.innerHTML = `
    <div>
        <h1>Hello</h1>
        <slot name="title"></slot>
    <div>
`;

export class BannerImgComponent extends HTMLElement {
    constructor() {
        super();
        const root = this.attachShadow({ mode: 'open' });
        let clone = template.content.cloneNode(true);
        root.append(clone)
    }
}

customElements.define('banner-img', BannerImgComponent);
