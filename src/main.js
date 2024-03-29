import './style.css';
import { getSponsoredRecommendations } from './api';
import { store } from './store';
import './components';

const sponsoreds = document.querySelectorAll('.rwt[type="sponsored"]');

store.subscribe(sponsoreds, "setSponsoredRecommendations", function (recommendations, action, store) {

  for (const element of sponsoreds) {

    let attrCategory = element.getAttribute("category");
    let attrComponent = element.getAttribute("component");
    let attrCredit = element.getAttribute("credit") || false;

    if (!recommendations[attrCategory].length) break;

    let component = document.createElement(attrComponent);
    component.setAttribute("category", attrCategory);
    component.setAttribute("data", JSON.stringify(recommendations[attrCategory][0]));

    if (attrCredit) {
      let textNode = document.createTextNode("created by aviv");
      let slot = component.shadowRoot.querySelector('slot[name="credit"]');
      slot.appendChild(textNode);
    }

    element.appendChild(component);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  getSponsoredRecommendations();
});


