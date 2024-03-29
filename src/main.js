import './style.css';
import { getRecommendations } from './api';
import { store } from './store';
import './components';

const sponsored = document.querySelectorAll('.recommendations[type="sponsored"]');

store.subscribe(sponsored, "updateSponsoredRecommendations", function (recommendations, action, store) {

  sponsored.forEach(element => {
    let attrComponent = element.getAttribute("component");
    let attrCategory = element.getAttribute("category");
    let attrCredit = element.getAttribute("Credit") || false;

    console.log(recommendations);
    let component = document.createElement(attrComponent);
    component.setAttribute("data", JSON.stringify(recommendations[attrCategory]));

    if (attrCredit) {
      let textNode = document.createTextNode("created by");
      let slot = component.shadowRoot.querySelector('slot[name="title"]');
      slot.appendChild(textNode);
    }

    element.appendChild(component);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  getRecommendations();
});


