import './style.css';
import { getSponsoredRecommendations } from './api';
import { store } from './store';
import './components';

const sponsoreds = document.querySelectorAll('.rwt[type="sponsored"]');

store.subscribe(sponsoreds, "setSponsoredRecommendations", function (recommendations, action, store) {

  for (const element of sponsoreds) {

    let attrCategory = element.getAttribute("category");
    let attrComponent = element.getAttribute("component");
    let attrAmount = element.getAttribute("amount") || 1;
    let attrCredit = element.getAttribute("credit") || false;

    let component = document.createElement(attrComponent);
    component.setAttribute("category", attrCategory);
    component.setAttribute("amount", attrAmount);

    if (attrCredit) {
      let text = document.createElement("small");
      text.innerText = "created by taboola"
      let slot = component.shadowRoot.querySelector('slot[name="credit"]');
      slot.appendChild(text);
    }

    element.appendChild(component);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  getSponsoredRecommendations();
});


