const template = document.createElement("template");

template.innerHTML = `
    <div>
        <h1>Hello (SlideImg)</h1>
        <slot name="title"></slot>
    <div>
`;

export class SlideImg extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        let clone = template.content.cloneNode(true);
        shadowRoot.append(clone)
    }
}

customElements.define('slide-img', SlideImg);