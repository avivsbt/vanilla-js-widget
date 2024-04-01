import './style.css';
import { getSponsoredRecommendations } from './api/sponsored/sponsored';
import { store } from './store';
import './components';
import { checkImage } from './lib/util';

const sponsoreds = document.querySelectorAll('.rwt[type="sponsored"]');

// Subscribe to store changes and create the component element
store.subscribe(sponsoreds, "setSponsoredRecommendations", async function (recommendations, action, store) {

  for (const sponsoredElement of sponsoreds) {

    const category = sponsoredElement.getAttribute("category");
    const componentType = sponsoredElement.getAttribute("component");
    const amount = sponsoredElement.getAttribute("amount") || 1;
    const hasCredit = sponsoredElement.getAttribute("credit") || false;

    const data = store.sponsoredRecommendations[0]?.[category];  
    
    for (let index = 0; index < data.length; index++) {
      
      let item = data[index];
      
      const isValidImage = await checkImage(item.thumbnail[0].url);
      
      if (isValidImage && index === amount ) break
        
      if(!isValidImage) {
        store.dispatch("removeItemSponsoredRecommendations", [item.id, category]);
      }
      
    }

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


