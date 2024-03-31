import './style.css';
import { getSponsoredRecommendations } from './api/sponsored/sponsored';
import { store } from './store';
import './components';

const sponsoreds = document.querySelectorAll('.rwt[type="sponsored"]');

// Subscribe to store changes and create the component element
store.subscribe(sponsoreds, "setSponsoredRecommendations", function (recommendations, action, store) {
  for (const sponsoredElement of sponsoreds) {

    const category = sponsoredElement.getAttribute("category");
    const componentType = sponsoredElement.getAttribute("component");
    const amount = sponsoredElement.getAttribute("amount") || 1;
    const hasCredit = sponsoredElement.getAttribute("credit") || false;

    const component = document.createElement(componentType);
    component.setAttribute("category", category);
    component.setAttribute("amount", amount);

    if (hasCredit) {
      const creditText = document.createElement("small");
      creditText.innerText = "Created by Taboola";
      const creditSlot = component.shadowRoot.querySelector('slot[name="credit"]');
      creditSlot.appendChild(creditText);
    }

    sponsoredElement.appendChild(component);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  getSponsoredRecommendations();
});


